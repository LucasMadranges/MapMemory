import z from 'zod';

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormErrors = {
  email?: string[];
  password?: string[];
};

export const loginSchema = z.object({
  email: z.email("L'email n'est pas valide."),
  password: z
    .string()
    .min(12, 'Le mot de passe doit contenir au moins 12 caractères.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
    ),
});
