import { StyleSheet, Text, View,TextInput} from 'react-native';
import React from 'react';

const InputField = ({label,placeholder}) => {
  return (
    <View style={{paddingHorizontal:10,marginBottom:15,
       }}>
       <Text style={{marginBottom:15}}>{label}: </Text>
       <View style={{paddingHorizontal:10}}>
        <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#E7E7E7'}
        style={{
        backgroundColor:'#7A9E9F',
        color:'white',
        borderRadius:15,
        height:40,
        paddingLeft:20,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation:8,
        }} />
       </View>
    </View>
    
  );
};

export default InputField;

const styles = StyleSheet.create({});
