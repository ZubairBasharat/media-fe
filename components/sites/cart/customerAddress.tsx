import FormInput from "@/components/comon/Form/FormInput"
import { FormRadioGroup } from "@/components/comon/Form/FormRadioGroup"
import { Button } from "@/components/ui/button"

type Props = {}

const CustomerAddress = (props: Props) => {
    return (
        <>
            <h2 className="pb-4">Payment Information:</h2>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormInput name="name" placeholder=" Enter Your Name" />
                </div>
                <div className="col-span-6">
                    <FormInput name="phone" placeholder=" Enter Your Phone" />
                </div>
                <div className="col-span-12">
                    <FormInput name="address" placeholder=" Enter Your Address" />
                </div>
            </div>
            <h2 className="py-4">Payment Methods:</h2>
            <div className="">
                <div className="flex items-center space-x-2">
                    <FormRadioGroup name="type" />
                </div>
            </div>
            <div className="text-right mt-6  p-2">
                <Button type="submit" >Place Order</Button>
            </div>
        </>
    )
}

export default CustomerAddress