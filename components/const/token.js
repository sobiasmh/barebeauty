import React, { useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TokenJwt = () =>{
    const [token, setToken] = useState();

      useFocusEffect(
          useCallback(
              ()=>{
                  AsyncStorage.getItem('jwt').then((res)=>{
                      setToken(res)
                      console.log(token)
                  }).catch((error)=> console.log(error))
              },
              
          )
      )
      return {token}
       
}

export default TokenJwt;