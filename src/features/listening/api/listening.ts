import { baseApiInstance } from "@/shared/api";

export const getListeningTestById = async (id: number) => {
  const res = await baseApiInstance.get(
    `api/test?type=listening&test_id=${id}`,
  );
  return res.data;
};

// export const getAllListeningTests = async

// export const submitReadingTest = async (data: SubmitReadingI) => {
//   const res = await baseApiInstance.post("api/test/save", data);
//   return res.data;
// };
