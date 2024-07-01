import { redirect } from "next/navigation";

export default function Login() {
  return (
    <div>
      LOGIN PAGE HERE
      {redirect("/workout")}
    </div>
  );
}
