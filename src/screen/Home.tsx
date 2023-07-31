import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../component/Header';
import {useProfileQuery} from '../features/AuthApiSlice';
import List from '../component/List';
import {useGetBooksWithInRadiusQuery} from '../features/BookSlice';
import {ActivityIndicator} from 'react-native-paper';
import SearchBar from '../component/SearchBar';
import ListViewScreen from '../component/ListViewScreen';

type Props = {
  navigation: any;
};

const Home = (props: Props) => {
  const [bookData, setBookData] = useState<any>([]);
  const arg = 1;
  const {data: profile, isSuccess:success } = useProfileQuery(arg);

  const {data: books, isLoading, isSuccess} = useGetBooksWithInRadiusQuery(arg);

  useEffect(() => {
    if (isSuccess) {
      setBookData(books);
    }
  }, [isSuccess]);

  return (
    <ListViewScreen title={`Hello, ${profile.data.name}`} isLoading={isLoading} isSuccess={isSuccess}  books={books} navigation={props.navigation} icon={  <ImageBackground
      source={profile.data.avatar.url ? {uri: profile.data.avatar.url} : require('../assets/avatar.png')}
      style={{width: 35, height: 35}}
      imageStyle={{borderRadius: 25}}
    />} navigate="Profile"/>
  );
};

export default Home;

const styles = StyleSheet.create({});