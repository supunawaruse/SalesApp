import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,ImageBackground} from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import InputField from '../components/InputField';
import Button from '../components/Button';
import { getAllProductsWithoutStock } from '../services/ProductsServices';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import { Select } from "native-base";

const StockAddScreen = () => {

  const isFocused = useIsFocused();
  const [addDetails,setAddDetails] = useState({product_id:'',stockQuantity:''})
  const [productList,setProductList] = useState([])
  const [btnDisable,setBtnDisable] = useState(true)

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAllProducts()
    }
    return () => mounted = false;
  },[isFocused]);

  useEffect(()=>{
    if(addDetails.product_id !== '' && addDetails.stockQuantity !== ''){
      setBtnDisable(false)
    }else{
      setBtnDisable(true)
    }
  },[addDetails])

  const getAllProducts = async () => {
    const data = await getAllProductsWithoutStock()
    setProductList(data)
  }

  const handleChange = (text, name) => {
    setAddDetails({
      ...addDetails,
      [name]: text,
    });
  };

  const onAdd = async() => {
    try {
     await axios.post('http://192.168.1.10:8080/api/stock/',{
      stockQuantity:addDetails.stockQuantity,
      product_id:addDetails.product_id
      })
      setAddDetails({stockQuantity:'',product_id:''})
      console.log('Successfully added')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     
    <SafeAreaView style={{flex:1,padding:10,paddingTop:20,paddingBottom:20}}>
      <ImageBackground source={require('../../assets/images/logo.png')} style={{width:220,height:220,opacity:0.2,position:'absolute',bottom:-30,right:-50}} />
      <ScrollView> 
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Stock Details</Text>
      <Divider style={{marginLeft:10,height:3,width:110,marginBottom:20}} />
        <View style={{paddingHorizontal:15,marginBottom:15}}>
        <Text style={{color:'#4F6367',marginBottom:10}}> Select Product </Text>
        <Select  variant='filled' selectedValue={addDetails.product_id} paddingLeft="5" bgColor={"#7A9E9F"} minWidth="200"  placeholder="Choose Product" placeholderTextColor={"#E7E7E7"} color={"#E7E7E7"} borderRadius={"2xl"} _selectedItem={{
            bg: "gray.200",
      }} mt={1} onValueChange={itemValue => setAddDetails({...addDetails,product_id:itemValue})}>
            
            {
              productList.length > 0 ? productList.map((item)=> (
                <Select.Item key={item.id} label={item.name} value={item.id} />
              )):(
                <Select.Item key={1} label="No products" value="No products" />
              )
            }
             
        </Select>
        </View>
          <InputField  label={'Stock Quantity'} placeholder={'Enter stock quantity'} value={addDetails.stockQuantity}  onChangeText={(text) => handleChange(text,'stockQuantity')}/>
          <Button disabled={btnDisable} onPress={onAdd} buttonText={'Add Stock'} />
      
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default StockAddScreen;

const styles = StyleSheet.create({});
