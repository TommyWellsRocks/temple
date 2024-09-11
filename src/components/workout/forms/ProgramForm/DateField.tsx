import { cn } from "~/lib/utils";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function DateField({
  control,
  name,
  fieldLabel,
  dateLabel,
  fromDate,
  toDate,
  setter,
}: {
  control: any;
  name: string;
  fieldLabel: string;
  dateLabel: string;
  fromDate: Date;
  toDate?: Date;
  setter: Function;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{fieldLabel}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "EEE, MMM d, yyyy")
                  ) : (
                    <span>{dateLabel}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(e) => {
                  field.onChange(e)
                  setter(e)
                }}
                fromDate={fromDate}
                toDate={toDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
