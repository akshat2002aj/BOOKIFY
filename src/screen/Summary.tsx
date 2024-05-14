import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';

import Header from '../component/Header';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import Input from '../component/Input';
const validationSchema = Yup.object({
  otp: Yup.number().required('OTP is required'),
});

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  ActivityIndicator,
  Modal,
} from 'react-native-paper';
import {
  useGetOneOrderQuery,
  useVerifyDeliveryOtpMutation,
  useVerifyReturnOtpMutation
} from '../features/TransactionApiSlice';
import { useProfileQuery } from '../features/AuthApiSlice';
import { useCreateChatMutation } from '../features/ChatSlice';

type Props = {
  navigation: any;
  route: any;
};

const Summary = (props: Props) => {
  const [transactionId, setTransactionId] = React.useState();
  const [owner, setOwner] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState({});
  const [chatData, setChatData] = React.useState();

  const dispatch = useDispatch();
  const [
    verifyDeliveryOtp,
    {isError, isLoading: deliveryLoading, isSuccess: deliverySuccess},
  ] = useVerifyDeliveryOtpMutation();

  const [
    verifyReturnOtp,
    {isError:error, isLoading: returnLoading, isSuccess: returnSuccess},
  ] = useVerifyReturnOtpMutation();

  const [
    createChat,
    {isError:chatError, isLoading: chatLoading, isSuccess: chatSuccess},
  ] = useCreateChatMutation();

  let arg = 1;
  const {data: profile} = useProfileQuery(arg);

  React.useEffect(() => {
    if (props.route.params) {
      if (props.route.params.id) {
        setTransactionId(props.route.params.id);
      }
    }
  }, [props.route]);

  const {
    data: summary,
    isLoading,
    isSuccess,
  } = useGetOneOrderQuery(transactionId);

  React.useEffect(() => {
    console.log('summary');
    console.log(summary?.data?.book?.user , profile?.data?._id)
    if (summary?.data?.book?.user === profile?.data?._id) {
      console.log(owner);
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [summary]);

  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  };

  const handleSubmit = async (form: any) => {
    try {
      //console.log(d)
      console.log(form.otp, summary.data._id);
      let d;
      if(owner){
        d = await verifyDeliveryOtp({
          id: summary.data._id,
          data: {
            pin: +form.otp,
          },
        });
      }else{
        d = await verifyReturnOtp({
          id: summary.data._id,
          data: {
            pin: +form.otp,
          },
        });
      }

      if (d?.data?.success) {
        setVisible(false);
        //props.navigation
        props.navigation.goBack();
      }
      console.log(d);
      setData(d);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = (data: any) => {
    handleSubmit(data);
  };

  useEffect(()=>{
    if(chatSuccess && chatData){
      //console.log(chatData)
      props.navigation.navigate('Chat',{
        id: chatData?._id,
        name: chatData?.chatName
      })
      //console.log(chatData)
    }
  },[chatSuccess, chatData])

  const handleChat = async()=>{
    const chat = await createChat({
      order: summary.data._id
    });
    console.log(chat)
    setChatData(chat?.data?.data)
    //props.navigation.navigate('Chat')
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={() => {
          props.navigation.navigate('Orders');
        }}
        title="Summary"
        icon={
          <Feather name="x" color="#000" size={27} style={{marginRight: 5}} />
        }
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
                  source={{uri: summary?.data?.book?.image?.url}}
                  style={{
                    width: 150,
                    height: 150,
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
                  {summary?.data?.book?.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  Address:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {summary?.data?.user?.address}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  Order Date:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {summary?.data?.paidAt}
                </Text>
              </View>
              {summary?.data?.returnDate ? (
                <View style={styles.row}>
                  <Text
                    style={{
                      color: '#777777',
                      fontWeight: 'bold',
                      width: '25%',
                    }}>
                    Return Date:
                  </Text>
                  {new Date() > new Date(summary?.data?.returnDate) ? (
                    <Text style={{color: 'red', marginLeft: 20, width: '70%'}}>
                      {summary?.data?.returnDate}
                    </Text>
                  ) : (
                    <Text
                      style={{color: '#5fd651', marginLeft: 20, width: '70%'}}>
                      {summary?.data?.returnDate}
                    </Text>
                  )}
                </View>
              ) : null}
              <View style={styles.row}>
                <Text
                  style={{color: '#777777', fontWeight: 'bold', width: '25%'}}>
                  Message:
                </Text>
                <Text style={{color: '#777777', marginLeft: 20, width: '70%'}}>
                  {summary?.data?.message}
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
                  {
                    owner ? (
                      <>
                      {summary?.data?.returnPin
                        ? summary?.data?.returnPin
                        : 'OnDelivery'}
                      </>
                    ) :(
                      <>
                        {summary?.data?.deliveredPin}
                      </>
                    )
                  }
                </Title>
                <Caption>
                  {
                    owner ? "Return Pin" : "Delivery Pin"
                  }
                </Caption>
              </View>
              <View style={styles.infoBox}>
                <Title style={styles.title}>
                  {summary?.data?.totalPrice} Rs.
                </Title>
                <Caption>Price</Caption>
              </View>
            </View>
            
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                style={styles.btn}
                onPress={handleChat} 
                icon='chat'
                textColor='#fff'
                loading={chatLoading}>
                {chatLoading ? (
                  <>
                    <Text style={{color: '#fff'}}>Loading...</Text>
                  </>
                ) : (
                  <Text style={{color: '#fff', fontSize: 16}}>
                    Chat Now
                  </Text>
                )}
              </Button>
            </View>

            {owner && !summary?.data?.isDelivered ? (
              <Button
                style={styles.btn}
                textColor="#fff"
                onPress={() => {
                  setVisible(true);
                }}>
                <Text style={{color: '#fff'}}>Delivery Confirmation</Text>
              </Button>
            ) : (
              <>
                {summary?.data?.isDelivered && !summary?.data?.isReturned && !owner ? (
                  <Button
                    style={styles.btn}
                    textColor="#fff"
                    onPress={() => {
                      setVisible(true);
                    }}>
                    <Text style={{color: '#fff'}}>Return Confirmation</Text>
                  </Button>
                ) : null}
              </>
            )}

            {
              <View
                style={{
                  flexDirection: 'row',
                  width: '70%',
                  backgroundColor: '#5fd651',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 40,
                }}>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: 20,
                    fontWeight: '900',
                    fontSize: 16,
                  }}>
                  Order Status:
                </Text>
                <Text style={{color: '#000', marginLeft: 20, fontSize: 16}}>
                  {summary?.data?.orderStatus}
                </Text>
              </View>
            }
            <Modal
              visible={visible}
              onDismiss={hideModal}
              theme={{colors: '#fff'}}
              contentContainerStyle={containerStyle}>
              <Text style={styles.headerText}>Verify OTP</Text>
              <Formik
                initialValues={{otp: ''}}
                validationSchema={validationSchema}
                onSubmit={(values, formikActions) => {
                  loginHandler(values);
                }}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => {
                  const {otp} = values;
                  return (
                    <>
                      <Input
                        placeholder="OTP"
                        value={otp}
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        keyboardType="number-pad"
                        error={touched.otp && errors.otp}
                        icon={null}
                      />
                      {isError && (
                        <Text style={styles.error}>
                          {data?.error?.data?.message}
                        </Text>
                      )}
                      <Button
                        style={styles.btn1}
                        onPress={() => handleSubmit()}
                        loading={isLoading}
                        textColor="#fff">
                        {deliveryLoading || returnLoading ? (
                          <>
                            <Text style={{color: '#fff'}}>Loading...</Text>
                          </>
                        ) : (
                          <Text style={{color: '#fff'}}>Verify OTP</Text>
                        )}
                      </Button>
                    </>
                  );
                }}
              </Formik>
            </Modal>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Summary;

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
    marginTop: 20,
    fontSize: 50,
    width: '90%',
  },
  btn1: {
    backgroundColor: '#AD40AF',
    padding: 5,
    marginTop: 20,
    marginHorizontal: 'auto',
    fontSize: 50,
    width: '70%',
    textAlign: 'center',
    color: '#fff',
  },
  headerText: {
    fontSize: 20,
    color: '#20315f',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginRight: 10,
    marginBottom: 2,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
});
