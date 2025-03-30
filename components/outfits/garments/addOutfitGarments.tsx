// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { addGarmentToOutfit } from "@/lib/outfitGarments";
import GarmentPreviewCard from "@/components/garments/previewCard";
import { readGarments } from "@/lib/garments";

const formSchema = z.object({
  garment_id: z.number(),
});

type Props = {
  outfitId: number;
};

export default async function AddGarmentOufits(props: Props) {
  const { items: garments, total, offset, limit } = await readGarments({});

  // async function onSubmit({ garment_id }: z.infer<typeof formSchema>) {
  //   await addGarmentToOutfit({ garment_id: 19, outfit_id: 1 });
  // }

  async function handleGarmentSelect(garment_id: number) {
    await addGarmentToOutfit({ garment_id, outfit_id: props.outfitId });
  }

  // TODO: use a table with selects
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add garments</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add garments</DialogTitle>
          <DialogDescription>Adding garments to this outfit</DialogDescription>
        </DialogHeader>
        {/* Dialog body */}
        <div className="">
          <div className="grid gap-4 grid-cols-3">
            {garments.map((garment) => (
              <GarmentPreviewCard garment={garment} key={garment.id} />
            ))}
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
