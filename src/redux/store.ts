import { configureStore } from "@reduxjs/toolkit";
import { ingredientReducer, receiptReducer, stepReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    receipts: receiptReducer,
    steps: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
