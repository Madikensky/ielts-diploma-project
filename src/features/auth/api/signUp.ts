import { baseApiInstance } from "@/shared/api";
import { SignUpFormValues } from "../model/SignUp";

export const signUp = async (data: SignUpFormValues) => {
  const res = await baseApiInstance.post("/auth/sign_up", data);
  return res.data;
};
