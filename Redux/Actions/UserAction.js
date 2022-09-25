import baseURL from '../../assets/common/baseURL';
import axios from 'axios';

// Login User
export const userLogin = (email, password) => async dispatch => {
    try {
      dispatch({
        type: 'userLoginRequest',
      });
  
      const config = {headers: {'Content-Type': 'application/json'}};
  
      const {data} = await axios.post(
        `${baseURL}user/login`,
        {email, password},
        config,
      );
      dispatch({
        type: 'userLoginSuccess',
        payload: data.user,
      });
    } catch (error) {
        console.log(error)
      dispatch({
        type: 'userLoginFalse',
        payload: error.response.data.message,
      });
    }
  };

  //logout
  export const logOutUser = () => async dispatch => {
    try {
      await axios.get(
        `${baseURL}user/logout`,
      );
      dispatch({type: 'userLogOutSucess'});
    } catch (error) {
      console.log(error)

      dispatch({type: 'userLogOutFail', payload: error.response.data.message});
    }
  };

  // Registration User
export const register = (getname, getemail, getPassword) => async dispatch => {
  try {
    dispatch({type: 'userCreateRequest'});

    const {data} = await axios.post(
      `${baseURL}user/register`,
      {name: getname,
         email: getemail, 
         password:getPassword},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({type: 'userCreateSuccess', payload: data.user});
  } catch (error) {
    console.log(error)

    dispatch({
      type: 'userCreateFail',
      payload: error.response.data.message,
    });
  }
};