import { z } from "zod";

export const productSchema = z.object({
  nombre: z
    .string({
      message: "Se requiere un nombre",
    })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    }),
  referencia: z
    .string({
      required_error: "Se requiere una referencia",
    })
    .min(2, {
      message: "La referencia debe tener al menos 2 caracteres",
    }),
  fechaCaducidad: z.string({
    required_error: "Se requiere una fecha de caducidad",
  }),
  categoria: z.string({
    required_error: "Se requiere una categoria",
  }),
  stock: z
    .number({
      required_error: "Se requiere un stock",
    })
    .min(1, {
      message: "El stock debe ser mayor a 0",
    }),
});
