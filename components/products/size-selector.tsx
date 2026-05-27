"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SizeSelectorProps {
  tallas: string[];
  onSizeSelect: (talla: string) => void;
  selectedSize?: string;
}

export function SizeSelector({
  tallas,
  onSizeSelect,
  selectedSize,
}: SizeSelectorProps) {
  if (!tallas || tallas.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Selecciona tu talla:</label>
      <div className="flex flex-wrap gap-2">
        {tallas.map((talla) => (
          <Button
            key={talla}
            variant={selectedSize === talla ? "default" : "outline"}
            size="sm"
            className="w-12 h-10"
            onClick={() => onSizeSelect(talla)}
          >
            {talla}
          </Button>
        ))}
      </div>
    </div>
  );
}
