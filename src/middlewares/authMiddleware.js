import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import { AppError } from "../utils/appError.js";

export const authMiddleware =  async (req, res, next)=> {
    let token;
    
    if (req.headers.authorization) {
        const [scheme, credentials] = req.headers.authorization.split(" ");

        if (scheme === "Bearer" && credentials) {
            token = credentials;
        }
    }

    if(!token && req.cookies?.jwt)
    {
        token = req.cookies?.jwt;
    }

    if(!token)
    {
        return next(new AppError("No authorization token provided", 401));
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await prisma.user.findUnique({
            where: { id: decode.id },
        });

        if(!user)
        {
            return next(new AppError("User no longer exists", 401));
        }
        req.user = user;
        next();
    }catch(err) {
        return next(new AppError("Invalid or expired token", 401));
    }
}
