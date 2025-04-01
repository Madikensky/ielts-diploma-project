// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   getReadingTest,
//   submitReadingTest,
// } from "@/features/reading/api/reading";
// import { ReadingTest, SubmitReadingI } from "@/features/reading/model/passage";
// import { PassageItem } from "@/features/reading/ui/PassageItem";
// import MainLayout from "@/widgets/MainLayout";
// import { useMutation } from "@tanstack/react-query";
// import { FC } from "react";
// import { useForm } from "react-hook-form";
// import { AxiosError } from "axios";
// import { getListeningTest } from "@/features/listening/api/listening";
// import { ListeningResponseI } from "@/features/listening/model";

// const Listening: FC = () => {
//   const { mutate, data } = useMutation<ListeningResponseI>({
//     mutationFn: getListeningTest,
//   });

//   // const { mutate: submitReading, data: data3 } = useMutation<
//   //   unknown, // response type
//   //   AxiosError,
//   //   SubmitReadingI
//   // >({
//   //   mutationFn: submitReadingTest,
//   // });

//   const { control, handleSubmit } = useForm<{
//     [key: string]: string;
//   }>();

//   const onSubmit = (data: { [key: string]: string }) => {
//     console.log(data);
//   };

//   return (
//     <MainLayout
//       description="In this section, you'll practice the IELTS Listening test by listening to real exam-style recordings and answering 40 questions within a set time.
//         After completing the test, you'll receive instant feedback with correct answers and explanations, helping you improve your listening accuracy, note-taking skills, and ability to understand different accents."
//       title="Listening"
//       onClick={() => {
//         mutate();
//       }}
//     >
//       {data ? (
//         <div className="flex flex-col h-full">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-5">
//               {/* <PassageItem
//                 control={control}
//                 passageTitle={data.test[0].title}
//                 passageQuestions={data.test[0].questions}
//                 passageText={data.test[0].text}
//               /> */}
//             </div>
//             <div className="mt-5 mb-8 text-end">
//               <Button type="submit" variant={"primary"}>
//                 Submit Test
//               </Button>
//             </div>
//           </form>
//         </div>
//       ) : null}
//     </MainLayout>
//   );
// };

// export default Listening;

const Listening = () => {
  return <div></div>;
};

export default Listening;
