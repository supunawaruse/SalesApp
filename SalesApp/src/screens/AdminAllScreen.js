import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import AdminSupplierCustomer from '../components/AdminSupplierCustomer';

const AdminAllScreen = () => {
  return (
    <View style={{flex:1,padding:10,paddingTop:20}}>
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Admins</Text>
      <Divider style={{marginLeft:10,height:3,width:70,marginBottom:20}} />
      <ScrollView>
        <AdminSupplierCustomer type={'admin'}/>
        <AdminSupplierCustomer type={'admin'}/>
        <AdminSupplierCustomer type={'admin'}/>
        <AdminSupplierCustomer type={'admin'}/>
        <AdminSupplierCustomer type={'admin'}/>
        <AdminSupplierCustomer type={'admin'}/>
        <AdminSupplierCustomer type={'admin'}/>
        
      </ScrollView>
    
    </View>
  );
};

export default AdminAllScreen;

const styles = StyleSheet.create({});
