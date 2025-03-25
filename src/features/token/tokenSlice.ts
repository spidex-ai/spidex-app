import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    tokenImage: string;
    tokenPrice: number;
}

const initialState: TokenState = {
    tokenId: '',
    tokenName: '',
    tokenSymbol: '',
    tokenImage: '',
    tokenPrice: 0,
}

const tokenSlice = createSlice({
    name: 'token',  
    initialState,
    reducers: {
     
    },
})

export const { } = tokenSlice.actions;
export default tokenSlice.reducer;