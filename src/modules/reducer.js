/*
In Redux, a reducer is a pure function that takes in the current state and an action object, and returns a new state. 
The reducer is responsible for updating the application state in response to an action.
*/
import { createSlice } from '@reduxjs/toolkit'
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  GET_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS
} from './actions'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    user: {},
    error: null,
    account_info: []
  },
  reducers: {
    fetchUserSuccess: FETCH_USER_SUCCESS,
    fetchUserError: FETCH_USER_ERROR,
    getAccountsuccess: GET_ACCOUNT_SUCCESS,
    deleteAccountSuccess: DELETE_ACCOUNT_SUCCESS,
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchUserSuccess,
  fetchUserError,
  getAccountsuccess,
  deleteAccountsuccess,
} = mainSlice.actions

export default mainSlice.reducer