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
import {Avatar, Button} from 'react-native-paper';
import GeoLocation from 'react-native-geolocation-service';
import {Formik} from 'formik';
import * as Yup from 'yup';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {logIn} from '../features/Auth';

import {useRegisterMutation} from '../features/AuthApiSlice';
import Input from '../component/Input';
import {useDispatch} from 'react-redux';

type Props = {
  navigation: any;
  route: any;
};

type Register = {
  email: string;
  name: string;
  password: string;
  confirmPassword: any;
  pincode: any;
  address: any;
  phone: any;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(5, 'Name must be at least 8 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .equals([Yup.ref('password'), null], 'Password does not match')
    .required('Confirm Password is required'),
  phone: Yup.number().required('Phone Number is required'),
  address: Yup.string()
    .trim()
    .min(10, 'Address must be of 10 characters')
    .required('Address is required'),
  pincode: Yup.number().required('Pincode is required'),
});

const Register = (props: Props) => {
  const dispatch = useDispatch();
  const [register, {isLoading, isSuccess, isError, error}] =
    useRegisterMutation();
  const [hasLocationPermission, setLoactionPermission] = useState(false);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
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
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    address: '',
    phone: '',
  };

  const handleSubmit = async (data: FormData) => {
    try {
      const res = await register(data);
      setUserData(res);
      // props.navigation.navigate('OnBoarding');
    } catch (error) {
      console.log(error);
    }
  };
  const registerHandler = async (data: Register) => {
    const myForm = new FormData();
    myForm.append('name', data.name);
    myForm.append('email', data.email);
    myForm.append('password', data.password);
    myForm.append('address', data.address);
    myForm.append('phone', data.phone);
    myForm.append('pincode', data.pincode);

    if (hasLocationPermission) {
      await GeoLocation.getCurrentPosition(
        position => {
          myForm.append('location', [
            position.coords.longitude,
            position.coords.latitude,
          ]);
          console.log(position);
          console.log(myForm);
          handleSubmit(myForm);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert("Location Alert",'Allow Location permission from the  settings to register.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // props.navigation.navigate('Profile')
      dispatch(logIn());
    }
  }, [isSuccess]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          marginTop: 40,
        }}>
        <Image
          source={require('../assets/books.jpg')}
          style={{width: 400, height: 200}}
        />
        <View style={styles.register}>
          <View style={{width: '80%'}}>
            <Text style={styles.headerText}>REGISTER</Text>
            <Formik
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
                const {
                  name,
                  email,
                  password,
                  confirmPassword,
                  address,
                  pincode,
                  phone,
                } = values;
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
                      secureTextEntry
                      placeholder="Password"
                      value={password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                      icon={
                        <MaterialIcons
                          name="lock-outline"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    <Input
                      secureTextEntry
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={touched.confirmPassword && errors.confirmPassword}
                      icon={
                        <MaterialIcons
                          name="lock-outline"
                          size={20}
                          color="#666"
                          style={{marginRight: 5}}
                        />
                      }
                    />
                    {isError && (
                      <Text style={styles.error}>
                        {userData.error?.data.message}
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
                        <Text>Register</Text>
                      )}
                    </Button>
                  </>
                );
              }}
            </Formik>
          </View>
          <Text style={{marginTop: 20, color: '#000'}}>OR</Text>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{marginBottom: 40}}>
            <Text style={{color: '#AD40AF', height: 30, margin: 20}}>
              Already Registered? Login!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
    marginTop: 5,
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
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
});
