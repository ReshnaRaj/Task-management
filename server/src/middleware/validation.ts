import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const registerUserSchema = z
  .object({
    Name: z
      .string()
      .min(5, "Name must be at least 2 characters")
      .max(50, "Name is too long"),

    email: z.string().email("Invalid email format").toLowerCase().trim(),

    role: z.enum(["user", "admin"]).optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    registerUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formatted = error.flatten();
      res.status(400).json({
        message: "Validation failed",
        errors: formatted.fieldErrors,
      });
    } else {
      next(error);
    }
  }
};
