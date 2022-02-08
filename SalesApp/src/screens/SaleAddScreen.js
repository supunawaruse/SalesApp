import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,ImageBackground,TextInput} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper'
import InputField from '../components/InputField';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SaleAddScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     
    <SafeAreaView style={{flex:1,padding:10,paddingTop:20,paddingBottom:20}}>
      <ImageBackground source={require('../../assets/images/logo.png')} style={{width:220,height:220,opacity:0.2,position:'absolute',bottom:-30,right:-50}} />
      <ScrollView>  
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Sale Details</Text>
      <Divider style={{marginLeft:10,height:3,width:110,marginBottom:20}} />
       
          <InputField label={'Customer'} placeholder={'Select Customer'} />
          <InputField label={'Date'} placeholder={'Enter Sales Date'}/>

          <View style={{marginTop:8,paddingHorizontal:5,marginBottom:10}}>
          <Text style={{marginBottom:8}}>Products:</Text>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:5,marginBottom:5,borderRadius:10}}>
              <View style={{flex:0.5,alignItems:'center'}}>
              <Text>Product Name</Text>
              </View>
              <View style={{flex:0.3,alignItems:'center'}}>
              <Text>Qty</Text>
              </View>
          </View>
          <View style={{flex:1,flexDirection:'row',marginBottom:5,borderRadius:10}}>
              <View style={{flex:0.45,alignItems:'center',justifyContent:'center'}}>
                <TextInput
                placeholder='Select Product'
                placeholderTextColor='white' 
                style={{backgroundColor:'#7A9E9F',borderRadius:10,height:25,padding:0,paddingHorizontal:20,color:'white'}} />
              </View>
              <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
              <TextInput
                placeholder='Qty'
                placeholderTextColor='white' 
                style={{backgroundColor:'#7A9E9F',borderRadius:10,height:25,padding:0,paddingHorizontal:20,color:'white'}} />
              </View>
              <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={{backgroundColor:'#4F6367',borderRadius:10,padding:5,paddingHorizontal:20}}><Text style={{color:'white',fontWeight:'bold'}}>Add</Text></TouchableOpacity>
              </View>
          </View>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:10}}>
              <View style={{flex:0.5,alignItems:'center'}}>
              <Text>Blue-Flex Face Mask</Text>
              </View>
              <View style={{flex:0.2,alignItems:'center'}}>
              <Text>250</Text>
              </View>
              <View style={{flex:0.3,alignItems:'center'}}>
              <Text>25000.00</Text>
              </View>
          </View>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:10}}>
              <View style={{flex:0.5,alignItems:'center'}}>
              <Text>Blue-Flex Face Mask</Text>
              </View>
              <View style={{flex:0.2,alignItems:'center'}}>
              <Text>250</Text>
              </View>
              <View style={{flex:0.3,alignItems:'center'}}>
              <Text>25000.00</Text>
              </View>
          </View>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:10}}>
              <View style={{flex:0.5,alignItems:'center'}}>
              <Text>Blue-Flex Face Mask</Text>
              </View>
              <View style={{flex:0.2,alignItems:'center'}}>
              <Text>250</Text>
              </View>
              <View style={{flex:0.3,alignItems:'center'}}>
              <Text>25000.00</Text>
              </View>
          </View>
        </View>

          <InputField label={'Toal'} placeholder={'LKR. 0.00 '} />
          <InputField label={'ToBePaid'} placeholder={'LKR. 0.00'}/>
          <Button buttonText={'Add Sale'} />
      
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SaleAddScreen;

const styles = StyleSheet.create({});
