import {configureStore} from '@reduxjs/toolkit';
import {
    
    wishListaddReducer,
    wishListDataReducer,
    wishListRemoveReducer,
    cartAddReducer,
    cartDataReducer,
    cartRemoveReducer,
    cartUpdateReducer,
    newOrderReducer
  } from '../Reducers/ProductReducers';
  import {userReducer} from '../Reducers/UserReducer';

  const Store = configureStore({
    reducer: {
      user: userReducer,
      wishListAdd: wishListaddReducer,
      wishList: wishListDataReducer,
      wishListRemove: wishListRemoveReducer,
      cart: cartDataReducer,
      cartAdd: cartAddReducer,
      cartRemove: cartRemoveReducer,
      cartUpdate: cartUpdateReducer,
      orderNew: newOrderReducer,

    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  });
  export default Store;