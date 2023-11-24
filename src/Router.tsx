import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './navigator/AuthStack';
import AppStack from './navigator/AppStack';
import {useProfileQuery} from './features/AuthApiSlice';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from './features/Auth'
import Loader from './component/Loader';

type Props = {
  navigation:any;
  route:any;
};

const Router = (props: Props) => {
  const dispatch  = useDispatch();
  const aksht = 1;
  const {
    data: profile,
    isSuccess,
    isFetching,
    isLoading,
    refetch,
  } = useProfileQuery(aksht);

  const isLogedin = useSelector((state:any)=> state.Auth.isLoggedIn);

  useEffect(()=>{
    if(isSuccess){
      dispatch(logIn());
    }
  },[isSuccess])

  return (
    <NavigationContainer>
      {/* {isLoading ?  <Loader/> : (isLogedin  ? <AppStack /> : <AuthStack />)} */}
      {(isLogedin  ? <AppStack /> : <AuthStack />)}
    </NavigationContainer>
  );
};

export default Router;
