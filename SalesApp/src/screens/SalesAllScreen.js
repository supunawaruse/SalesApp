import { StyleSheet, Text, View,ScrollView,TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import SalePurchase from '../components/SalePurchase';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import { Select } from "native-base";
import { getAllSales } from '../services/SalesServices';
import {getAllCustomers} from '../services/CustomerServices'

const SalesAllScreen = () => {

  const [sales, setSales] = useState([])
  const [customerSales,setCustomerSales] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const isFocused = useIsFocused();
  const [customersList,setCustomersList] = useState([])
  const [searchedItem, setSearchedItem] = useState()

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAll()
      getAllCustomersFromDatabase()
    }else{
      setSearchedItem({customer_id:'Search Sale by Customer...'})
    }
    return () => mounted = false;
  },[isFocused]);

  const getAll = async () => {
    const data = await getAllSales()
    setSales(data)
    setCustomerSales(data)
  }

  const getAllCustomersFromDatabase = async () => {
    const data = await getAllCustomers()
    setCustomersList(data)
  }

  const onChangeSelect = async (itemValue) => {
    if(itemValue === 'All'){
      setSearchedItem({customer_id:'Search Sale by Customer...'})
      setCustomerSales(sales)
    }else{
      setSearchedItem({customer_id:itemValue})
      try {
        setCustomerSales(sales.filter((sale) => sale.customer_id === itemValue))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Sales</Text>
    <Divider style={{marginLeft:10,height:3,width:50,marginBottom:20}} />
        <Select  variant='filled' selectedValue={searchedItem?.customer_id} paddingLeft="5" bgColor={"#7A9E9F"} minWidth="200"  placeholder="Search Sale by Customer..." placeholderTextColor={"#E7E7E7"} color={"#E7E7E7"} borderRadius={"2xl"} _selectedItem={{bg: "gray.200",}} mt={1} onValueChange={onChangeSelect}>
              <Select.Item key={0} label={'All'} value={'All'}/>
              {
              customersList.length > 0 ? customersList.map((item)=> (
                <Select.Item  key={item.id} label={item.name} value={item.id} />
              )):(
                <Select.Item disabled={true} key={1} label="No Customers" value="No Customers" />
              )
              }
        </Select>

        <View style={{marginTop:10}}>
          {
            customerSales.length > 0 ? customerSales.map((item)=> (
              <SalePurchase key={item.id} type={'sale'} data = {item} />
            )):(
              <View style={{padding:10}}>
                 <Text>No Sales</Text>
              </View>
            )
          }
        </View>
  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  );
};

export default SalesAllScreen;

const styles = StyleSheet.create({});
