import {z} from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({required_error: "L'email est obligatoire."})
    .email("L'email est invalide."),

  password: z
    .string({required_error: "Le mot de passe est obligatoire."})
    .min(12, "Le mot de passe doit contenir au moins 12 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-_()"';,:=+`£?.])/,
      "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole.",
    ),

});

// Type généré à partir du schema
export type LoginUserSchema = z.infer<typeof loginUserSchema>;
