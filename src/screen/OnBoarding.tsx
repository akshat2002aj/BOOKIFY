import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useProfileQuery} from '../features/AuthApiSlice';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';

type Props = {
  navigation: any;
};

const OnBoarding = (props: Props) => {
  const aksht = 1;
  const {
    data: profile,
    isSuccess,
    isFetching,
    isLoading,
    refetch,
  } = useProfileQuery(aksht);
  
  const isLogedin = useSelector((state: any) => state.Auth.isLoggedIn);
  
  useEffect(()=>{
    console.log(profile, isLoading)
    console.log(isLogedin);
  },[isLoading])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 60}}>
        <Text style={styles.headerText}>BOOKIFY</Text>
      </View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/online.jpg')}></Image>
      </View>
      <TouchableOpacity
        style={!isLoading ? styles.btn : styles.loading}
        disabled={isLoading}
        onPress={() => {
          isLogedin
            ? props.navigation.navigate('Home')
            : props.navigation.navigate('Login');
        }}>
        {!isLoading ? (
          <>
            <Text style={styles.text}>Let's Begin</Text>
            <MaterialIcon name="arrow-forward-ios" size={22} color="#fff" />
          </>
        ) : (
          <>
          <ActivityIndicator animating={true} style={{marginRight: 20}} size={25} color="#FFF" />
          <Text style={styles.text}>Loading...</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#20315f',
  },
  btn: {
    backgroundColor: '#AD40AF',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    marginBottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loading: {
    backgroundColor: '#AD40AF',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    marginBottom: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 500,
    height: 300,
    // transform: [{rotate: '-15deg'}]
  },
});
