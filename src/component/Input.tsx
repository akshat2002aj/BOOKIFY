import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';


const Input = (props: any) => {
  return (
    <View
      style={styles.conatiner}>
        {props.icon}
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="#696969"
        {...props}
      />
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  conatiner:{
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  input: {
    flex: 1, 
    paddingVertical: 0,
    color:'#000'
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginRight: 10,
    marginBottom: 2,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
});
