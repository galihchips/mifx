import {combineReducers} from 'redux';

const initialState = {
  fetching: false,
  success: false,
  error: false,
  products: {},
  categories: {},
  message: null,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        categories: action.data,
      };
      break;
    case 'GET_CATEGORIES_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;
    case 'GET_PRODUCTS_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        products: action.data,
      };
      break;
    case 'GET_PRODUCTS_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;
    default:
  }
  return state;
};

const appReducer = combineReducers({
  data: data,
});

export default appReducer;
