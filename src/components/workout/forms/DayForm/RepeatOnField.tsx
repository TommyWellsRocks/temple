import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";

export function RepeatOnField({ control }: { control: any }) {
  const days = [
    { day: "Sunday", id: 0 },
    { day: "Monday", id: 1 },
    { day: "Tuesday", id: 2 },
    { day: "Wednesday", id: 3 },
    { day: "Thursday", id: 4 },
    { day: "Friday", id: 5 },
    { day: "Saturday", id: 6 },
  ] as const;

  return (
    <FormField
      control={control}
      name="repeatOn"
      render={() => (
        <FormItem>
          <FormLabel>Repeat</FormLabel>
          <div className="grid grid-cols-2 gap-y-3">
            {days.map((day) => (
              <FormField
                key={day.id}
                control={control}
                name="repeatOn"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={day.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={(field.value as number[])?.includes(day.id)}
                          onCheckedChange={(checked) =>
                            field.onChange(
                              checked
                                ? [...field.value!, day.id]
                                : (field.value as number[])?.filter(
                                    (value: number) => value !== day.id,
                                  ),
                            )
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{day.day}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
