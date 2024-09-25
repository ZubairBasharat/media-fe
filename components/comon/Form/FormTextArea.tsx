import { FC } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

interface InputFieldProps {
  label?: string
  placeholder?: string
  type?: string
}

type FormInputProps = {
  name: string
} & InputFieldProps

const FormTextArea: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2">
          <FormControl>
            <Textarea {...field} {...otherProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextArea
