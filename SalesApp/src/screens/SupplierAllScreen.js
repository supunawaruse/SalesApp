import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import AdminSupplierCustomer from '../components/AdminSupplierCustomer';

const SupplierAllScreen = () => {
  return (
    <View style={{flex:1,padding:10,paddingTop:20}}>
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Suppliers</Text>
      <Divider style={{marginLeft:10,height:3,width:80,marginBottom:20}} />
      <ScrollView>
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
        <AdminSupplierCustomer />
      </ScrollView>
    
    </View>
  );
};

export default SupplierAllScreen;

const styles = StyleSheet.create({});
