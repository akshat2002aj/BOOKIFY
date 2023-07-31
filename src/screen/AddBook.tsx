import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '../component/Header'

import Feather from 'react-native-vector-icons/Feather';

type Props = {
    navigation:any;
}

const AddBook = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={() => {
          props.navigation.goBack();
        }}
        title="Add Book"
        icon={
          <Feather
          name="x"
          color="#000"
          size={27}
          style={{marginRight: 5}}
        />
        }
      />
      <ScrollView style={{marginTop: 50}}>
        
      </ScrollView>
      </SafeAreaView>
  )
}

export default AddBook

const styles = StyleSheet.create({})