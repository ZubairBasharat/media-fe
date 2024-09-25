
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/useReduxStore';
import useAddToCart, { cartItemDecrement, cartItemIncrement } from '@/store/zustand/addTocart';
import { BaggageClaim, MinusCircle, PlusCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const SingleViewSidebar = () => {
  const navigate = useRouter()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { cartProduct } = useAddToCart()

  const totalPrice = cartProduct.reduce((total: any, item: any) => total + item.total_price, 0);
  const totalqty = cartProduct.reduce((total: any, item: any) => total + item.qty, 0);
  const totalPreparationTime = cartProduct.reduce((total: any, item: any) => total + parseInt(item.preparation_time), 0);


  return (
    <div className=" col-span-12 rounded-md border-[1px] border-gray-300 bg-white p-4 text-center lg:col-span-4">
      {cartProduct?.length > 0 ?
        <div>
          <div className='space-y-3'>
            <div className='text-[14px] text-gray-500 text-left  space-y-4'>
              {cartProduct?.map((item: any, index: any) => {
                return (<>
                  <div className='' key={index}>
                    <div className='flex justify-between items-center'>
                      <div className='basis-4/5'><p>{item.name} {item?.item_varient.name ? "(v-" + (item?.item_varient?.name) + ")" : ""}</p></div>
                      <div className='basis-1/5 flex gap-5 justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <span><MinusCircle className="w-4 h-4 hover:scale-110 transition-all" onClick={() => cartItemDecrement(index)} /></span>
                          <span>{item.qty}</span>
                          <span><PlusCircle className="w-4 h-5 hover:scale-110 transition-all" onClick={() => cartItemIncrement(index)} /></span>
                        </div>
                        <div><span>${item.total_price}</span></div>
                      </div>
                    </div>
                    <div className='text-left leading-3'>
                      <small>{item?.extra_assign.length > 0 ? "Extra - " : ""}</small>
                      {item.extra_assign.map((extra: any, index: any) => {
                        return (<small key={`extra-${index}`} className='text-[10px] text-gray-400 text-left'>{extra.name} , </small>)
                      })}
                    </div>
                  </div>

                </>)
              })}
            </div>

            <div className='flex justify-between items-center pt-6'>
              <div className='text-gray-600 font-bold text-sm' ><p>Subtotal</p></div>
              <div className='text-gray-600 font-bold text-sm' ><p>${totalPrice}</p></div>
            </div>

            <div className='flex justify-between items-center'>
              <div className='text-gray-600 text-sm font-bold'><p>Total</p></div>
              <div className='text-gray-600 text-sm font-bold'><p>${totalPrice}</p></div>
            </div>
          </div>
        </div>
        : <div className='py-8'>
          <div className=" flex justify-center">
            <BaggageClaim className=" mb-5 h-[30px] w-[40px]" />
          </div>
          <p className=" text-[14px] text-gray-500">Your Basket is empty</p>
        </div>

      }
      <Button type='button' onClick={() => navigate.push('/cart?resto=' + id)} className=" mt-6 w-full">Go to checkout</Button>
    </div>
  )
}

export default SingleViewSidebar
