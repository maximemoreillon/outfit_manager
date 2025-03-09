import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGarment } from "@/lib/garments";

export default function NewGarment() {
  return (
    <div>
      <form action={createGarment}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" name="name" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
