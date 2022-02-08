import { StyleSheet, Text, View,ScrollView,TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import SalePurchase from '../components/SalePurchase';
import ToBePaid from '../components/ToBePaid';

const DashboardScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Daily Sales</Text>
    <Divider style={{marginLeft:10,height:3,width:95,marginBottom:15}} />
      <SalePurchase type={'sale'} />
      <SalePurchase type={'sale'}/>

      <Text style={{marginLeft:10,marginTop:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>ToBePaid List</Text>
      <Divider style={{marginLeft:10,height:3,width:115,marginBottom:15}} />
      <ToBePaid />
      <ToBePaid />

  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  );
};

export default DashboardScreen;
