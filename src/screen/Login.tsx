import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-native-paper';
import {logIn} from '../features/Auth'
import { useDispatch } from 'react-redux';

import Input from '../component/Input';
import {useLoginMutation} from '../features/AuthApiSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigation:any;
};
type Login = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = (props: Props) => {
  const dispatch = useDispatch();
  const [login, {isError, isLoading, isSuccess}] = useLoginMutation();
  const userInfo = {
    email: '',
    password: '',
  };

  const [userData, setUserData] = useState<any>({});

  const handleSubmit = async (form: Login) => {
    try {
      const d = await login(form);
      setUserData(d);
      console.log(d)
    } catch (e) {
    }
  };

  useEffect(()=>{
    if(isSuccess){
      // props.navigation.navigate('Profile')
      dispatch(logIn());
    }
  }, [isSuccess])

  const loginHandler = (data: Login) => {
    handleSubmit(data);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:-100
        }}>
        <Image
          source={require('../assets/books.jpg')}
          style={{width:400, height:200}}
        />
        <Text style={styles.headerText}>WELCOME</Text>
        <View style={{width: '80%'}}>
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              loginHandler(values);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              const {email, password} = values;
              return (
                <>
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
                      style={{marginRight: 5}}/>
                    }
                  />
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
                      <Text>Login</Text>
                    )}
                  </Button>
                </>
              );
            }}
          </Formik>
        </View>
        <Text style={{marginTop: 20, color: '#000'}}>OR</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={{color: '#AD40AF', height: 30, margin: 20}}>
            New to the App? Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    margin: 20,
    color: '#20315f',
    fontWeight:'bold',
    marginVertical:50
  },
  btn: {
    backgroundColor: '#AD40AF',
    padding: 5,
    marginTop: 5,
    color: '#ffffff',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginRight: 10,
    marginBottom: 2,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
});
