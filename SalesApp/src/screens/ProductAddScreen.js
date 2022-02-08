import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,ImageBackground} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import InputField from '../components/InputField';
import Button from '../components/Button';


const ProductAddScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     
    <SafeAreaView style={{flex:1,padding:10,paddingTop:20,paddingBottom:20}}>
      <ImageBackground source={require('../../assets/images/logo.png')} style={{width:220,height:220,opacity:0.2,position:'absolute',bottom:-30,right:-50}} />
      <ScrollView>  
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Product Details</Text>
      <Divider style={{marginLeft:10,height:3,width:140,marginBottom:20}} />
       
          <InputField label={'Name'} placeholder={'Enter Name'} />
          <InputField label={'Category'} placeholder={'Enter Category'}/>
          <InputField label={'Buying Price'} placeholder={'Enter Buying Price'}/>
          <Button buttonText={'Add Product'} />
      
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ProductAddScreen;

const styles = StyleSheet.create({});
