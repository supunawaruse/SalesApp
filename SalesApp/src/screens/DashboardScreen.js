import { StyleSheet, Text, View,ScrollView,TouchableWithoutFeedback, Keyboard, TextInput,TouchableOpacity } from 'react-native';
import React,{useEffect,useState} from 'react';
import {Divider} from 'react-native-paper'
import SalePurchase from '../components/SalePurchase';
import {getRecentSales, getToBePaidSales,updateToBePaidSale} from '../services/SalesServices'
import ToBePaid from '../components/ToBePaid';
import { useIsFocused } from "@react-navigation/native";
import { Modal, Portal,  Button, Provider } from 'react-native-paper';
import axios from 'axios';

const DashboardScreen = () => {

  const isFocused = useIsFocused();
  const [recentSales, setRecentSales] = useState([])
  const [toBePaidSales, setToBePaidSales] = useState([])
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState()

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAllRecentSales()
      getAllToBePaidSales()
    }
    return () => mounted = false;
  },[isFocused]);

  const getAllRecentSales = async() => {
    const data = await getRecentSales()
    setRecentSales(data)
  }

  const getAllToBePaidSales = async() => {
    const data = await getToBePaidSales()
    setToBePaidSales(data)
  }

  const onEdit = async () => {
    const data = {...selectedItem,toBePaid:0}
    try {
      await axios.put(`http://192.168.1.10:8080/api/sale/${selectedItem.id}`,data)
      setToBePaidSales(toBePaidSales.filter((sale) => sale.id !== selectedItem.id))
      hideEditModal()
    } catch (error) {
      console.log(error)
    }
   
  }

  const selectItem = (item) => {setSelectedItem(item);}
  const showEditModal = (childData) => setVisibleEdit(childData);
  const hideEditModal = () => setVisibleEdit(false);

  return (
    <>
    <Provider>
      <Portal>
        <Modal visible={visibleEdit} onDismiss={hideEditModal} contentContainerStyle={{backgroundColor: '#4F6367', padding: 18, margin:40,borderRadius:10}}>
          <Text style={{fontSize:16,fontWeight:'bold',marginBottom:15,color:'white'}}>Are you sure to change this as a paid sale?</Text>
          <TouchableOpacity onPress={onEdit} style={{backgroundColor:'#FE5F55',padding:5,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center',marginBottom:8}}><Text style={{color:'white',fontWeight:'bold'}}>Update</Text></TouchableOpacity>
          <TouchableOpacity onPress={hideEditModal} style={{backgroundColor:'#7A9E9F',padding:5,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
        </Modal>
      </Portal>


    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Recent Sales</Text>
    <Divider style={{marginLeft:10,height:3,width:95,marginBottom:15}} />
    <View style={{marginTop:10}}>
          {
            recentSales.length > 0 ? recentSales.map((item)=> (
              <SalePurchase key={item.id} type={'sale'} data = {item} />
            )):(
              <View style={{padding:10}}>
                 <Text>No Recent Sales...</Text>
              </View>
            )
          }
        </View>

      <Text style={{marginLeft:10,marginTop:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>ToBePaid List</Text>
      <Divider style={{marginLeft:10,height:3,width:115,marginBottom:15}} />
          {
            toBePaidSales.length > 0 && toBePaidSales.map((item) => (
              <ToBePaid key={item.id} data={item} editModalCallBack={showEditModal} selectItemCallBack = {selectItem} />
            ))
          }

  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  </Provider>
  </>
  );
};

export default DashboardScreen;
