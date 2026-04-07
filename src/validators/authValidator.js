import * as z from "zod";

export const registerValidator = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginValidator = z.object({
    email: z.email("Please provide a valid email address"),
    password: z.string().min(1, "Password is required"),
});
