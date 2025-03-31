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
import GarmentSelection from "./garmentSelection";
import { outfitsTable } from "@/db/schema";

const formSchema = z.object({
  garment_id: z.number(),
});

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
};

export default async function AddGarmentOufits(props: Props) {
  const { items: garments, total, offset, limit } = await readGarments({});

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
        <div className="max-h-80 overflow-y-auto">
          <GarmentSelection outfit={props.outfit} garments={garments} />
        </div>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
