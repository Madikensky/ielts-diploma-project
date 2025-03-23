import { baseApiInstance } from "@/shared/api";

export const getProfile = async () => {
  const res = await baseApiInstance.post("api/profile");
  return res.data;
};
