import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';

import {useGetBookByIdQuery} from '../features/BookSlice';
import CheckoutSteps from '../component/CheckoutSteps';
import {
  useCreateOrderMutation,
  useCreateTransactionMutation,
} from '../features/TransactionApiSlice';

type Props = {
  navigation: any;
  route: any;
};

const Checkout = (props: Props) => {
  const [bookId, setBookId] = React.useState();
  const [payment, setPayment] = React.useState(0);
  const [transactionId, setTransactionId] = React.useState(null);
  const [
    createOrder,
    {data: order, isLoading: orderLoading, isSuccess: orderSuccess},
  ] = useCreateOrderMutation();
  const [
    createTransaction,
    {
      data: transaction,
      isLoading: transactionLoading,
      isSuccess: transactionSuccess,
    },
  ] = useCreateTransactionMutation();

  React.useEffect(() => {
    if (props.route.params) {
      if (props.route.params.id) {
        setBookId(props.route.params.id);
      }
      if (props.route.params.payment) {
        setPayment(props.route.params.payment);
      }
    }
  }, [props.route]);

  const arg = 1;
  const {data} = useGetBookByIdQuery(bookId);
  // console.log(data);

  useEffect(() => {
    if (orderSuccess) {
      openRazorpay();
    }
  }, [orderSuccess]);

  const openRazorpay = () => {
    var options = {
      order_id: order?.data?.id, //Replace this with an order_id created using Orders API.
      description: 'Credits for buying book',
      image: '../assets/item.jpg',
      currency: 'INR',
      key: 'rzp_test_svMY6lEjhW6IIV',
      amount: data?.data?.price,
      name: 'BOOKIFY',
      theme: {color: '#AD40AF'},
    };
    const pay = RazorpayCheckout.open(options)
      .then(async (data: any) => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        // props.navigation.navigate('Checkout', {
        //   id: bookId,
        //   payment: 1,
        // });
        console.log(12345678);
        const d: any = await createTransaction({
          book: bookId,
          paymentId: data.razorpay_payment_id,
          totalPrice: data?.data?.price,
          returnDate: Date.now(),
        });
        console.log(d)
        props.navigation.navigate('Summary', {
          id: d.data.data._id,
        });
      })
      .catch(async (error: any) => {
        props.navigation.navigate('Checkout', {
          id: bookId,
          payment: 1,
        });
      });

    // pay.then;s
  };

  const handlePayment = async () => {
    console.log(data?.data?.price * 100);
    const res = await createOrder({
      amount: data?.data?.price * 100,
      id: bookId
    });
    console.log(res);
  };
  return (
    <>
      {transactionLoading ? (
        <ActivityIndicator
          animating={true}
          size={50}
          color="#AD40AF"
          style={{marginTop: 50}}
        />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <CheckoutSteps active={payment} />
            <View
              style={{alignSelf: 'center', marginBottom: 35, marginTop: 80}}>
              <ImageBackground
                source={{uri: data?.data?.image?.url}}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 20,
                  marginVertical: 0,
                }}
              />
            </View>
            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Text
                  style={{
                    color: '#777777',
                    marginLeft: 20,
                    fontWeight: '900',
                    width: '30%',
                  }}>
                  Name:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '40%'}}>
                  {data?.data?.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{
                    color: '#777777',
                    marginLeft: 20,
                    fontWeight: '900',
                    width: '30%',
                  }}>
                  Author:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '40%'}}>
                  {data?.data?.author}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{
                    color: '#777777',
                    marginLeft: 20,
                    fontWeight: '900',
                    width: '30%',
                  }}>
                  Price:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '40%'}}>
                  {data?.data?.price}
                </Text>
              </View>
            </View>
            {/* <View style={{justifyContent: 'center', alignItems: 'center'}}> */}
            {payment ? null : (
              <Button
                style={styles.btn}
                onPress={() => {
                  handlePayment();
                }}
                textColor="#fff"
                loading={orderLoading}>
                {orderLoading ? (
                  <>
                    <Text style={{color: '#fff'}}>Loading...</Text>
                  </>
                ) : (
                  <Text style={{color: '#fff', fontSize: 16}}>
                    Pay {data?.data?.price}Rs
                  </Text>
                )}
              </Button>
            )}
            {/* </View> */}
            {payment ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '70%',
                  backgroundColor: '#fa0f0f',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 100,
                }}>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 20,
                    fontWeight: '900',
                    fontSize: 16,
                  }}>
                  Payment Status:
                </Text>
                <Text style={{color: '#000', marginLeft: 20, fontSize: 16}}>
                  {payment ? 'Not Done' : ''}
                </Text>
              </View>
            ) : null}
          </View>
        </>
      )}
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
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
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  btn: {
    backgroundColor: '#AD40AF',
    padding: 5,
    fontSize: 30,
    width: '50%',
    marginTop: 20,
  },
});
