import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Se requiere un título",
  }),
  description: z.string({
    required_error: "Se requiere una descripción",
  }),
  date: z.string().datetime().optional(),
});
