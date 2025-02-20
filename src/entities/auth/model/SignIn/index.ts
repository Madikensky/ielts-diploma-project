import z from "zod";

export interface SignInProps {
  onSwitch: () => void;
}

export const formSchema = z.object({
  email: z.string().email("Please enter valid email."),
  password: z.string(),
});

export type SignInFormValues = z.infer<typeof formSchema>;
