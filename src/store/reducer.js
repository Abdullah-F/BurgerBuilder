import * as actionTypes from './actions';

const INGREDIENTS_PRICES ={
    salad: 0.5,
    meat: 0.7,
    bacon: 2,
    cheese: 1.5,
}

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0,
    },
    totalPrice: 4,
}
const reducer = (state= initialState, action) => {
    if(actionTypes.ADD_INGREDIENT === action.type){
        const oldCount = state.ingredients[action.ingredientType];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...state.ingredients
        }
        const priceAddition = INGREDIENTS_PRICES[action.ingredientType];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        updatedIngredients[action.ingredientType] = updatedCount;
        return{
            ...state,
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        };
    }

    if(actionTypes.REMOVE_INGREDIENT === action.type){
        const oldCount = state.ingredients[action.ingredientType];
        if(oldCount > 0){
            const updatedCount = oldCount-1; 
            const updatedIngredients = {
                ...state.ingredients
            }
            updatedIngredients[action.ingredientType] = updatedCount;
            const priceSubtraction = INGREDIENTS_PRICES[action.ingredientType];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            updatedIngredients[action.ingredientType] = updatedCount;
        
            return{
                ...state,
                ingredients: updatedIngredients,
                totalPrice: newPrice
            };
        }
    }
    return state;
}


export default reducer;