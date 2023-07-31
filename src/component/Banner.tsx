import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
type Props = {
    data: any;
}

export default function BannerSlider(props:Props) {
  return (
    <View>
      <ImageBackground
        source={props.data}
        
        style={{height: 180, width: 320, borderRadius: 10}}
      />
    </View>
  );
}