import Link from "next/link";

export const Header = () => {
  return (
    <div className="border-4 p-4 flex flex-row justify-between items-center">
      <h1 className="text-textCommon font-bold text-xl">7Easy</h1>
      <div className="flex flex-row gap-2">
        <Link href={""}>Home</Link>
        <Link href={""}>FAQ</Link>
        <Link href={""}>Our Team</Link>
      </div>
    </div>
  );
};
