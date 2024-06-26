import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';

import Header from '../component/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {Avatar, Button} from 'react-native-paper';

import {useGetBookByIdQuery, useDeleteBookMutation} from '../features/BookSlice';
import {useProfileQuery} from '../features/AuthApiSlice';

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';
import Router from '../Router';
import { useCreateTransactionMutation } from '../features/TransactionApiSlice';

type Props = {
  navigation: any;
  route: any;
};

const BookDetail = (props: Props) => {
  const [bookId, setBookId] = React.useState();
  const [book, setBook] = React.useState<any>();
  const [editable, setEditable] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.route.params) {
      if (props.route.params.id) {
        setBookId(props.route.params.id);
      }
    }
  }, [props.route]);

  const arg = 1;
  const {data, isLoading, isSuccess} = useGetBookByIdQuery(bookId);
  const {data: profile} = useProfileQuery(arg);
  const [deleteBook, {data:delBook, isLoading:loading, isSuccess:success}] = useDeleteBookMutation();
  const [createTransaction, {data:order, isLoading:orderLoading, isSuccess:orderSuccess}] = useCreateTransactionMutation();

  React.useEffect(() => {
    if (isSuccess) {
      setBook(data.data);
      if (data?.data?.user === profile.data._id) {
        setEditable(true);
      }
    }
  }, [isSuccess]);

  React.useEffect(()=>{
    if(success){
      props.navigation.navigate("My Books");
    }
  },[success])

  const handleDelete = async(bookId:any) => {
    try {
      const res = await deleteBook(bookId);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  // const handleBorrowBook = async(bookId:any)=>{
  //   const res = await createTransaction({
  //     user: profile.data._id,
  //     books: bookId,
  //     paymentInfo: {},
  //     itemPrice: book?.price,

  //   })
  // }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={() => {
          props.navigation.navigate('EditProfile');
        }}
        title=""
        icon={
          editable ? (
            <Feather
              name="edit"
              color="#000"
              size={24}
              style={{marginRight: 5}}
            />
          ) : (
            ''
          )
        }
      />
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            size={50}
            color="#AD40AF"
            style={{marginTop: 50}}
          />
        ) : (
          <>
            <View style={styles.userInfoSection}>
              <View style={{alignSelf: 'center', marginBottom: 35}}>
                <ImageBackground
                  source={{uri: book?.image?.url ? book?.image?.url : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.angelbookhouse.com%2Fproduct%2Ffocus-on-grammar-cocmposition-series&psig=AOvVaw1BjZF5pX08P-jISVbA_L9k&ust=1714363076037000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPDx66KC5IUDFQAAAAAdAAAAABAE"}}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 20,
                    marginVertical: 0,
                  }}
                />
              </View>
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  Name:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {book?.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  Author:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {book?.author}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  ISBN:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {book?.isbn}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  Description:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {book?.description}
                </Text>
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                  },
                ]}>
                <Title style={styles.title}>
                  {book?.availability ? (
                    <Text style={{color: 'green'}}>Available</Text>
                  ) : (
                    <Text style={{color: 'red'}}>Out of Stock</Text>
                  )}
                </Title>
                <Caption>Availability</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title style={styles.title}>{book?.price} Rs.</Title>
                <Caption>Price</Caption>
              </View>
            </View>
            {editable ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                style={styles.btn}
                onPress={() => handleDelete(book?._id)} 
                icon='delete'
                textColor='#fff'
                loading={loading}>
                {loading ? (
                  <>
                    <Text style={{color: '#fff'}}>Loading...</Text>
                  </>
                ) : (
                  <Text style={{color: '#fff', fontSize: 16}}>
                    Delete
                  </Text>
                )}
              </Button>
            </View>
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  style={styles.btn}
                  onPress={() => props.navigation.navigate('Checkout',{
                    id: book._id
                  })}
                  disabled = {!book?.availability}
                  // onPress={()=>{
                  //   handleBorrowBook(book._id)
                  // }}
                  loading={isLoading} textColor='#fff'>
                  {isLoading ? (
                    <>
                      <Text style={{color: '#fff'}}>Loading...</Text>
                    </>
                  ) : (
                    <Text style={{color: '#fff', fontSize: 16}}>
                      Borrow Now
                    </Text>
                  )}
                </Button>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    // alignItems:'center',
    marginTop: 70,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 12,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#AD40AF',
    padding: 5,
    marginTop: 45,
    fontSize: 30,
    width: '90%',
  },
});
