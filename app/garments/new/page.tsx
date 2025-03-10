import GarmentCreateForm from "@/components/garmentCreateForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createGarment } from "@/lib/garments";

export default function NewGarment() {
  return (
    <div>
      <GarmentCreateForm />
    </div>
  );
}
