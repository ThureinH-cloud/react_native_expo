import { createSlice } from "@reduxjs/toolkit";
type Cart={
    id:number;
    title:string;
    price:number;
    image:any;
    items:[
        {
            id:number;
            selectedColor:string;
            selectedSize:string;
            quantity:number;
        }
    ];
};
interface CartState{
    cartList:Cart[];
}
const initialState: CartState = {
    cartList: [],
}
const cartSlice=createSlice({
    name: "carts",
    initialState,
    reducers: {
        addCart:(state,action)=>{
            const cartItem=action.payload;
            if (state.cartList.length > 0) {
                const isExistIndex = state.cartList.findIndex(
                  (item) => item.id === cartItem.id
                );
                if (isExistIndex > -1) {
                  state.cartList[isExistIndex] = cartItem;
                } else state.cartList.push(cartItem);
              } else state.cartList.push(cartItem);
        },
        updateCart:(state,action)=>{
            const {id,itemId,quantity}=action.payload;
            const cartIndex = state.cartList.findIndex((item) => item.id === id);
            const itemIndex = state.cartList[cartIndex].items.findIndex(
            (item) => item.id === itemId);
            state.cartList[cartIndex].items[itemIndex].quantity=quantity;
        },
        deleteCart:(state,action)=>{
            const {id,itemId}=action.payload;
            const cartIndex=state.cartList.findIndex((item)=>item.id===id);
            if (state.cartList[cartIndex].items.length == 1) {
                state.cartList.splice(cartIndex, 1);
              } else {
                const itemIndex = state.cartList[cartIndex].items.findIndex(
                  (item) => item.id === itemId
                );
                state.cartList[cartIndex].items.splice(itemIndex, 1);
              }
        },
        
    
    },
    selectors:{
        selectCount: (carts) => {
            let totalQuantity = 0;
            if (carts.cartList.length > 0) {
              carts.cartList.forEach((cart: any) => {
                const total = cart.items.reduce(
                  (total: any, item: any) => total + item.quantity,
                  0
                );
                totalQuantity += total;
              });
            }
      
            return totalQuantity;
          },
    }
    
})
export const {addCart,deleteCart,updateCart}=cartSlice.actions;
export  const {selectCount} =cartSlice.selectors;
export default cartSlice.reducer;
