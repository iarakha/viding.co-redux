import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StepState = {
  steps: [],
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setSteps(state, action: PayloadAction<string[]>) {
      state.steps = action.payload;
    },
  },
});

export const { setSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
