import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screen/Login';
import Register from '../screen/Register';
import OnBoarding from '../screen/OnBoarding';
import AppStack from './AppStack';
import Home from '../screen/Home';
import BookDetail from '../screen/BookDetail';

type Props = {}


export type RootStackParamList = {
  OnBoarding:undefined;
  Login: undefined;
  Register:undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = (props: Props) => {
  return (
        <Stack.Navigator initialRouteName='OnBoarding' screenOptions={{headerShown:false}}>
          <Stack.Screen 
            name='OnBoarding' 
            component={OnBoarding}
          />
          <Stack.Screen 
            name='Login' 
            component={Login} 
          />
          <Stack.Screen 
            name='Register' 
            component={Register} 
          />
        </Stack.Navigator>
  )
}
export default AuthStack;