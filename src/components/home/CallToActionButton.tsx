import Link from "next/link";
import { Button } from "../ui/button";

export function CallToActionButton() {
  return (
    <Link href="/workout">
      <Button>Launch</Button>
    </Link>
  );
}
