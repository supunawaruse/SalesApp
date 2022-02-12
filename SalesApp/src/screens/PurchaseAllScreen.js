import { StyleSheet, Text, View,ScrollView,TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import SalePurchase from '../components/SalePurchase';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import { Select } from "native-base";
import { getAllPurchases } from '../services/PurchasesServices';
import { getAllSuppliers } from '../services/SuppliersServices';

const PurchaseAllScreen = () => {

  const [purchases, setPurchases] = useState([])
  const [supplierPurchases,setSupplierPurchases] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const isFocused = useIsFocused();
  const [supplierList,setSupplierList] = useState([])
  const [searchedItem, setSearchedItem] = useState()

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAll()
      getAllSuppliersFromDatabase()
    }else{
      setSearchedItem({supplier_id:'Search Purchase by Supplier...'})
    }
    return () => mounted = false;
  },[isFocused]);

  const getAll = async () => {
    const data = await getAllPurchases()
    setPurchases(data)
    setSupplierPurchases(data)
  }

  const getAllSuppliersFromDatabase = async () => {
    const data = await getAllSuppliers()
    setSupplierList(data)
  }

  const onChangeSelect = async (itemValue) => {
    if(itemValue === 'All'){
      setSearchedItem({supplier_id:'Search Stock by Product...'})
      setSupplierPurchases(purchases)
    }else{
      setSearchedItem({supplier_id:itemValue})
      try {
        setSupplierPurchases(purchases.filter((purchase) => purchase.supplier_id === itemValue))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Purchases</Text>
    <Divider style={{marginLeft:10,height:3,width:90,marginBottom:20}} />
        <Select  variant='filled' selectedValue={searchedItem?.supplier_id} paddingLeft="5" bgColor={"#7A9E9F"} minWidth="200"  placeholder="Search Purchase by Supplier..." placeholderTextColor={"#E7E7E7"} color={"#E7E7E7"} borderRadius={"2xl"} _selectedItem={{bg: "gray.200",}} mt={1} onValueChange={onChangeSelect}>
              <Select.Item key={0} label={'All'} value={'All'}/>
              {
              supplierList.length > 0 ? supplierList.map((item)=> (
                <Select.Item  key={item.id} label={item.name} value={item.id} />
              )):(
                <Select.Item disabled={true} key={1} label="No Suppliers" value="No Suppliers" />
              )
              }
        </Select>

        <View style={{marginTop:10}}>
          {
            supplierPurchases.length > 0 ? supplierPurchases.map((item)=> (
              <SalePurchase key={item.id} type={'purchase'} data = {item} />
            )):(
              <View style={{padding:10}}>
                 <Text>No Purchases on this supplier</Text>
              </View>
            )
          }
        </View>
  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  );
};

export default PurchaseAllScreen;

const styles = StyleSheet.create({});
