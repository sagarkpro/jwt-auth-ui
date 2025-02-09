import { LoginReq } from "@/app/models/LoginReq";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Enter a valid email."),
  password: z.string().nonempty("Password is required.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Password must be at least 8 characters with an uppercase, number, and special character.")
})

export function validateLogin(data: LoginReq){
  return loginSchema.safeParse(data);
}