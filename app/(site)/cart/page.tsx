"use client"
import useToast from "@/components/hooks/useToast"
import RestaurantNavbar from "@/components/sites/Restaurants/RestaurantNavbar/page"
import CustomerAddress from "@/components/sites/cart/customerAddress"
import CustomerLoginCart from "@/components/sites/login/customerLoginCart"
import CustomerSignUpCart from "@/components/sites/signup/CustomerSignup"
import { usePlaceOrderMutation } from "@/store/features/Website/Cart"
import { useSingleUserQuery } from "@/store/features/admin/users/userApiSlice"

import useAddToCart, { cartItemReset } from "@/store/zustand/addTocart"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

type Props = {}

const formSchema = z.object({
  name: z
    .string()
    .nullable(),
  address: z
    .string()
    .nullable(),
  phone: z
    .string()
    .nullable()
})

const CartDetails = (props: Props) => {
  const navigate = useRouter()
  const searchParams = useSearchParams()
  const restoId = searchParams.get('resto')
  const { ToastSuccess, ToastError } = useToast()
  const user = useAuthStore((state: any) => state.user)
  const { data: userInfo } = useSingleUserQuery();
  const { cartProduct } = useAddToCart()
  const totalPrice = cartProduct.reduce((total: any, item: any) => total + item.total_price, 0);
  const totalqty = cartProduct.reduce((total: any, item: any) => total + item.qty, 0);
  const totalPreparationTime = cartProduct.reduce((total: any, item: any) => total + parseInt(item.preparation_time), 0);
  const [order] = usePlaceOrderMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: ""
    },
  })

  useEffect(() => {
    form.reset({
      name: userInfo?.data?.name || "",
      phone: userInfo?.data?.phone || "",
      address: userInfo?.data?.address || ""
    });
  }, [userInfo]);


  const onSubmitOrder = async (value: any) => {

    const orderData = {
      user_id: user?.user,
      restaurant_id: restoId,
      cartProduct: cartProduct,
      total_quantity: totalqty,
      total_price: totalPrice,
      preparation_time: totalPreparationTime,
      paid_amount: 0,
      discount: 0,
      due_amount: totalPrice,
      // shipping
      name: value?.name,
      phone: value?.phone,
      address: value?.address,
      // payment
      type: value?.type
    }
    try {
      await order(orderData).unwrap().then((res) => {
        if (res?.code === 200) {
          cartItemReset()
          ToastSuccess("Order has been confirmed successfully")
          navigate.push('/')
        }
      }).catch((err) => { })
    } catch (error) {

    }

  }

  return (
    <>
      <RestaurantNavbar />
      <div className="flex h-[calc(100vh-5rem)]">
        <div className="container p-6">

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <div className="shadow rounded-lg p-4">
                {!user.access_token ?
                  <>
                    <CustomerLoginCart />
                    <CustomerSignUpCart />
                  </>
                  :
                  (<FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitOrder)} ><CustomerAddress /></form>
                  </FormProvider>)
                }
              </div>
            </div>
            <div className="col-span-4">
              <div className="shadow rounded-lg p-4">
                <ul className="space-y-4">
                  {cartProduct?.map((item: any, index: any) => {
                    return (
                      <li className="flex flex-col" key={index}>
                        <div className="flex justify-between items-center">
                          <p className="text-sm leading-0 font-bold text-gray-500" >{item.name}</p>
                          <p className="text-sm leading-0 font-bold text-gray-500" >${item.total_price}</p>
                        </div>
                        <div>
                          {item.extra_assign.map((extra: any, index: any) => {
                            return (<small className='text-[10px] text-gray-400 text-left'>{extra.name} , </small>)
                          })}
                        </div>
                      </li>
                    )
                  })}

                  <li className="flex justify-between items-center border-t pt-3">
                    <p>Subtotal</p>
                    <p>${totalPrice}</p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p>Total</p>
                    <p>${totalPrice}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default CartDetails
