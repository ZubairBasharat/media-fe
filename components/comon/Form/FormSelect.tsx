import { FC } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InputFieldProps {
  label?: string
  placeholder?: string
  type?: string
}

type FormInputProps = {
  name: string,
  data: any[]
} & InputFieldProps

const FormSelect: FC<FormInputProps> = ({ name, data, ...otherProps }) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem>
          <FormLabel>{otherProps.label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={otherProps.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <ScrollArea className="h-[120px] rounded-md border">
                {data?.map((item: any) => <SelectItem key={item.id} value={item.id?.toString()}>{item.name}</SelectItem>)}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelect
