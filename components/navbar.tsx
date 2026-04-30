import { Menu } from "lucide-react";
import { NavLink } from "./navLink";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import LogoutButton from "./logoutButton";

export function Navbar() {
  return (
    <header className="flex justify-between px-6 py-4 border-b items-baseline">
      <div className="flex items-baseline gap-8">
        <h1 className="text-2xl">Wardrobe manager</h1>

        <nav className="hidden lg:flex gap-4">
          <NavLink href="/garments">Garments</NavLink>
          <NavLink href="/outfits">Outfits</NavLink>
        </nav>
      </div>

      <div className="hidden lg:flex gap-4">
        <LogoutButton />
      </div>

      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Wardrobe manager</SheetTitle>
            <div className="flex flex-col gap-6 p-4 mt-4">
              <nav className="flex flex-col gap-2 items-center">
                <NavLink href="/garments">Garments</NavLink>
                <NavLink href="/outfits">Outfits</NavLink>
              </nav>

              <Separator />

              <div className="flex flex-col gap-3">
                <LogoutButton />
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
