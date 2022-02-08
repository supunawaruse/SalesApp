import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Card} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const ToBePaid = () => {
  return (
    <View style={{
        backgroundColor:"#FE5F55",borderRadius:10,padding:10,marginBottom:5}}>
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:0.2,borderRadius:10,padding:5,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,height:50,width:50,borderRadius:5,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesome5 name={'user-check'} size={20} color='#4F6367' />
                </View>
            </View> 
            <View style={{flex:0.8,justifyContent:'center',paddingLeft:5}}>
                <Text style={{fontWeight:'bold',color:'white',letterSpacing:1.5}}>Chaminda Gunasinghe</Text>
                        <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Sales Id: 1  Amount: 5000.00</Text>
                <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>ContactNo: 0773677871</Text>
            </View>
        </View>
    </View>
  );
};

export default ToBePaid;

const styles = StyleSheet.create({});
