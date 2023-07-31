import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigation: any;
};

const OnBoarding = (props: Props) => {
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
        style={styles.btn}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.text}>Let's Begin</Text>
        <MaterialIcon name="arrow-forward-ios" size={22} color="#fff" />
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
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image:{
    width:500,
    height:300,
    // transform: [{rotate: '-15deg'}]
  }
});
