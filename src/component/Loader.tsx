import { View, Text } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const Loader = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator animating={true} size={100} color="#AD40AF" />
    </View>
  );
};

export default Loader;