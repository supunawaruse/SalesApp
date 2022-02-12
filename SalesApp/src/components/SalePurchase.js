import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Card} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


const SalePurchase = ({type,data}) => {
  return (
    <View style={{
        backgroundColor:"#4F6367",borderRadius:10,padding:10,marginBottom:10}}>
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:0.2,borderRadius:10,padding:5,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,height:50,width:50,borderRadius:5,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesome5 name={type === 'sale' ? 'money-check' : 'shopping-cart'} size={20} color='#4F6367' />
                </View>
            </View> 
            <View style={{flex:0.8,justifyContent:'center',paddingLeft:5}}>
                <Text style={{fontWeight:'bold',color:'white',letterSpacing:1.5,marginBottom:5}}>Supplier: {data.supplier.name} </Text>
                <Text style={{fontWeight:'bold',color:'white',letterSpacing:1.5,marginBottom:5}}>Admin: {data.admin.name}</Text>
                <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Date: {data.purchaseDate.substring(0,10)}</Text>
                <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Total: {data.total}</Text>
            </View>
            
        </View>

        <View style={{marginTop:8}}>
          <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13,marginBottom:8}}>Products:</Text>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:10,marginBottom:5,backgroundColor:'white',borderRadius:10}}>
              <View style={{flex:0.5,alignItems:'center'}}>
              <Text style={{color:'#4F6367',letterSpacing:1.5,fontSize:13,fontWeight:'bold'}}>Product</Text>
              </View>
              <View style={{flex:0.2,alignItems:'center'}}>
              <Text style={{color:'#4F6367',letterSpacing:1.5,fontSize:13,fontWeight:'bold'}}>Qty</Text>
              </View>
              <View style={{flex:0.3,alignItems:'center'}}>
              <Text style={{color:'#4F6367',letterSpacing:1.5,fontSize:13,fontWeight:'bold'}}>Price</Text>
              </View>
          </View>
          {
              data.products.length > 0 ? data.products.map((item)=> (
                <View key={item.id} style={{flex:1,flexDirection:'row',paddingHorizontal:10}}>
                    <View style={{flex:0.5,alignItems:'center'}}>
                    <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>{item.name}</Text>
                    </View>
                    <View style={{flex:0.2,alignItems:'center'}}>
                    <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>{item.purchaseproduct.quantity}</Text>
                    </View>
                    <View style={{flex:0.3,alignItems:'center'}}>
                    <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>{item.purchaseproduct.quantity * item.buyingPrice}</Text>
                </View>
            </View>
              )):(
                  <Text>No Products</Text>
              )
          }
         
        </View>
        
    </View>
  );
};

export default SalePurchase;

const styles = StyleSheet.create({});
