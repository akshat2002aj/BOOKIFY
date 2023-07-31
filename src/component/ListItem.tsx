import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {
    Avatar,
    Title,
    Caption,
    TouchableRipple
  } from 'react-native-paper';

type Props = {
    image: string;
    name: string;
    author:string;
    isAvailable: boolean;
    price: boolean;
    id: any;
    onPress:any
}

export default function ListItem(props:Props) {
  return (
    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={{uri:props.image}}
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
          <Caption
            style={{
              color: '#ddd',
              fontSize: 14,
              fontWeight:'600'
            }}>
            By: {props.author}
          </Caption>
        </View>
      </View>

      <TouchableOpacity onPress={props.onPress} style={{
        backgroundColor:'#AD40AF',
        padding:10,
        width: 90,
        borderRadius: 10,
      }}>
        <Text style={{
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