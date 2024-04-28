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
  import List from '../component/List';
  import {ActivityIndicator} from 'react-native-paper';
  import SearchBar from '../component/SearchBar';
  
  type Props = {
    navigation: any;
    books:any;
    isSuccess:any;
    isLoading:any;
    title:any;
    icon:any;
    navigate:any;
  };
  
  const ListViewScreen = (props: Props) => {
    const [bookData, setBookData] = useState<any>([]);
  
    useEffect(() => {
      if (props.isSuccess) {
        console.log(1)
        setBookData(props.books);
      }
    }, [props.isSuccess, props.books]);
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
        <Header
          navigation={props.navigation}
          icon={props.icon}
          handleClick={()=>props.navigation.navigate(props.navigate)}
          title={props.title}
        />
        <SearchBar books={props.books} setBookData={setBookData} />
        <ScrollView>
          <View style={{marginTop: 30, alignSelf: 'center', zIndex: 2}}>
            <Image
              source={require('../assets/banner.jpg')}
              style={{width: 350, height: 220}}
            />
          </View>
          <View style={{flex: 1}}>
            {props.isLoading ? (
              <ActivityIndicator
                animating={true}
                size={50}
                color="#AD40AF"
                style={{marginTop: 30}}
              />
            ) : (
              <List navigation={props.navigation} books={bookData} key={1}/>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ListViewScreen;
  
  const styles = StyleSheet.create({});
  