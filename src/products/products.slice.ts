import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import productData from '../db.json';

export interface Product {
    id: number;
    image: string;
    title: string;
    amount: number
};

export interface ProductsSliceInterface {
    products: any[];
    loading: Boolean
}

const initialState: ProductsSliceInterface = {
    products : productData.response as Product[],
    loading: false
};


export const getProducts = createAsyncThunk(
        'products/getProducts',
        // callback function
        async (thunkAPI) => {
          const res = await fetch('http://localhost:8000/response').then(
          (data) => data.json()
        )
        return res;
      })

export const productSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {

        },
        extraReducers: builder => {
            builder.addCase(getProducts.fulfilled, (state, {payload}) => {
                state.loading = false
                state.products = [...payload]
            })
            builder.addCase(getProducts.pending, (state, action) => {
                state.loading = true
            })
            builder.addCase(getProducts.rejected, (state, action) => {
                state.loading = false
            })
        }
            
    });



export const getProductsSelector = (state: RootState) => state.products;


export default productSlice.reducer;