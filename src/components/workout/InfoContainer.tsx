import Image from "next/image";
import Link from "next/link";

export function InfoContainer({
  title,
  editButton,
  items,
  isDark,
  linkTo,
  actionIconURL,
}: {
  title: string;
  editButton: JSX.Element;
  items: JSX.Element[];
  isDark: boolean;
  actionIconURL: string;
  linkTo: string;
}) {
  return (
    <div className="relative flex">
      <div className="absolute left-2.5 top-2 flex gap-1.5 px-1.5 align-middle">
        {title}
        {editButton}
      </div>
      <Link
        href={linkTo}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-2 ${isDark ? "bg-doneDark" : "bg-undoneDark"}`}
      >
        <div className="ml-4 mt-7 flex flex-col gap-x-2 text-base">{items}</div>
        <Image
          className="rounded-full border border-primary"
          src={actionIconURL}
          alt="Action."
        />
      </Link>
    </div>
  );
}
