import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string({
      required_error: "Se requiere un título",
    })
    .min(4, {
      message: "El titulo debe tener minimo cuatro caracteres",
    }),
  description: z
    .string({
      required_error: "Se requiere una descripción",
    })
    .min(4, {
      message: "La descripcion debe tener minimo cuatro caracteres",
    }),
  date: z.string().datetime().optional(),
});
