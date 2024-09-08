import Link from "next/link";

export function ActionCard({
  title,
  editButton,
  textContent,
  isDark,
  linkTo,
}: {
  title: string;
  editButton?: JSX.Element;
  textContent?: JSX.Element;
  isDark: boolean;
  linkTo: string;
}) {
  return (
    <div className="relative flex items-center">
      <Link
        href={linkTo}
        className={`flex w-full items-center gap-x-4 rounded-lg pr-12 ${isDark ? "bg-doneDark text-muted-foreground" : "bg-undoneDark"} py-2 pl-4`}
      >
        <div className="flex flex-col">
          <span>{title}</span>
          {textContent}
        </div>
      </Link>
      <div className="absolute right-1 mx-2 pb-1">{editButton}</div>
    </div>
  );
}
