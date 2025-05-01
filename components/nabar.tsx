import { LogOut, Menu } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="flex justify-between px-6 py-4 border-b items-center">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl ">Wardrobe manager</h1>

        <nav className="hidden lg:flex items-center gap-4">
          <Link href="/garments">Garments</Link>
          <Link href="/outfits">Outfits</Link>
        </nav>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {session && (
          <a href="logout">
            <LogOut />
          </a>
        )}
      </div>
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Wardrobe manager</SheetTitle>
            {/* <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription> */}
            <div className="flex flex-col gap-6 p-4">
              <nav className="flex flex-col gap-6">
                <Link href="/outfits">Outfits</Link>

                <Link href="/garments">Garments</Link>
              </nav>

              <Separator />

              <div className="flex flex-col gap-3">
                <Button asChild variant="outline">
                  <Link href="logout">
                    <LogOut />
                    Logout
                  </Link>
                </Button>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
