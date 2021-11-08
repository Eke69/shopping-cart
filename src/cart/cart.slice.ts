import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/products.slice";
import { RootState } from "../store";

interface ProductInCart extends Product {
    quantity: number;
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as ProductInCart[],
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const productIndex = state.findIndex(product => product.id === action.payload.id);
            if (productIndex !== -1){
                state[productIndex].quantity += 1;
            }else{
                state.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productIndex = state.findIndex(product => product.id === action.payload);
            if (state[productIndex].quantity > 1) {
                state[productIndex].quantity -=1;
            }else {
                return state.filter(product => product.id !== action.payload)
            }

        },
    }

});

export const getProductsInCart = (state: RootState) => state.cart;
export const getTotalCartValue = (state: RootState) => state.cart.reduce((acc, next) => acc += (next.amount * next.quantity), 0);
export const getTotalItems = (state: RootState) =>state.cart.reduce((acc: number, next) => acc + next.quantity, 0);

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;