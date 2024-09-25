import { FC } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface InputFieldProps {
  label?: string
  placeholder?: string
  type?: string,
  disabled?: any;
}

type FormInputProps = {
  name: string
} & InputFieldProps

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2">
          <FormControl>
            <Input {...field} {...otherProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
