"use client";
import { useState, useEffect } from "react";
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

import { readGarments } from "@/lib/garments";
import GarmentSelection from "./garmentSelection";
import { garmentsTable, outfitsTable } from "@/db/schema";

type Props = {
  outfit: typeof outfitsTable.$inferSelect;
  onAdd: Function;
};

export default function AddGarmentOufits(props: Props) {
  // const { items: garments, total, offset, limit } = await readGarments({});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add garments</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add garments</DialogTitle>
          <DialogDescription>Addi garments to this outfit</DialogDescription>
        </DialogHeader>
        <div className="h-[calc(100vh-300px)] overflow-y-auto">
          <GarmentSelection outfit={props.outfit} onSelect={props.onAdd} />
        </div>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
