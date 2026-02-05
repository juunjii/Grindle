"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "./button"; 
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function RangeDatePicker({
  onSelect,
  selected,
  selectedMessage,
}: {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  selectedMessage: string;
}) {
  const [open, setOpen] = useState(false);
  const formattedRange =
    selected?.from && selected?.to
      ? `${selected.from.toLocaleDateString("en-GB")} - ${selected.to.toLocaleDateString("en-GB")}`
      : selectedMessage;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-fit font-normal">
          {formattedRange}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar mode="range" selected={selected} onSelect={onSelect} captionLayout="dropdown" />
      </PopoverContent>
    </Popover>
  );
}
