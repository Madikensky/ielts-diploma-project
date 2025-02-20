import z from "zod";

export interface SignUpProps {
  onSwitch: () => void;
}

export const formSchema = z.object({
  email: z.string().email("Please enter valid email."),
  password: z.string(),
  confirm_password: z.string(),
});

export type SignUpFormValues = z.infer<typeof formSchema>;
