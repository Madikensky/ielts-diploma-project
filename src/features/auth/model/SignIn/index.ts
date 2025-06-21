import z from "zod";

export interface SignInProps {
  onSwitch: () => void;
}

export const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInFormValues = z.infer<typeof formSchema>;
