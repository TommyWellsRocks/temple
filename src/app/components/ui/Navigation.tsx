import Link from "next/link";
import { toTitleCase } from "~/app/utils/helpers";
import { ChevronLeft } from "lucide-react";

export function Navigation({
  backURL,
  heading,
}: {
  backURL: string;
  heading: string;
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
          <div className="w-[24px]" />
        </div>
      </nav>
    </header>
  );
}
