/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addExtraItem, qtyDecrement, qtyIncrement, resetCardAfterProductAdded, varientProduct, viewItemDetails } from "@/store/features/cart"
import { useAppDispatch, useAppSelector } from "@/store/useReduxStore"
import { addedToProductCart } from "@/store/zustand/addTocart"
import { MinusCircle, PlusCircle } from "lucide-react"
// import useAddToCart, { addExtraItem, , viewItemDetails } from "@/store/zustand/addTocart"
import { useState } from "react"

const Pizza = ({ menu }: any) => {

  const [dialogOpen, setDialogOpen] = useState(false)
  const [variantChecked, setVariantChecked] = useState(null)

  const dispatch = useAppDispatch()
  const { price, extraItemPrice, qty, item, extraAssaign, itemVarient } = useAppSelector((state: any) => state.cart)

  let totalPrice = price

  if (qty) {
    totalPrice = (price + extraItemPrice) * qty
  }

  const addToCart = (value: any) => {
    const readyToAddCart = {
      id: item.id,
      name: item.name,
      price: price,
      extra_price: extraItemPrice,
      total_price: totalPrice,
      qty: qty,
      preparation_time: item?.preparation_time,
      item_varient: itemVarient,
      extra_assign: extraAssaign
    }
    addedToProductCart(readyToAddCart);
    setDialogOpen(!dialogOpen)
    dispatch(resetCardAfterProductAdded())
  }



  const onClickProduct = (product: any) => {
    setDialogOpen(!dialogOpen)
    dispatch(viewItemDetails(product));
  }

  const onClickProductVariant = (variantProduct: any) => {
    if (variantProduct?.id) {
      setVariantChecked(variantProduct?.id)
      dispatch(varientProduct(variantProduct));
    }
  }

  return (
    <div className="mt-6" id={`#${menu?.name}`}>
      <h3 className=" text-[18px] font-semibold">{menu?.name}</h3>
      <p className=" text-[14px] text-gray-500">{menu?.description}</p>


      <div className="grid grid-cols-12 gap-4 mt-6 ">
        {menu?.items.map((product: any) => {
          return (
            <div className="col-span-12 p-2 bg-white rounded-sm shadow-md cursor-pointer hover:shadow-2xl md:col-span-6" key={product?.id}>
              <div className="w-full" >
                <div className="flex flex-col-reverse md:flex-row justify-between  min-h-[120px] h-auto gap-4" onClick={() => onClickProduct(product)} >
                  <div className="basis-[65%] text-left">
                    <div className="flex items-center justify-between ">
                      <h3 className="font-semibold ">{product?.name}</h3>
                      {/* <div className=" h-[30px] w-[50px] rounded-sm bg-red-500 p-1 text-center text-[14px] text-white">50%</div> */}
                    </div>
                    <p className=" my-2 text-[12px] text-gray-500">{`${product?.description?.length < 100 ? product?.description : `${product?.description?.substring(0, 100)}...`}`}</p>
                    <div className=" mt-2 text-[14px]">
                      {product?.discount_price > 0 && <><span className=" mr-2 text-[#eb8394]">BDT{product?.discount_price} </span> <del>BDT{product?.price}</del></>}
                      {product?.discount_price == 0 && <><span className="">BDT {product?.price} </span></>}
                    </div>

                    <div>
                      <div className="flex gap-2 text-[10px]">
                        {product?.item_details?.map((varient: any) => {
                          return (<span className="p-1 text-gray-800 rounded-full hover:underline bg-primary " onClick={() => onClickProductVariant(varient)}>{varient?.name} {`($${varient.price})`}</span>)
                        })}
                      </div>
                    </div>

                  </div>
                  <div className=" basis-[35%] min-h-[50px]">
                    <img src={`${process.env.IMAGE_URL}${product?.image}`} className="object-contain object-center w-full h-full rounded-lg " alt="/" />
                  </div>
                </div>
              </div>
            </div >
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={() => { setDialogOpen(!dialogOpen); setVariantChecked(null); dispatch(resetCardAfterProductAdded()) }} >
        <DialogContent className="sm:max-w-[525px] p-0 ">
          <div className=" h-[600px] overflow-y-auto pb-6">
            <div className="h-[250px]">
              <img src={`${process.env.IMAGE_URL}${item?.image}`} className="object-contain object-center w-full h-full" alt="/" />
            </div>
            <div className="p-4">
              <div className="">
                <h1 className="text-2xl font-bold">{item?.name}</h1>
                <p>{item?.description}</p>
              </div>
              <div className="w-full my-4 border-b" />

              <div>
                <RadioGroup name="variant" className="flex flex-wrap" onValueChange={(variantProduct: any) => onClickProductVariant(variantProduct)} >
                  <div className="grid w-full grid-cols-12 gap-4">
                    {item?.item_details?.map((item_detail: any, index: any) => {
                      return (<>
                        <div className="col-span-12" key={index}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-1">
                              <RadioGroupItem id={`varient-${index}`} value={item_detail} checked={item_detail?.id === variantChecked ? true : false} />
                              <label htmlFor={`varient-${index}`}>{item_detail?.name}</label>
                            </div>
                            <div>
                              <span>${item_detail?.price}</span>
                            </div>
                          </div>
                        </div>
                      </>)
                    })}
                  </div>
                </RadioGroup>
              </div>

              <div>
                {item?.extra_assigns?.map((extra: any, index: any) => {
                  return (<div key={index}>
                    {extra?.extra_item_details?.map((itemDetail: any, index: any) => {
                      return (<>
                        <p key={`heading-${index}`} className="mt-4 text-lg font-medium">{itemDetail?.title}</p>
                        <div className="space-y-2">
                          {itemDetail?.details?.map((detail: any, index: any) => {
                            return (
                              <div className="flex items-end justify-between" key={`item-name-${index}`} >
                                <div className="flex items-center space-x-1 ">
                                  <Checkbox id="terms2" onClick={(e) => dispatch(addExtraItem({ e: e, extra: detail, index: index }))} />
                                  <Label>{detail.name}</Label>
                                </div>
                                <div className="flex items-end">
                                  ${detail.price}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </>)
                    })}
                  </div>)
                })}
              </div>

              <div className="h-[100px] space-y-6">
                <div className="flex items-center justify-center gap-6 pt-6">
                  <span><MinusCircle className="transition-all hover:scale-110" onClick={() => dispatch(qtyDecrement(1))} /></span>
                  <span>{qty}</span>
                  <span><PlusCircle className="transition-all hover:scale-110" onClick={() => dispatch(qtyIncrement(1))} /></span>
                </div>
                <Button className="w-full" onClick={() => addToCart(item)} >Add for BDT  ${totalPrice}</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Pizza


