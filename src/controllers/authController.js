import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/generateToken.js";

const register = async (req, res) => {
    const {name, email, password} = req.body;
    const userExist = await prisma.user.findUnique({
        where: { email: email },
    });

    if(userExist){
        res.status(400).json({
            error: "User with email already existed."
        })
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
        status:  "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            }
        },
        token
        
    });
}

const login = async (req, res) => {
    const {email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if(!user)
    {
        res.status(401).json({
            error: "User with email does not exist."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 

    if(!isPasswordValid)
    {
        res.status(401).json({
            error: "Invalid email or password."
        })
    }

    const token = generateToken(user.id, res);

    res.json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: email
            }
        },
        token
    })
}


const logout = async (req, res) => {
    res.cookie("jwt","", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({
        status:  "success",
        message: "Logout successfully"
        
    });
}

export {register, login, logout};