import { baseApiInstance } from "@/shared/api";
import { SignInFormValues } from "../model/SignIn";

export const signIn = async (data: SignInFormValues) => {
  const res = await baseApiInstance.post("/auth/sign_in", data);
  return res.data;
};
