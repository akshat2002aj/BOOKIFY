import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../component/Header';

type Props = {
  navigation:any;
};

const Support = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <Header navigation={props.navigation} icon="" handleClick={() => ()=>props.navigation.navigate("")} title={'Support'} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -100,
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#000', fontSize: 24}}>Coming Soon...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({});
