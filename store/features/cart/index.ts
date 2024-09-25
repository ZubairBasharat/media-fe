import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    extraItemPrice: 0,
    qty: 1,
    price: 0,
    itemVarient: {},
    variantItemId: null,
    extraAssaign: [],
    item: {}
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        viewItemDetails: (state, action: PayloadAction<any>) => {
            state.item = action.payload
            state.price = action.payload.discount_price == 0 ? Number(action.payload.price) : Number(action.payload.discount_price)
            if (state.variantItemId !== null) {
                state.price = Number(state.item.item_details.find((item: any) => item.id === state.variantItemId).price)
            }

        },

        varientProduct: (state, action: PayloadAction<any>) => {
            state.price = Number(action.payload.price)
            state.variantItemId = action.payload.id
            state.itemVarient = {
                id: action.payload.id,
                item_id: action.payload.item_id,
                name: action.payload.name,
                price: action.payload.price
            }


        },

        qtyIncrement: (state, action: PayloadAction<any>) => {
            state.qty = state.qty + action.payload
        },

        qtyDecrement: (state, action: PayloadAction<any>) => {
            state.qty = state.qty === 1 ? 1 : state.qty - action.payload
        },

        addExtraItem: (state, action: PayloadAction<any>) => {
            let { e, extra } = action.payload || {}
            if (e.target.dataset?.state === 'unchecked') {
                state.extraAssaign = [...state.extraAssaign, extra]
                state.extraItemPrice = state.extraItemPrice + Number(extra.price)
            }
            if (e.target.dataset?.state === 'checked') {
                state.extraAssaign = [...state.extraAssaign.filter(((assign: any) => assign.id !== Number(extra.id)))]
                state.extraItemPrice = state.extraItemPrice - Number(extra.price)
            }
        },
        resetCardAfterProductAdded: (state) => {
            state.extraItemPrice = 0
            state.qty = 1
            state.price = 0
            state.extraAssaign = []
            state.item = {}
            state.itemVarient = {}
            state.variantItemId = null
        }
    },
});

export default cartSlice.reducer;
export const { qtyIncrement, qtyDecrement, addExtraItem, viewItemDetails, resetCardAfterProductAdded, varientProduct } = cartSlice.actions;