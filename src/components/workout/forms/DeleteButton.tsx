import { Button } from "~/components/ui/button";

export function DeleteButton({ onClick }: { onClick: Function }) {
  return (
    <Button
      className="mr-auto"
      variant="destructive"
      type="button"
      onClick={() => onClick()}
    >
      Delete
    </Button>
  );
}
