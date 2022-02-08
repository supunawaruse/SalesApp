import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import AdminSupplierCustomer from '../components/AdminSupplierCustomer';


const CustomerAllScreen = () => {
  return (
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Customers</Text>
    <Divider style={{marginLeft:10,height:3,width:90,marginBottom:20}} />
    <ScrollView>
      <AdminSupplierCustomer type={'customer'} />
      <AdminSupplierCustomer type={'customer'} />
      <AdminSupplierCustomer type={'customer'} />
      <AdminSupplierCustomer type={'customer'} />
      <AdminSupplierCustomer type={'customer'} />
      <AdminSupplierCustomer type={'customer'} />
      <AdminSupplierCustomer type={'customer'} />
    </ScrollView>
  
  </View>
  );
};

export default CustomerAllScreen;

const styles = StyleSheet.create({});
