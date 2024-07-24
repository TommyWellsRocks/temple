import Image from "next/image";
import Link from "next/link";
import BackButtonURL from "/public/content/images/back-button.svg";

export function Navigation({
  backURL,
  heading,
}: {
  backURL: string;
  heading: string;
}) {
  return (
    <nav className="flex items-center justify-between">
      <Link href={backURL}>
        <Image className="cursor-pointer" src={BackButtonURL} alt="Back" />
      </Link>
      <div className="text-2xl font-semibold">{heading}</div>
      <div />
    </nav>
  );
}
