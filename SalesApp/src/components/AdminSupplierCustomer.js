import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Card} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const AdminSupplierCustomer = ({type}) => {
  return (
    <View style={{
        backgroundColor:"#4F6367",height:80,borderRadius:10,padding:10,marginBottom:5}}>
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:0.15,borderRadius:10,padding:5,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,height:50,width:50,borderRadius:5,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesome5 name={type === 'admin' ? 'user-tie'  : type === 'stock' ? 'boxes' : type === 'customer' ? 'user-check' : 'user-alt' } size={20} color='#4F6367' />
                </View>
            </View> 
            <View style={{flex:0.6,justifyContent:'center',paddingLeft:5}}>
                <Text style={{fontWeight:'bold',color:'white',letterSpacing:1.5}}>Nipunika Gunasinghe</Text>
                {
                    type === 'stock' ? (
                        <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Id: 1  Stock Place:Home</Text>
                    ):(
                        <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Id: 1</Text>
                    )
                }
                <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>ContactNo: 0773677871</Text>
            </View>
            <View style={{flex:0.25,alignItems:'center',justifyContent:'center'}}>
               <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:2,backgroundColor:'#7A9E9F',borderRadius:10,marginBottom:10}}>
                   <Text style={{fontWeight:'bold',color:'white'}}>Edit</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:2,backgroundColor:'#FE5F55',borderRadius:10}}>
                   <Text style={{fontWeight:'bold',color:'white'}}>Delete</Text>
               </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

export default AdminSupplierCustomer;

const styles = StyleSheet.create({});
