
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Ruler } from "lucide-react";

interface SizeChartDialogProps {
  imageUrl: string;
}

export function SizeChartDialog({ imageUrl }: SizeChartDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary p-0 h-auto font-semibold flex items-center gap-1 hover:no-underline">
          <Ruler className="h-4 w-4" />
          Size Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Size Chart</DialogTitle>
        </DialogHeader>
        <div className="relative w-full mt-4" style={{ paddingTop: '70%' }}>
            <Image src={imageUrl} alt="Size Chart" fill className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
