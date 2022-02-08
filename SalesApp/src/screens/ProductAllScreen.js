import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import Product from '../components/Product';


const ProductAllScreen = () => {
  return (
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Products</Text>
    <Divider style={{marginLeft:10,height:3,width:70,marginBottom:20}} />
    <ScrollView>
      <Product />
      
    </ScrollView>
  
  </View>
  );
};

export default ProductAllScreen;

const styles = StyleSheet.create({});
