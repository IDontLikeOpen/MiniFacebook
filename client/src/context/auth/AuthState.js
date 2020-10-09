import React, { useReducer } from "react";
import axios from 'axios'
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from '../../utils/setAuthToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user - checks if there's token in place
  const loadUser = async () => { 
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    console.log('i am in load');
    try {
      const res = await axios.get('/api/auth')
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }
  // Register user
  const register =  async formData => {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/users', formData, config)
      console.log('i am in reg');
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // -- IT IS TOKEN FROM USERS.POST
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg // error msg from users when fail
      })
    }
  }

  // Login user
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth', formData, config)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data // -- IT IS TOKEN FROM USERS.POST
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg // error msg from users when fail
      })
    }
  }

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT })
  }

  // clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
