import React, { FC } from "react"

import { Form } from "@/components/ui/form"

type IFormCardBody = {
  children?: React.ReactNode
  onSubmitHandler?: any
  validation?: any
}

const FormCardBody: FC<IFormCardBody> = ({
  children,
  onSubmitHandler,
  validation,
}) => {
  return (
    <Form {...validation}>
      <form onSubmit={onSubmitHandler}>{children}</form>
    </Form>
  )
}

export default FormCardBody
