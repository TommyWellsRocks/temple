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
    <div className="grid grid-cols-3 items-center">
      <Link href={backURL}>
        <Image className="cursor-pointer" src={BackButtonURL} alt="Back" />
      </Link>
      <div className="justify-self-center text-center text-2xl font-semibold">
        {heading}
      </div>
      <div />
    </div>
  );
}
