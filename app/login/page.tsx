import { signIn } from "@/auth";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) redirect("/");
  else
    return (
      <form
        className="flex justify-center"
        action={async () => {
          "use server";
          await signIn("auth0");
        }}
      >
        <Button type="submit">Signin</Button>
      </form>
    );
}
