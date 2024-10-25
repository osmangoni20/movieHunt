import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TMedicine } from '../../Type/type'
import { WritableDraft } from 'immer'


type TInitialState={
    products:TMedicine[],
    totalSelectedItem:number,
    shippingCost:number,
    tax:number,
    offer:number,
    subTotal:number,
    total:number
}

const initialState:TInitialState={
    products:[],
    totalSelectedItem:0,
    shippingCost:0,
    tax:0,
    offer:0.2,
    subTotal:0,
    total:0
}


const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<TMedicine|any>)=>{
            console.log(action.payload)
            const isExist=state.products.find(product=>product._id===action.payload._id)
            
            if(!isExist){
               const order_price=Number(action.payload.price) - Number(action.payload.price) * state.offer
                state.products.push({...action.payload, quantity:1,order_price})
                state.shippingCost=100
                console.log(state.products)
                state.totalSelectedItem=calculateTotalSelectedItem(state)
                console.log(state.totalSelectedItem)
                if(Number(state.totalSelectedItem)%10==0){
                    console.log(state.totalSelectedItem, state.shippingCost)
                    state.shippingCost=state.shippingCost*2
                }
                state.subTotal=calculateSubTotal(state)
                state.total=state.tax+state.shippingCost+state.subTotal
                state.tax=calculateTax(state)
            }
        },
        deleteProduct:(state,action)=>{
        const products=state.products.filter(product=>product._id!==action.payload)
        state.products=products
        RestartState(state)
        },
        updateProduct:(state,action:PayloadAction<any>)=>{
            console.log(action.payload)

        const product=state.products.find(product=>product._id===action.payload.id) as any
            if(action.payload.type==='increment')
           {product.quantity+=1}
            else if(action.payload.type==='decrement'&&product.quantity>1){
                product.quantity-=1
            }
            else{
                product.quantity=Number(action.payload.value)
            }
            RestartState(state)
        },
        clearCart:(state)=>{
            state.products=[]
            state.subTotal=0
            state.total=0
            state.shippingCost=0
            state.tax=0
        }
    }
})
const RestartState=(state: WritableDraft<TInitialState>)=>{
    state.subTotal=calculateSubTotal(state)
    state.total=state.tax+state.shippingCost+state.subTotal
    state.totalSelectedItem=calculateTotalSelectedItem(state)
    state.tax=calculateTax(state)
}
const calculateTotalSelectedItem=(state: WritableDraft<TInitialState>)=>{
    return state.products.reduce((total,product)=>{
        return total+product.quantity
    },0)
}
const calculateTax=(state:WritableDraft<TInitialState>)=>{
    return state.products.reduce((total,product)=>{
        return total+(Number(product.price*product.quantity)*0.05)
    },0);
    
}
const calculateSubTotal=(state: WritableDraft<TInitialState>)=>{
   return state.products.reduce((total,product)=>{
        return product.order_price*product.quantity+total
    },0)
}

export const {addToCart, deleteProduct,updateProduct,clearCart}=CartSlice.actions

export default CartSlice.reducer