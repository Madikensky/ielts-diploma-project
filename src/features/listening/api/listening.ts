import { baseApiInstance } from "@/shared/api";

export const getListeningTest = async () => {
  const res = await baseApiInstance.get("api/test?type=listening&test_id=1");
  return res.data;
};

// export const submitReadingTest = async (data: SubmitReadingI) => {
//   const res = await baseApiInstance.post("api/test/save", data);
//   return res.data;
// };
