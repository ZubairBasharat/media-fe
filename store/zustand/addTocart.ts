import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState: any = {
    cartProduct: [],
}

const useAddToCart = create(persist(
    () => ({ ...initialState }),
    { name: "cart", storage: createJSONStorage(() => sessionStorage) }
));


export const addedToProductCart = (item: any) => {
    useAddToCart.setState((state: any) => ({
        cartProduct: [...state.cartProduct, item],
    }))
}

export const cartItemReset = () => {
    useAddToCart.setState((state: any) => ({
        cartProduct: [],
    }))
}

export const cartItemIncrement = (index: any) => {
    const { cartProduct } = useAddToCart.getState()
    const copyProduct = [...cartProduct]
    copyProduct[index].qty += 1;
    copyProduct[index].total_price = (copyProduct[index].price + copyProduct[index].extra_price) * copyProduct[index].qty
    useAddToCart.setState((state: any) => ({ cartProduct: copyProduct }))
}
export const cartItemDecrement = (index: any) => {
    const { cartProduct } = useAddToCart.getState()
    let copyProduct = [...cartProduct]
    copyProduct[index].qty = Math.max(copyProduct[index].qty - 1, 0);
    copyProduct[index].total_price = (copyProduct[index].price + copyProduct[index].extra_price) * copyProduct[index].qty
    if (copyProduct[index].qty === 0) {
        copyProduct = copyProduct.filter((item: any) => item.qty !== copyProduct[index].qty)
    }
    useAddToCart.setState((state: any) => ({ cartProduct: copyProduct }))
}

export default useAddToCart;