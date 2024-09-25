import React, { FC } from "react"

type IFormCard = {
  children: React.ReactNode
}

const FormCard: FC<IFormCard> = ({ children }) => {
  return <div className="grid grid-cols-12 gap-4 mb-6">{children}</div>
}

export default FormCard
