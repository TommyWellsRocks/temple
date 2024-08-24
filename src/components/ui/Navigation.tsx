import Link from "next/link";
import { toTitleCase } from "~/utils/helpers";
import { ChevronLeft } from "lucide-react";

export function Navigation({
  backURL,
  heading,
  editButton,
}: {
  backURL: string;
  heading: string;
  editButton?: JSX.Element;
}) {
  return (
    <header>
      <nav>
        <div className="flex items-center justify-between">
          <Link href={backURL}>
            <ChevronLeft />
          </Link>
          <span className="text-center text-xl font-semibold sm:text-2xl">
            {toTitleCase(heading)}
          </span>
          {editButton ? editButton : <div className="w-[24px]" />}
        </div>
      </nav>
    </header>
  );
}
