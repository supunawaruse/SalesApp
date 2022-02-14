import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,ImageBackground} from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';

const ProductAddScreen = () => {

  const [btnDisable,setBtnDisable] = useState(true)
  const [addDetails,setAddDetails] = useState({
    name:'',
    category:'',
    buyingPrice:''
  })

  const handleChange = (text, name) => {
    setAddDetails({
      ...addDetails,
      [name]: text,
    });
  };

  useEffect(()=>{
    if(addDetails.name !== '' && addDetails.category !== '' && addDetails.buyingPrice !== ''){
      setBtnDisable(false)
    }else{
      setBtnDisable(true)
    }
  },[addDetails])

  const onAdd = async() => {
    try {
     await axios.post('https://mysql-sequalize-sales-app.herokuapp.com/api/product/',{
        name:addDetails.name,
        category:addDetails.category,
        buyingPrice:addDetails.buyingPrice
      })
      setAddDetails({name:'',category:'',buyingPrice:''})
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
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Product Details</Text>
      <Divider style={{marginLeft:10,height:3,width:140,marginBottom:20}} />
       
          <InputField label={'Name'} placeholder={'Enter Name'} value={addDetails.name}  onChangeText={(text) => handleChange(text,'name')}/>
          <InputField label={'Category'} placeholder={'Enter Category'} value={addDetails.category}  onChangeText={(text) => handleChange(text,'category')} />
          <InputField label={'Buying Price'} placeholder={'Enter Buying Price'} value={addDetails.buyingPrice}  onChangeText={(text) => handleChange(text,'buyingPrice')} />
          <Button disabled={btnDisable} onPress={onAdd} buttonText={'Add Product'} />
      
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ProductAddScreen;

const styles = StyleSheet.create({});
