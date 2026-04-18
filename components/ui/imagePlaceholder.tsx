import { ImageOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function ImagePlaceholder({ className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        className
      )}
    >
      <ImageOffIcon className="size-1/4" />
    </div>
  );
}
