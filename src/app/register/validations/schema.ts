import { UserDto } from "@/app/models/RegisterReq";
import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Enter a valid email."),
  password: z.string().nonempty("Password is required.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Password must be at least 8 characters with an uppercase, number, and special character."),
  firstName: z.string().nonempty("Please enter your name"),
})

export function validateRegistration(data: UserDto){
  return registrationSchema.safeParse(data);
}