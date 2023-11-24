import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CheckoutSteps = (props:any) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', gap: 25}}>
      <Text style={props.active === 0 ? styles.inActiveBtn : styles.activeBtn}>1</Text>
      <Text style={props.active === 0 ? styles.inActiveLine : styles.activeLine}></Text>
      <Text style={props.active === 0 ? styles.inActiveBtn : styles.activeBtn}>2</Text>
    </View>
  );
};

export default CheckoutSteps;

const styles = StyleSheet.create({
  inActiveBtn: {
    color: '#000',
    paddingHorizontal: 18,
    borderRadius: 50,
    paddingVertical: 10,
    backgroundColor: '#eacceb',
    fontSize: 18,
  },
  inActiveLine: {
    borderBottomWidth: 4,
    width: 70,
    height: 0,
    padding: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#eacceb',
  },
  activeBtn: {
    color: '#000',
    paddingHorizontal: 18,
    borderRadius: 50,
    paddingVertical: 10,
    backgroundColor: '#AD40AF',
    fontSize: 18,
    // color: '#fff',
  },
  activeLine: {
    borderBottomWidth: 4,
    width: 70,
    height: 0,
    padding: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#AD40AF',
    borderBottomColor: '#AD40AF',
  },
});
