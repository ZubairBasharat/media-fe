"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useFormContext } from "react-hook-form";
type Props = {
  name: string,
  label: string
}

const FormCheckbox = ({ name, label }: Props) => {
  const { control, formState: { errors } }: any = useFormContext();
  return (<>
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (<div className=" flex items-center gap-x-2">
          <Checkbox checked={field.value} value={field.value} onCheckedChange={field.onChange} />
          <label>{label}</label>
        </div>)
      }}
    />

  </>)
}

export default FormCheckbox


