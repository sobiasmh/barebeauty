import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
  };

  export const userReducer = createReducer(initialState, {
    userLoginRequest: state => {
      state.loading = true;
      state.isAuthenticated = false;
    },
  
    userLoginSuccess: (state = {user: {}}, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;

    },

    userLoginFalse: (state = {user: {}}, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    userLogOutSucess: (state = {user: {}}) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    userLogOutFail: state => {
      state.loading = false;
      state.error = action.payload;
    },

    userCreateRequest: state => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    userCreateSuccess: (state = {user: {}}, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
      state.isAuthenticated = true;

    },
    userCreateFail: (state = {user: {}}, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
   
    deleteAccountSuccess: (state = {user: {}}) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    deleteAccountFail: state => {
      state.loading = false;
      state.error = action.payload;
    }
  });