type ObjectKey<T = any> = { [key: string]: T };

interface IngredientState {
  ingredients: string[];
}

interface Receipt {
  name: string;
  unit?: string;
}

interface StepState {
  steps: string[];
}
