import * as Actions from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.DELETE_PRODUCTS:
      return {
        ...state,
        list: [...action.payload], // return new array
      };
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload], // return new array
      };
    default:
      return state;
  }
};
