import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Login() {
  return (
    <form
      className="flex justify-center"
      action={async () => {
        "use server";
        await signIn("auth0", { redirectTo: "/" });
      }}
    >
      <Button type="submit">Signin</Button>
    </form>
  );
}
