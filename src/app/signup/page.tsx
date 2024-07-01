import { redirect } from "next/navigation";

export default function Signup() {
  return (
    <div>
      SIGNUP PAGE HERE
      {redirect("/workout")}
    </div>
  );
}
