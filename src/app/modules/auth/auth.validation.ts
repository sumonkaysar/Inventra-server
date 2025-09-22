import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email must be string" })
    .nonempty({ error: "Email is required." })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must be valid.",
    }),
  password: z
    .string({ error: "Password must be string" })
    .min(6, { message: "Password must be at least 6 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
