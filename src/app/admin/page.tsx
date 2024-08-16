import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { JsonFileUpload } from "~/components/admin/JsonFileUpload";

export default async function Admin() {
  const session = await auth();
  if (
    !(
      session?.user?.email === "tommywellsrocks@gmail.com" &&
      session?.user?.id === "41069402-2b1f-43d5-be90-de9b4a6c875c"
    )
  )
    return redirect(`/`);

  return (
    <>
      <section>
        <span>Hi Precious</span>
        <video src="content/videos/admin/welcome.mp4" autoPlay loop muted>
          Your browser does not support this video {" :("}. That&apos;s too bad!
          It&apos;s a really good video!
        </video>
      </section>

      <section>
        <span>Upload Temple_Exercises JSON</span>
        <JsonFileUpload />
      </section>
    </>
  );
}
