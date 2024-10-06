import {
    configureStore,
    ThunkAction,
    Action,
    
} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import productReducer from "./productSlice";
import requiredInfoReducer from  "./requiredInfoSlice";
import cartReducer from "./cartSlice";
export const store=configureStore({
    reducer: {
        products:productReducer,
        requiredInfo:requiredInfoReducer,
        carts:cartReducer,
    }
})
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;