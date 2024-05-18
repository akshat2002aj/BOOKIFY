import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Support from '../screen/Support';
import Settings from '../screen/Settings';
import CustomDrawer from '../component/CustomDrawer';
import MyBooks from '../screen/MyBooks';
import Payments from '../screen/Payments';
import BookDetail from '../screen/BookDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditProfile from '../screen/EditProfile';
import AddBook from '../screen/AddBook';
import Checkout from '../screen/Checkout';
import Summary from '../screen/Summary';
import Landed from '../screen/Landed';
import Chat from '../screen/Chat';

const Stack = createNativeStackNavigator<any>();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="person" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Books"
        component={BookStack}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="my-library-books" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={Payments}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="credit-card" size={22} color={color} />
          ),
        }}
      />
        <Drawer.Screen
        name="Orders Received"
        component={Landed}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="credit-card" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="Home1"
        component={Home}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetail}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={({route}) => ({
          id: route.params?.id,
          payment: route.params?.payment
        })}
      />
      <Stack.Screen
        name="Summary"
        component={Summary}
        options={({route}) => ({
          id: route.params?.id,
        })}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({
          id: route.params?.id,
          name: route.params?.name
        })}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="Profile1"
        component={Profile}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

const BookStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="My Books1"
        component={MyBooks}
      />
      <Stack.Screen
        name="AddBook"
        component={AddBook}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
