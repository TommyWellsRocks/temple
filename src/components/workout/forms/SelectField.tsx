import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Select } from "~/components/ui/select";

export function SelectField({
  control,
  name,
  label,
  placeholder,
  items,
  isMulti,
}: {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  items: { value: string; label: string }[];
  isMulti?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onChange={(values) => {
                isMulti
                  ? field.onChange(values.map(({ label }) => label))
                  : field.onChange(values.at(0)?.label);
              }}
              items={items}
              placeholder={placeholder}
              isMulti={isMulti}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
