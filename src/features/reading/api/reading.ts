import { baseApiInstance } from "@/shared/api";

export const getReadingTest = async () => {
  const res = await baseApiInstance.post("api/test?type=reading");
  return res.data;
};
