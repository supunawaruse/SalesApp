import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,ImageBackground} from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';


const SupplierAddScreen = () => {

  const [btnDisable,setBtnDisable] = useState(true)
  const [addDetails,setAddDetails] = useState({
    name:'',
    phone:'',
    location:''
  })

  const handleChange = (text, name) => {
    setAddDetails({
      ...addDetails,
      [name]: text,
    });
  };

  useEffect(()=>{
    if(addDetails.name !== '' && addDetails.phone !== ''){
      setBtnDisable(false)
    }else{
      setBtnDisable(true)
    }
  },[addDetails])

  const onAdd = async() => {
    try {
     await axios.post('https://mysql-sequalize-sales-app.herokuapp.com/api/supplier',{
        name:addDetails.name,
        phone:addDetails.phone,
        location:addDetails.location
      })
      setAddDetails({name:'',phone:''})
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
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Supplier Details</Text>
      <Divider style={{marginLeft:10,height:3,width:120,marginBottom:20}} />
       
          <InputField label={'Name'} placeholder={'Enter Name'} value={addDetails.name}  onChangeText={(text) => handleChange(text,'name')}/>
          <InputField label={'Phone Number'} placeholder={'Enter phone number'} value={addDetails.phone}  onChangeText={(text) => handleChange(text,'phone')} />
          <InputField label={'Location'} placeholder={'Enter location'} value={addDetails.location}  onChangeText={(text) => handleChange(text,'location')} />
          <Button disabled={btnDisable} onPress={onAdd} buttonText={'Add Supplier'} />
      
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SupplierAddScreen;

const styles = StyleSheet.create({});
