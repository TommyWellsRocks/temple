import Link from "next/link";

export function ActionCard({
  img,
  title,
  editButton,
  subtext,
  isDark,
  linkTo,
}: {
  img?: JSX.Element;
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
        className={`flex w-full items-center gap-x-4 rounded-lg pr-12 ${isDark ? "bg-doneDark text-muted-foreground" : "bg-undoneDark"} ${img ? "" : "py-2 pl-4"}`}
      >
        {img}
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-base font-light text-muted-foreground">
            {subtext}
          </span>
        </div>
      </Link>
      <div className="absolute right-1 mx-2 pb-1">{editButton}</div>
    </div>
  );
}
