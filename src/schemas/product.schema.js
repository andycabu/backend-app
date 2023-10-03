import { z } from "zod";

export const productSchema = z.object({
  nombre: z.string({
    required_error: "Se requiere un nombre",
  }),
  referencia: z.string({
    required_error: "Se requiere una referencia",
  }),
  fechaCaducidad: z
    .string({
      required_error: "Se requiere una fecha de caducidad",
    })
    .datetime(),
  categoria: z.string({
    required_error: "Se requiere una categoria",
  }),
  stock: z.number({
    required_error: "Se requiere un stock",
  }),
});
