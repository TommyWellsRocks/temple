import Image from "next/image";
import Link from "next/link";

export function ActionCard({
  imageURL,
  title,
  editButton,
  subtext,
  isDark,
  linkTo,
}: {
  imageURL?: string;
  title: string;
  editButton?: JSX.Element;
  subtext?: string;
  isDark: boolean;
  linkTo: string;
}) {
  return (
    <div className="relative flex items-center">
      <Link
        href={linkTo}
        className={`flex w-full items-center gap-x-4 rounded-lg pr-12 ${isDark ? "bg-doneDark" : "bg-neutral-800"} ${imageURL ? "" : "pl-4 py-2"}`}
      >
        {imageURL ? (
          <Image
            src={imageURL}
            alt="Image"
            width={10}
            height={10}
            className="h-[100px] w-[60px] rounded-sm object-cover"
          />
        ) : null}
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-base font-light text-gray-500">{subtext}</span>
        </div>
      </Link>
      <div className="absolute right-1 mx-2 pb-1">{editButton}</div>
    </div>
  );
}
