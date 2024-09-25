import React, { FC } from "react"

import { Button } from "@/components/ui/button"

import useFormSettingStore from "./FormSetting"

type IFormCardFooter = {
  children?: React.ReactNode
  update?: boolean,
  form?: any;
}

const FormCardFooter: FC<IFormCardFooter> = ({ children, update, form }) => {
  const { collapseToggle, setUpdate } = useFormSettingStore((state: any) => state)

  const resetForm = () => {
    collapseToggle();
    form.reset();
    // setUpdate({});
  };

  return (
    <div className="flex justify-end items-center gap-4 mt-4">
      <Button
        type="button"
        variant={"outline"}
        onClick={resetForm}
        size={"sm"}
        className="border border-red-500 text-red-500 hover:text-red-600"
      >
        Cancel
      </Button>
      <Button type="submit" variant={"outline"} size={"sm"}>
        {update ? "Update" : "Save"}
      </Button>
      {children}
    </div>
  )
}

export default FormCardFooter
