import { baseApiInstance } from "@/shared/api";

export const getProfile = async () => {
  const res = await baseApiInstance.get("api/profile");
  return res.data;
};
