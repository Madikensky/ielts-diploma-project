import { baseApiInstance } from "@/shared/api";
import { SubmitReadingI } from "../model/passage";

export const getReadingTest = async () => {
  const res = await baseApiInstance.get("api/test?type=reading&test_id=1");
  return res.data;
};

export const submitReadingTest = async (data: SubmitReadingI) => {
  const res = await baseApiInstance.post("api/test/save", data);
  return res.data;
};
