import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';

import Header from '../component/Header';
import Feather from 'react-native-vector-icons/Feather';

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';
import {useGetOneOrderQuery} from '../features/TransactionApiSlice';

type Props = {
  navigation: any;
  route: any;
};

const Summary = (props: Props) => {
  const [transactionId, setTransactionId] = React.useState();

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header
        navigation={props.navigation}
        handleClick={() => {
          props.navigation.navigate('Payments');
        }}
        title=""
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
                  {summary?.data?.deliveredPin}
                </Title>
                <Caption>Delivery Pin</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title style={styles.title}>
                  {summary?.data?.totalPrice} Rs.
                </Title>
                <Caption>Price</Caption>
              </View>
            </View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  width: '70%',
                  backgroundColor: '#5fd651',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 80,
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
    marginTop: 45,
    fontSize: 30,
    width: '90%',
  },
});
