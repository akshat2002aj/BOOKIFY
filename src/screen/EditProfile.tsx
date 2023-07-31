import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Switch} from 'react-native-paper';
import GeoLocation from 'react-native-geolocation-service';
import {Formik} from 'formik';
import * as Yup from 'yup';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Input from '../component/Input';
import {useProfileQuery, useUpdateProfileMutation} from '../features/AuthApiSlice';
import Header from '../component/Header';
import BottomSheet from '../component/BottomSheet';
import Loader from '../component/Loader';

type Props = {
  navigation: any;
};

type Register = {
  email: string;
  name: string;
  pincode: any;
  address: any;
  phone: any;
};

const validationSchema = Yup.object({
  name: Yup.string().trim().min(5, 'Name must be at least 8 characters'),
  email: Yup.string().email('Invalid email address'),
  phone: Yup.number(),
  address: Yup.string().trim().min(10, 'Address must be of 10 characters'),
  pincode: Yup.number(),
});

const EditProfile = (props: Props) => {
  const [hasLocationPermission, setLoactionPermission] = useState(false);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [image, setImage] = useState('');
  const [imageData, setImageData] = useState<any>('');
  const [location, setLocation] = useState<any>([0, 0]);
  const [userData, setUserData] = useState<any>({});

  const arg = 1;
  const {data: profile, isLoading:lodingProfile, isSuccess} = useProfileQuery(arg);
  
  const [updateProfile, {data, isLoading, isSuccess:success, isError}] = useUpdateProfileMutation();

  useEffect(()=>{
    if(isSuccess){
      setLocation([profile.data.location.coordinates[0].toFixed(8),  profile.data.location.coordinates[1].toFixed(8)])
    }
  }, [isSuccess])

  useEffect(() => {
    if(success){
      props.navigation.goBack();
    }
  }, [success]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'BOOKIFY App Location Permission',
          message:
            'BOOKIGY App needs access to your location ' +
            'so we can show books to near by users.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoactionPermission(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const userInfo = {
    email: profile.data.email,
    name: profile.data.name,
    pincode: profile.data.pincode.toString(),
    address: profile.data.address,
    phone: profile.data.phone.toString(),
  };

  const handleSubmit = async (data: FormData) => {
    try {
      const res = await updateProfile({
        id: profile.data._id,
        data:data
      })
      setUserData(res)
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };
  const registerHandler = async (data: Register) => {
    const myForm = new FormData();
    myForm.append('name', data.name);
    myForm.append('email', data.email);
    myForm.append('address', data.address);
    myForm.append('phone', data.phone);
    myForm.append('pincode', data.pincode);
    myForm.append('location', location)
    if(imageData){

      myForm.append('avatar', {
        uri: image,
        type: imageData.mime,
        name: data.name,
        filename: 'user',
      })
    }
    handleSubmit(myForm)
  };

  useEffect(() => {
    if (updateLocation ) {
      Alert.alert(
        'Location Alert',
        'Same location will be used to deliver any of your book to the user (Borrower). Are you sure you want to update the location?',
      );
      if(hasLocationPermission){
        GeoLocation.getCurrentPosition(
          position => {
            setLocation([position.coords.longitude, position.coords.latitude])
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }else{
        Alert.alert(
          'Location Alert',
          'Allow Location permission from the  settings to register.',
        );
      }
    }else{
      setLocation([profile.data.location.coordinates[0].toFixed(8),  profile.data.location.coordinates[1].toFixed(8)])
    }
  }, [updateLocation]);

  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={() => {
          props.navigation.goBack();
        }}
        title="Edit Profile"
        icon={
          <Feather
          name="x"
          color="#000"
          size={27}
          style={{marginRight: 5}}
        />
        }
      />
      {/* // avatar ? { uri: avatar } :  */}
      <ScrollView style={{marginTop: 50}}>
        <View style={styles.register}>
          <Avatar.Image
            size={80}
            source={image ? { uri: image } :(profile.data.avatar ? {uri: profile.data.avatar.url} : require('../assets/avatar.png'))}
            style={{backgroundColor: '#fff'}}
          />
            <TouchableOpacity onPress={() => {setSheet(true)}}>
              <Text style={{color: '#AD40AF'}}>Change Photo</Text>
            </TouchableOpacity>


          <View style={{width: '80%', marginTop: 30}}>
            {lodingProfile ? <Loader/>: <Formik
              initialValues={userInfo}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                registerHandler(values);
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => {
                const {name, email, address, pincode, phone} = values;
                return (
                  <>
                    <Input
                      placeholder="Name"
                      value={name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={touched.name && errors.name}
                      icon={
                        <MaterialIcons
                          name="person-outline"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Email"
                      value={email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email}
                      icon={
                        <MaterialIcons
                          name="alternate-email"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Phone Number"
                      value={phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      error={touched.phone && errors.phone}
                      keyboardType="number-pad"
                      icon={
                        <MaterialIcons
                          name="phone"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Address"
                      value={address}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      error={touched.address && errors.address}
                      icon={
                        <MaterialIcons
                          name="my-location"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      placeholder="Pincode"
                      value={pincode}
                      onChangeText={handleChange('pincode')}
                      onBlur={handleBlur('pincode')}
                      error={touched.pincode && errors.pincode}
                      keyboardType="number-pad"
                      icon={
                        <MaterialIcons
                          name="my-location"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      value={`${location[0]} N, ${location[1]} E`}
                      icon={
                        <EvilIcons
                          name="location"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#000'}}>
                        Do you want to update location?
                      </Text>
                      <Switch
                        value={updateLocation}
                        onValueChange={() => setUpdateLocation(!updateLocation)}
                        color="#AD40AF"
                      />
                    </View>
                    {/* <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {}}
                      value={true}
                    /> */}
                    {isError && (
                      <Text style={styles.error}>
                        {userData.error?.data?.message}
                      </Text>
                    )}
                    <Button
                      style={styles.btn}
                      onPress={() => handleSubmit()}
                      loading={isLoading}
                      textColor="#fff">
                      {isLoading ? (
                        <>
                          <Text>Loading...</Text>
                        </>
                      ) : (
                        <Text>Update</Text>
                      )}
                    </Button>
                  </>
                );
              }}
            </Formik>}
          </View>
        </View>
        <BottomSheet isVisibel={sheet} setIsVisible={setSheet} setImage={setImage} setImageData={setImageData}/>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#AD40AF',
    padding: 5,
    marginTop: 25,
    // width: '70%',
  },
  headerText: {
    fontSize: 30,
    marginVertical: 30,
    color: '#20315f',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginRight: 10,
    marginBottom: 2,
    marginTop:10,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
});

/*
    location = location.split(',');
    location[0] = Number(location[0]);
    location[1] = Number(location[1]);

          location: {
        type: 'Point',
        coordinates: location,
      },
*/