"use client";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/images";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  garmentId: number;
};
export default function ImageUploadForm(props: Props) {
  return (
    <div>
      <form action={uploadImage} className="flex items-end gap-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" name="image" />
          <input type="hidden" name="garmentId" value={props.garmentId} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
