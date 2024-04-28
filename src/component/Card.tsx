import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';

type Props = {
  returnDate: any;
  name: any;
  pin: any;
  image: any;
  onPress: any;
  orderDate: any;
  bookOwner: any;
  key: any;
};

export default function Card(props: Props) {
  console.log('Hii', props.pin);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }} key={props.key}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={{uri: props.image ? props.image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.angelbookhouse.com%2Fproduct%2Ffocus-on-grammar-cocmposition-series&psig=AOvVaw1BjZF5pX08P-jISVbA_L9k&ust=1714363076037000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPDx66KC5IUDFQAAAAAdAAAAABAE"}}
          style={{width: 75, height: 75, borderRadius: 10, marginRight: 8}}
        />
        <View style={{width: windowWidth - 220}}>
          <Title
            numberOfLines={1}
            style={{
              color: '#333',
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
              textTransform: 'uppercase',
            }}>
            {props.name}
          </Title>
          {props.returnDate ? (
            <>
              <Caption
                style={{
                  color: '#ddd',
                  fontSize: 14,
                  fontWeight: '600',
                  marginVertical: -5,
                }}>
                Return By:{' '}
                {`${new Date(props.returnDate).getDate()}/${new Date(
                  props.returnDate,
                ).getMonth()}/${new Date(props.returnDate).getFullYear()}`}
              </Caption>
            </>
          ) : (
            <>
              {props.bookOwner ? (
                <Caption
                  style={{
                    color: '#ddd',
                    fontSize: 14,
                    fontWeight: '600',
                    marginVertical: -5,
                  }}>
                  Ordered At:{' '}
                  {`${new Date(props.orderDate).getDate()}/${new Date(
                    props.orderDate,
                  ).getMonth()}/${new Date(props.orderDate).getFullYear()}`}
                </Caption>
              ) : (
                <Caption
                  style={{
                    color: '#ddd',
                    fontSize: 14,
                    fontWeight: '600',
                    marginVertical: -5,
                  }}>
                  Deliver Pin: {props.pin}
                </Caption>
              )}
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: '#AD40AF',
          padding: 10,
          width: 90,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
          }}>
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
}
