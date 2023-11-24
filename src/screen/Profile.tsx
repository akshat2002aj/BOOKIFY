import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import {useDispatch} from 'react-redux';
import {useProfileQuery} from '../features/AuthApiSlice';
import Header from '../component/Header';

type Props = {
  navigation: any;
};

const Profile = (props: Props) => {
  const dispatch = useDispatch();
  const arg = 1;
  const {data: profile} = useProfileQuery(arg);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={()=>{props.navigation.navigate('EditProfile')}}
        title=""
        icon={
          <Feather
            name="edit"
            color="#000"
            size={24}
            style={{marginRight: 5}}
          />
        }
      />
      <ScrollView>
        {/* <Header navigation={props.navigation}/> */}
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image source={profile.data.avatar.url ? {uri: profile.data.avatar.url} : require('../assets/avatar.png')} size={80} style={{backgroundColor:'#fff'}}/>
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {profile.data.name}
              </Title>
              <Caption style={styles.caption}>
                @{profile.data.email.split('@')[0].toLowerCase()}
              </Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="my-location" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {profile.data.address} - {profile.data.pincode}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              +91-{profile.data.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {profile.data.email}
            </Text>
          </View>
          <View style={styles.row}>
            <EvilIcon name="location" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {profile.data.location.coordinates[0].toFixed(8)} N, {profile.data.location.coordinates[1].toFixed(8)} E
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: '#dddddd',
                borderRightWidth: 1,
              },
            ]}>
            <Title>0</Title>
            <Caption>Books Ordered</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{profile.data.booksAdded}</Title>
            <Caption>Books Added</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              props.navigation.navigate('My Books');
            }}>
            <View style={styles.menuItem}>
              <Icon name="my-library-books" color="#AD40AF" size={25} />
              <Text style={styles.menuItemText}>My Books</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {props.navigation.navigate("Payments")}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#AD40AF" size={25} />
              <Text style={styles.menuItemText}>Payments</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {props.navigation.navigate("Support")}}>
            <View style={styles.menuItem}>
              <Icon name="message" color="#AD40AF" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {props.navigation.navigate("Payments")}}>
            <View style={styles.menuItem}>
              <Icon name="share" color="#AD40AF" size={25} />
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {props.navigation.navigate("Settings")}}>
            <View style={styles.menuItem}>
              <Feather name="settings" color="#AD40AF" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
