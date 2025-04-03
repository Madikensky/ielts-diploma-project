import { baseApiInstance } from "@/shared/api";
import { RequestListeningI } from "../model";

export const getListeningTestById = async (id: number) => {
  const res = await baseApiInstance.get(
    `api/test?type=listening&test_id=${id}`,
  );
  return res.data;
};

export const getAllListeningTests = async () => {
  const res = await baseApiInstance.get("api/tests?type=listening");
  return res.data;
};

export const submitListeningTest = async (data: RequestListeningI) => {
  const res = await baseApiInstance.post("api/test/save", data);
  return res.data;
};
