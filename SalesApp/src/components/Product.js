import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Product = ({type, deleteModalCallBack,editModalCallBack,data,selectItemCallBack}) => {

    
    const onDelete = () =>{
        deleteModalCallBack(true);
        selectItemCallBack(data);
    }

    const onEdit = () =>{
        editModalCallBack(true);
        selectItemCallBack(data);
    }
   
  return (
    <View style={{
        backgroundColor:"#4F6367",borderRadius:10,padding:10,marginBottom:5}}>
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:0.15,borderRadius:10,padding:5,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,height:50,width:50,borderRadius:5,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <FontAwesome5 name={'store'} size={20} color='#4F6367' />
                </View>
            </View> 
            <View style={{flex:0.6,justifyContent:'center',paddingLeft:5}}>
                <Text style={{fontWeight:'bold',color:'white',letterSpacing:1.5}}>{data.name}</Text>
                <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Id: {data.id}  Category: {data.category}</Text>
                <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Buying Price: {data.buyingPrice}</Text>
            </View>
            <View style={{flex:0.25,alignItems:'center',justifyContent:'center'}}>
               <TouchableOpacity onPress={onEdit} style={{paddingHorizontal:20,paddingVertical:2,backgroundColor:'#7A9E9F',borderRadius:10,marginBottom:10}}>
                   <Text style={{fontWeight:'bold',color:'white'}}>Edit</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={onDelete} style={{paddingHorizontal:20,paddingVertical:2,backgroundColor:'#FE5F55',borderRadius:10}}>
               <MaterialCommunityIcons name='delete' color={'white'} size={20} />
               </TouchableOpacity>
            </View>
        </View>
        <View style={{flex:1,marginTop:5,paddingHorizontal:10}}> 
            <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13,fontWeight:'bold'}}>Stocks:</Text>
            <View style={{paddingHorizontal:10}}>
                {
                    data.stock.length > 0 ? data.stock.map((item) => (
                        <Text key={item.id} style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>Place: {item.stockPlace}   Quantity: {item.stockQuantity}</Text>
                    )):(
                        <Text style={{color:'#D1D1D1',letterSpacing:1.5,fontSize:13}}>No Stock Available</Text>
                    )
                }
            </View>
        </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
