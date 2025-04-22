import { signIn } from "@/auth";

export default function Login() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("auth0");
      }}
    >
      <button type="submit">Signin</button>
    </form>
  );
}
