import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/generateToken.js";
import { AppError } from "../utils/appError.js";

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await prisma.user.findUnique({
            where: { email },
        });

        if (userExist) {
            return next(new AppError("User with email already exists.", 403));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        const token = generateToken(user.id, res);

        res.json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return next(new AppError("User with email does not exist.", 401));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if (!isPasswordValid) {
            return next(new AppError("Invalid email or password.", 401));
        }

        const token = generateToken(user.id, res);

        res.json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({
        status: "success",
        message: "Logout successfully",
    });
};

export { register, login, logout };
