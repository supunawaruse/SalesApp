import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,SafeAreaView,ImageBackground,TextInput} from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import InputField from '../components/InputField';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import { Select } from "native-base";
import { getAllCustomers } from '../services/CustomerServices';
import { getAllProducts } from '../services/ProductsServices';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SaleAddScreen = () => {

  const isFocused = useIsFocused();
  const [customersList,setCustomersList] = useState([])
  const [productList,setProductList] = useState([])
  const [allProductList,setAllProductList] = useState([])
  const [saleProductList,setSaleProductList] = useState([])
  const [addDetails,setAddDetails] = useState({quantity:'',product_id:'',customer_id:'',toBePaid:''})
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [addBtnDisable, setAddBtnDisable] = useState(true)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setAddDetails({...addDetails,date:date.toLocaleDateString()})
    hideDatePicker();
  };

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAllCustomersToScreen()
      getAllProductsToScreen()
    }else{
      setAddDetails({})
      setSaleProductList([])
    }
    return () => mounted = false;
  },[isFocused]);

  useEffect(()=>{
    setAddDetails({...addDetails,total:calcualteTotal()}) 
  },[saleProductList])

  useEffect(()=>{
    if(addDetails.customer_id !== '' &&  saleProductList.length > 0){
      setAddBtnDisable(false)
    }else{
      setAddBtnDisable(true)
    }
  },[addDetails,saleProductList])

  const getAllCustomersToScreen = async () => {
    const data = await getAllCustomers()
    setCustomersList(data)
  }

  const getAllProductsToScreen= async () => {
    const data = await getAllProducts()
    setProductList(data)
    setAllProductList(data)
  }

  const onChangeText = (value,name) => {
    setAddDetails({
      ...addDetails,
      [name]:value
    })
  }

  const addToSaleList = () =>{
    const item = productList.filter((item)=> item.id === addDetails.product_id)[0]
    const data = {item,quantity:addDetails.quantity}
    setSaleProductList([...saleProductList,data])

    const newProductList = productList.filter((item) => item.id !== addDetails.product_id)
    setProductList(newProductList)
  }

  const calcualteTotal = () => {
    let count = 0;
    saleProductList.forEach((item)=>{count = count + item.item.buyingPrice * item.quantity})
    return count;
  }

  
  const onAddSale = async () => {
    const products = []
   saleProductList.forEach((item)=> {
        data = {
          id:item.item.id,
          quantity:item.quantity
        }
        products.push(data)
    })

    try {
      await axios.post('http://192.168.1.10:8080/api/sale/',{
        total:addDetails?.total,
        customer_id:addDetails.customer_id,
        salesDate: addDetails.date,
        toBePaid:addDetails.toBePaid,
        products:products
      })

      products.forEach(async(item)=>{
        await axios.post('http://192.168.1.10:8080/api/stock/reduceStock',{
          quantity:item.quantity,
          product_id:item.id
        })
      })

      setAddDetails({quantity:'',product_id:'',customer_id:'',toBePaid:''})
      setProductList(allProductList)
      setSaleProductList([])
    } catch (error) {
      console.log(error)
    }
  }

  const onReset = () =>{
    setProductList(allProductList)
    setSaleProductList([])
    setAddDetails({quantity:'',product_id:''})
  }
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     
    <SafeAreaView style={{flex:1,padding:10,paddingTop:20,paddingBottom:20}}>
      <ImageBackground source={require('../../assets/images/logo.png')} style={{width:220,height:220,opacity:0.2,position:'absolute',bottom:-30,right:-50}} />
      <ScrollView>  
      <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Sale Details {addDetails?.toBePaid + addDetails?.quantity}</Text>
      <Divider style={{marginLeft:10,height:3,width:90,marginBottom:20}} />
      <View style={{paddingHorizontal:15,marginBottom:15}}>
        <Text style={{color:'#4F6367',marginBottom:10}}>Customer</Text>
        <Select  variant='filled' selectedValue={addDetails.customer_id ? addDetails.customer_id : 'Select Customer'} paddingLeft="5" bgColor={"#7A9E9F"} minWidth="200"  placeholder="Select Customer" placeholderTextColor={"#E7E7E7"} color={"#E7E7E7"} borderRadius={"2xl"} _selectedItem={{bg: "gray.200",}} mt={1} 
        onValueChange={itemValue => setAddDetails({...addDetails,customer_id:itemValue})}>
            {
              customersList.length > 0 ? customersList.map((item)=> (
                <Select.Item key={item.id} label={item.name} value={item.id} />
              )):(
                <Select.Item key={1} label="No Customers" value="No Customers" />
              )
            }
        </Select>
      </View>

          <View style={{paddingHorizontal:15,marginBottom:15}}>
          <Text style={{marginBottom:15}}>{'Select Date'}</Text>
            <TouchableOpacity style={{padding:13,paddingHorizontal:20,backgroundColor:'#7A9E9F',borderRadius:15}} onPress={showDatePicker}>
              <Text style={{color:'#e7e7e7'}}>{addDetails.date ? addDetails.date :'Select Date'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={{marginTop:8,paddingHorizontal:10,marginBottom:10}}>
          <Text style={{marginBottom:8}}>Add Products:</Text>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:10,marginBottom:5,borderRadius:10}}>
              <View style={{flex:0.7,alignItems:'center'}}>
              <Text>Product Name</Text>
              </View>
              <View style={{flex:0.3,alignItems:'center'}}>
              <Text>Qty</Text>
              </View>
            

          </View>
          <View style={{flex:1,flexDirection:'row',paddingHorizontal:10,marginBottom:5,borderRadius:10}}>
              <View style={{flex:0.7,alignItems:'center',justifyContent:'center'}}>
               
                    <Select  variant='filled' selectedValue={addDetails.product_id ? addDetails.product_id : 'Select Product'} paddingLeft="5" bgColor={"#7A9E9F"} minWidth="60%"  placeholder="Select Product" placeholderTextColor={"#E7E7E7"} color={"#E7E7E7"} borderRadius={"2xl"} _selectedItem={{bg: "gray.200",}} mt={1} 
                    onValueChange={itemValue => setAddDetails({...addDetails,product_id:itemValue})}>
                        {
                          productList.length > 0 ? productList.map((item)=> (
                            <Select.Item key={item.id} label={`${item.name} - (${item.category})`} value={item.id} />
                          )):(
                            <Select.Item disabled={true} key={1} label="No Products" value="No Products" />
                          )
                        }
                    </Select>
                
              </View>
              <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
              <TextInput
                keyboardType='numeric'
                value={addDetails?.quantity}
                onChangeText={(value) => onChangeText(value,'quantity')}
                placeholder='Qty'
                placeholderTextColor='white' 
                style={{backgroundColor:'#7A9E9F',borderRadius:15,padding:5,paddingHorizontal:20,color:'white', width:70}} />
              </View>
            
          </View>
            
          <View style={{flex:1,flexDirection:'row',marginBottom:10}}>
                <View style={{flex:0.5,alignItems:'flex-end',justifyContent:'center',paddingRight:5}}>
                  <TouchableOpacity disabled={addDetails.quantity === '' || addDetails.product_id === ''} onPress={addToSaleList} style={{backgroundColor:'#4F6367',borderRadius:15,padding:10,paddingHorizontal:20}}><Text style={{color:'white',fontWeight:'bold'}}>Add</Text></TouchableOpacity>
                </View>
                <View style={{flex:0.5,alignItems:'flex-start',paddingLeft:5}}>
                  <TouchableOpacity style={{backgroundColor:'#4F6367',borderRadius:15,padding:10,paddingHorizontal:20}} onPress={onReset} >
                  <Text style={{color:'white',fontWeight:'bold'}}>Reset</Text>
                  </TouchableOpacity>
                </View>
          </View>

          {
            saleProductList.length > 0 && saleProductList.map((item,index)=> (
              <View key={index} style={{flex:1,flexDirection:'row',paddingHorizontal:10}}>
                <View style={{flex:0.5,alignItems:'center'}}>
                <Text>{item?.item.name}</Text>
                </View>
                <View style={{flex:0.2,alignItems:'center'}}>
                <Text>{item?.quantity}</Text>
                </View>
                <View style={{flex:0.3,alignItems:'center'}}>
                <Text>{item?.item.buyingPrice * item.quantity}</Text>
                </View>
              </View>
            )) 
          }
       
        </View>
          <View style={{paddingHorizontal:20,marginBottom:10,flex:1}}>
            <Text style={{marginBottom:15}}>To be paid:</Text>
            <TextInput
                keyboardType='numeric'
                value={addDetails?.toBePaid}
                onChangeText={(value) => onChangeText(value,'toBePaid')}
                placeholder='To be paid'
                placeholderTextColor='white' 
                style={{backgroundColor:'#7A9E9F',borderRadius:15,padding:8,paddingHorizontal:20,color:'white'}} />
          </View>
        
          <View style={{paddingHorizontal:20}}>
          <Text style={{marginBottom:15}}>Total:</Text>
          <View style={{padding:15,backgroundColor:'#7A9E9F',borderRadius:15}}>
            <Text style={{color:'#e7e7e7'}}>LKR.{addDetails?.total}</Text>
          </View>
          </View>
          <Button onPress={onAddSale} disabled={addBtnDisable} buttonText={'Add Sale'} />
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SaleAddScreen;

const styles = StyleSheet.create({});
