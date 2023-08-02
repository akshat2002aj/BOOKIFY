import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetMyBooksQuery} from '../features/BookSlice';
import SearchBar from '../component/SearchBar';
import List from '../component/List';
import {ActivityIndicator} from 'react-native-paper'
import ListViewScreen from '../component/ListViewScreen';

type Props = {
  navigation:any;
}

const MyBooks = (props: Props) => {
  const arg = 1;
  const {data: books, isLoading, isSuccess,refetch} = useGetMyBooksQuery(arg);

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