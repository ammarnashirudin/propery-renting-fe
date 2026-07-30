"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  value: DateRange | undefined;

  onChange: (value: DateRange | undefined) => void;

  disabledDates?: Date[];
}

export default function DateRangePicker({
  value,
  onChange,
  disabledDates = [],
}: Props) {
  return (
    <Popover>

      <PopoverTrigger asChild>

        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "dd MMM yyyy")} -{" "}
                {format(value.to, "dd MMM yyyy")}
              </>
            ) : (
              format(value.from, "dd MMM yyyy")
            )
          ) : (
            "Select reservation date"
          )}

        </Button>

      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        align="start"
      >

        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          disabled={[
            { before: new Date() },
            ...disabledDates,
          ]}
        />

      </PopoverContent>

    </Popover>
  );
}