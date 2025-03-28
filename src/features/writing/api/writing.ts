import { baseApiInstance } from "@/shared/api";
import { postWritingTestI } from "../model";

export const getWritingTest = async () => {
  const res = await baseApiInstance.get("api/test?type=writing");
  return res.data;
};

export const submitWritingTest = async (data: postWritingTestI) => {
  const res = await baseApiInstance.post("api/test/save", data);
  return res.data;
};
