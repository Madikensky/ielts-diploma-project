import { baseApiInstance } from "@/shared/api";
import { RequestReadingI } from "../model/passage";

export const getReadingTestById = async (id: number) => {
  const res = await baseApiInstance.get(`api/test?type=reading&test_id=${id}`);
  return res.data;
};

export const submitReadingTest = async (data: RequestReadingI) => {
  const res = await baseApiInstance.post("api/test/save", data);
  return res.data;
};

export const getAllReadingTests = async () => {
  const res = await baseApiInstance.get("api/tests?type=reading");
  return res.data;
};
