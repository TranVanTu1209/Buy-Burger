import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../share/utility';
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

// helper functions
const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updatedObject(state, updatedState);
}
const removeIngredient = (state, action) => {
  const updatedIngredient1 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngredients1 = updatedObject(state.ingredients, updatedIngredient1);
  const updatedState1 = {
    ingredients: updatedIngredients1,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updatedObject(state, updatedState1);
}
const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building : false
  });
}

const fetchIngredientsFailed = (state, action) => {
  return updatedObject(state, { error: true });
}

// reducer
const reducer = (state = initState, action) => {
  switch (action.type)
  {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}

export default reducer;