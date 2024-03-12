import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IngredientState = {
  ingredients: [],
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredient(state, action: PayloadAction<string[]>) {
      state.ingredients = action.payload;
    },
  },
});

export const { setIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
