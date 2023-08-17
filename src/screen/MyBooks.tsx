import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetMyBooksQuery} from '../features/BookSlice';
import SearchBar from '../component/SearchBar';
import List from '../component/List';
import {ActivityIndicator} from 'react-native-paper'
import ListViewScreen from '../component/ListViewScreen';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  navigation:any;
  route:any;
}

const MyBooks = (props: Props) => {
  // const [books, setBooks] = React.useState({});
  const arg = 1;
  const {data:books, isLoading, isSuccess,refetch} = useGetMyBooksQuery(arg);
  const isFocused = useIsFocused();

  React.useEffect(()=>{
    if(isFocused){
      refetch();
    }
  },[isFocused])

  // React.useEffect(()=>{
  //   if(isSuccess){
  //     setBooks(data)
  //   }
  // },[isSuccess])

  return (
    <ListViewScreen title={"My Books"} isLoading={isLoading} isSuccess={isSuccess} books={books} navigation={props.navigation} icon={          <MaterialIcons
      name="add-circle-outline"
      color="#000"
      size={27}
      style={{marginRight: 5}}
    />} navigate="AddBook"/>
  )
}

export default MyBooks

const styles = StyleSheet.create({})