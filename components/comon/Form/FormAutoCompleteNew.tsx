"use client"

import { Controller, useFormContext } from "react-hook-form"
import Select from "react-select"

export function FormAutoCompleteNew({
  name,
  singleListName,
  data,
  isMulti,
  ...otherProps
}: any) {
  const {
    control,
    setValue,
    formState: { errors, defaultValues },
  }: any = useFormContext()

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select
              className="mt-2 rounded-md border-[1px] border-[#5D70D0]"
              options={data}
              isClearable
              isMulti={isMulti}
              value={field?.value ? (!isMulti ? (data?.filter((option: any) => {
                return field?.value?.value === option?.id?.toString() || field?.value === option?.id?.toString();
              })?.map((item: any) => {
                return {
                  value: item?.value?.toString(),
                  label: item?.label,
                };
              })[0]) : data?.filter((option: any) => {
                return field?.value?.toString()?.includes(option?.value?.toString());
              })) : null}
              onChange={(item: any) => {
                console.log("item", item?.[0]?.value?.toString());
                const values = item?.map((singleData: any) => singleData?.value?.toString())
                setValue(name, values)
              }}
            />
          )
        }}
      />
      <p className="text-sm font-medium text-destructive">{errors?.[`${singleListName}_id`]?.message || ""}</p>
    </>
  )
}
