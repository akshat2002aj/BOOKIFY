import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import Header from '../component/Header';
  import {DataTable} from 'react-native-paper';
  import {useGetLandedOrderQuery} from '../features/TransactionApiSlice';
  import Card from '../component/Card';
  
  type Props = {
    navigation: any;
  };
  
  const Landed = (props: Props) => {
    let arg = 1;
    const {data, isLoading, isSuccess, error} = useGetLandedOrderQuery(arg);
    console.log(data?.data);
    console.log(error);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
        <Header
          navigation={props.navigation}
          icon=""
          handleClick={() => () => props.navigation.navigate('')}
          title={'My Orders'}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: -100,
          }}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                size={50}
                color="#AD40AF"
                style={{marginTop: 30}}
              />
            ) : (
              <>
                {data?.data.length > 0 ? (
                  data?.data.map((item: any) => {
                    return (
                      <Card
                        name={item.book.name}
                        image={item.book.image?.url}
                        onPress={() => {
                          props.navigation.navigate('Summary',{
                            id: item._id
                          })
                        }}
                        orderDate={item.createdAt}
                        returnDate={null}
                        pin={item.isDelivered ? item.returnPin : null}
                        bookOwner={true}
                      />
                    );
                  })
                ) : (
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 18,
                      alignSelf: 'center',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}>
                    No Order Found.
                  </Text>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Landed;
  
  const styles = StyleSheet.create({});
  