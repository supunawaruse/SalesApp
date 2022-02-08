import { StyleSheet, Text, View,ScrollView, TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import AdminSupplierCustomer from '../components/AdminSupplierCustomer';

const StockAllScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
   
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Stocks</Text>
    <Divider style={{marginLeft:10,height:3,width:60,marginBottom:20}} />

    <View style={{marginBottom:20}}>
      <TextInput placeholder='Search by product...' style={{
        backgroundColor:'white',borderRadius:15,height:40,paddingLeft:20,color:'#4F6367',fontSize:15,
        shadowColor: '#4F6367',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation:3,
        }} />
    </View>

        <AdminSupplierCustomer type={'stock'}/>
        <AdminSupplierCustomer type={'stock'} />
        <AdminSupplierCustomer type={'stock'}/>
        <AdminSupplierCustomer type={'stock'}/>
        <AdminSupplierCustomer type={'stock'} />
        <AdminSupplierCustomer type={'stock'}/>
        <AdminSupplierCustomer type={'stock'} />
        <AdminSupplierCustomer type={'stock'}/>
        <AdminSupplierCustomer type={'stock'}/>
        <AdminSupplierCustomer type={'stock'} />
  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  );
};

export default StockAllScreen;

const styles = StyleSheet.create({});
