import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';

const Button = ({buttonText,onPress}) => {
  return (
    <View style={{flex:1,alignItems:'center',marginTop:10}}>
    <TouchableOpacity onPress={onPress} style={{backgroundColor:'#4F6367',padding:10,borderRadius:20,alignItems:'center',paddingHorizontal:40}}>
      <Text style={{color:'white',fontWeight:'bold'}}>{buttonText}</Text>
    </TouchableOpacity>
    </View>
    
  );
};

export default Button;

const styles = StyleSheet.create({});
