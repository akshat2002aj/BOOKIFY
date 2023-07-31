import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigation: any;
  icon: any;
  title: any;
  handleClick: any;
};

const Header = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <MaterialIcons
          name="density-medium"
          color="#000"
          size={25}
          style={{marginRight: 20}}
          onPress={() => props.navigation.openDrawer()}
        />
        {props.title.length > 0 && (
          <Text style={{fontSize: 20, color: '#000', fontWeight: '600'}}>
            {props.title}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.handleClick()}>
        {props.icon}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
