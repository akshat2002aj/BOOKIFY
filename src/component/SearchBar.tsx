import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    setBookData:any;
    books:any
}

const SearchBar = (props: Props) => {
    const handleChange = (text:string)=>{
        if(text){
          const newData = props.books.data.filter(
            function (item:any) {
              const itemData = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          props.setBookData({
            count:newData.length,
            data:newData,
          })
        }else{
          props.setBookData(props.books)
        }
      }

  return (
    <View
    style={{
      flexDirection: 'row',
      borderColor: '#C6C6C6',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 2,
      alignItems: 'center',
      marginTop: 20,
    }}>
    <MaterialIcons
      name="search"
      size={25}
      color="#C6C6C6"
      style={{marginRight: 5}}
      />
    <TextInput
      placeholder="Search"
      style={{color: '#C6C6C6', fontSize: 18, width: '100%'}}
      placeholderTextColor="#C6C6C6"
      // value={searchText}
      onChangeText={(text)=>{handleChange(text)}}
      />
  </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})