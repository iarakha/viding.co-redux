import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReceiptState {
  receipt: Receipt[];
}

const initialState: ReceiptState = {
  receipt: [],
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    setReceipts(state, action: PayloadAction<Receipt[]>) {
      state.receipt = action.payload;
    },
  },
});

export const { setReceipts } = receiptSlice.actions;
export default receiptSlice.reducer;
