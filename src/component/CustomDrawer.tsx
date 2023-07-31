import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ActivityIndicator } from 'react-native-paper'

import {useLogoutMutation} from '../features/AuthApiSlice';
import {logOut} from '../features/Auth'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import {useProfileQuery} from '../features/AuthApiSlice';
import { useGetBooksWithInRadiusQuery } from '../features/BookSlice';

const CustomDrawer = (props: any) => {
  const dispatch = useDispatch();
  const arg = 1;
  const [logout,{ isSuccess, isLoading }] = useLogoutMutation();
  const {data:books} = useGetBooksWithInRadiusQuery(arg);
  const {data: profile } = useProfileQuery(arg);

  const handleLogout = async () => {
    try {
      await logout(arg);
      dispatch(logOut());
      // props.navigation.navigate('Root', {screen: 'Onboarding'});
    } catch (error) {}
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../assets/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={profile.data.avatar.url ? {uri: profile.data.avatar.url} : require('../assets/avatar.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {profile.data.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {books?.count} Books in Your Area
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="share" size={22} color="#000" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#000',
              }}>
              Tell Your Friends
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handleLogout()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="exit-to-app" size={22} color="#000" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#000',
              }}>
              Sign Out 
            </Text>
            {
              isLoading && <ActivityIndicator
              animating={true}
              size={25}
              color="#AD40AF"
              style={{marginLeft: 20}}
            />
            }
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
