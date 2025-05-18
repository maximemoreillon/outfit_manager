import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignOutPage() {
  return (
    <form
      className="flex justify-center"
      action={async (formData) => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}
