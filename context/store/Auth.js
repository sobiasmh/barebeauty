import React, {useReducer, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import auth_reducers from '../reducers/auth_reducers';
import { setCurrentUser } from '../actions/auth_actions';
import AuthGlobal from './AuthGlobal';

const Auth = props =>{
    const [stateUser, dispatch] = useReducer(auth_reducers, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(()=>{
        setShowChild(true);
        if(AsyncStorage.jwt){
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "" ;
            if(setShowChild){
                dispatch(setCurrentUser(jwtDecode(decoded)))
            }
        }
        return () => setShowChild(false);
    }, [])

    if(!showChild){
        return null;
    } else{
        return(
            <AuthGlobal.Provider
            value={{
                stateUser,
                dispatch
            }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;
