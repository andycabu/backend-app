import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "Se requiere un nombre",
    })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(255),
  email: z
    .string({
      required_error: "Se requiere un correo electrónico",
    })
    .email({
      message: "Correo electrónico inválido",
    }),
  password1: z
    .string({
      required_error: "Se requiere una contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(1024),
  password2: z
    .string({
      required_error: "Se requiere una contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(1024),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Se requiere un correo electrónico",
    })
    .email({
      message: "Correo electrónico inválido",
    }),
  password: z
    .string({
      required_error: "Se requiere una contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
