
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMedicine } from "../../Type/type";

type TInitialState={
    date:string;
    email:string,
    order_product: TMedicine[];
    status: string;
    shippingInfo: object;
    price: number;
    paymentInfo: {
        payment_method:string,
        transactionId:string
    }
}
const initialState:TInitialState={
    date:new Date().toLocaleDateString(),
    email:"",
    order_product:[],
    status:"",
    shippingInfo:{},
    price:0,
    paymentInfo:{
        payment_method:'',
        transactionId:''
    }
}

const OrderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
        add_new_order:(state,action:PayloadAction<TInitialState>)=>{
           
            state.email=action.payload.email
            state.order_product=action.payload.order_product
            state.price=action.payload.price
            state.shippingInfo=action.payload.shippingInfo
            state.paymentInfo=action.payload.paymentInfo
            state.status=action.payload.status
            console.log(state)
        },
        paymentInfoUpdate:(state,action:PayloadAction<any>)=>{
            state.paymentInfo={...state.paymentInfo,...action.payload}
        }
    }
})

export const {add_new_order, paymentInfoUpdate}=OrderSlice.actions
export default OrderSlice.reducer