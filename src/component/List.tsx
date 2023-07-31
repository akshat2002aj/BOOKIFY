import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListItem from './ListItem';

type Props = {
    navigation:any;
    books:any
}

const List = (props: Props) => {

  return (
    <View style={{marginTop:40, width:350, justifyContent:'center'}}>
        {props.books?.count !== 0 ? props.books?.data?.map((book:any, index:any)=>{
        return <ListItem key={book._id} name={book.name} author={book.author} image={book.image.url} id={book._id} isAvailable={book.availability} price={book.price}               onPress={() =>
            props.navigation.navigate('BookDetails', {
              title: book.name,
              id: book._id,
            })
          }/>
        }) :
        <Text style={{color:'red', textAlign:'center', fontWeight:'600', fontSize:18, alignSelf:'center' }}>No Books Found.</Text>
        }
    </View>
  )
}

export default List

const styles = StyleSheet.create({})