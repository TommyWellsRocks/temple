import Image from "next/image";
import Link from "next/link";
import BackButtonURL from "/public/content/images/back-button.svg";
import { OverlayButton } from "./OverlayButton";

export function Navigation({
  backURL,
  heading,
  addButtonInfo,
}:
  | {
      backURL: string;
      heading: string;
      addButtonInfo?: {
        title: string;
        description: string;
        formType: "ProgramDays";
        formProps: {
          userId: string;
          programId: number;
        };
      };
    }
  | {
      backURL: string;
      heading: string;
      addButtonInfo?: {
        title: string;
        description: string;
        formType: "Program";
        formProps: {
          userId: string;
        };
      };
    }) {
  let addButton;

  if (addButtonInfo && addButtonInfo.formType === "ProgramDays") {
    addButton = (
      <OverlayButton
        title={addButtonInfo.title}
        description={addButtonInfo.description}
        formType={addButtonInfo.formType}
        formProps={addButtonInfo.formProps}
      />
    );
  }

  return (
    <nav className="flex items-center justify-between">
      <Link href={backURL}>
        <Image className="cursor-pointer" src={BackButtonURL} alt="Back" />
      </Link>
      <div className="text-2xl font-semibold">{heading}</div>
      {!addButton ? <div /> : addButton}
    </nav>
  );
}
