import { StyleSheet, Text, View,ScrollView, TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import AdminSupplierCustomer from '../components/AdminSupplierCustomer';
import { Modal, Portal,  Button, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputField from '../components/InputField';
import { getAllStocks } from '../services/StocksServices';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { Select } from "native-base";
import { getAllProductsWithoutStock } from '../services/ProductsServices';

const StockAllScreen = () => {

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [stocks,setStocks] = useState([])
  const [productStocks,setProductStocks] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const isFocused = useIsFocused();
  const [productList,setProductList] = useState([])
  const [searchedItem, setSearchedItem] = useState()

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAll()
      getAllProducts()
    }else{
      setSearchedItem({product_id:'Search Stock by Product...'})
    }
    return () => mounted = false;
  },[isFocused]);

  const getAll = async () => {
    const data = await getAllStocks()
    setStocks(data)
    setProductStocks(data)
  }

  const getAllProducts = async () => {
    const data = await getAllProductsWithoutStock()
    setProductList(data)
  }

  const onDelete = async () => {
    const item = stocks.filter((stock) => stock.id === selectedItem.id)[0]
    try {
      await axios.delete(`http://192.168.1.10:8080/api/stock/${item.id}`)
      setStocks(stocks.filter((stock) => stock.id !== item.id))
      setProductStocks(productStocks.filter((stock) => stock.id !== item.id))
      hideDeleteModal();
      console.log('item deleted')
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = async () => {
    const item = stocks.filter((stock) => stock.id === selectedItem.id)[0]
    try {
      const {data} = await axios.put(`http://192.168.1.10:8080/api/stock/${item.id}`,{
        stockPlace:selectedItem.stockPlace,
        stockQuantity:selectedItem.stockQuantity
      })
      hideEditModal();
      getAll()
      setSearchedItem({product_id:'Search Stock by Product...'})
      console.log('Succefully Edited')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (text, name) => {
    setSelectedItem({
      ...selectedItem,
      [name]: text,
    });
  };

  const onChangeSelect = async (itemValue) => {
    if(itemValue === 'All'){
      setSearchedItem({product_id:'Search Stock by Product...'})
      setProductStocks(stocks)
    }else{
      setSearchedItem({product_id:itemValue})
      try {
        setProductStocks(stocks.filter((stock) => stock.product_id === itemValue))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const selectItem = (item) => {setSelectedItem(item);}
  const showDeleteModal = (childData) => setVisibleDelete(childData);
  const hideDeleteModal = () => setVisibleDelete(false);
  const showEditModal = (childData) => setVisibleEdit(childData);
  const hideEditModal = () => setVisibleEdit(false);

  return (
    <>
    <Provider>
    <Portal>
      <Modal visible={visibleDelete} onDismiss={hideDeleteModal} contentContainerStyle={{backgroundColor: '#4F6367', padding: 18, margin:40,borderRadius:10}}>
        <Text style={{fontSize:16,fontWeight:'bold',marginBottom:10,color:'white'}}>Are you sure to delete this?</Text>
        <TouchableOpacity onPress={onDelete} style={{backgroundColor:'#FE5F55',padding:2,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center',marginBottom:8}}><Text style={{color:'white',fontWeight:'bold'}}>Delete</Text></TouchableOpacity>
        <TouchableOpacity onPress={hideDeleteModal} style={{backgroundColor:'#7A9E9F',padding:2,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
      </Modal>
    </Portal>

    <Portal>
      <Modal visible={visibleEdit} onDismiss={hideEditModal} contentContainerStyle={{backgroundColor: '#4F6367', padding: 18, margin:40,borderRadius:10}}>
        <Text style={{fontSize:16,fontWeight:'bold',marginBottom:10,color:'white'}}>Edit Stock</Text>
        <InputField label={'Stock Place'} placeholder={'Enter stock place'} isModal={true} value={selectedItem?.stockPlace}  onChangeText={(text) => handleChange(text,'stockPlace')}/>
        <InputField label={'Stock Quantity'} placeholder={'Enter stock quantity'} isModal={true} value={selectedItem?.stockQuantity.toString()}  onChangeText={(text) => handleChange(text,'stockQuantity')}/>
        <TouchableOpacity onPress={onEdit} style={{marginTop:10,backgroundColor:'#7A9E9F',padding:10,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Save</Text></TouchableOpacity>
      </Modal>
    </Portal>
   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Stocks</Text>
    <Divider style={{marginLeft:10,height:3,width:60,marginBottom:20}} />

    <Select  variant='filled' selectedValue={searchedItem?.product_id} paddingLeft="5" bgColor={"#7A9E9F"} minWidth="200"  placeholder="Search Stock by Product..." placeholderTextColor={"#E7E7E7"} color={"#E7E7E7"} borderRadius={"2xl"} _selectedItem={{
            bg: "gray.200",
      }} mt={1} onValueChange={onChangeSelect}>
              <Select.Item key={0} label={'All'} value={'All'}/>
            {
              productList.length > 0 ? productList.map((item)=> (
                <Select.Item  key={item.id} label={item.name} value={item.id} />
              )):(
                <Select.Item key={1} label="No products" value="No products" />
              )
            }
             
        </Select>
    
    <View style={{marginTop:10}}>
    {
    productStocks.length > 0 && productStocks.map((item)=>(
      <AdminSupplierCustomer key={item.id} type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal} selectItemCallBack = {selectItem}  data={item}/>
    ))
    }
    </View>
        
  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  </Provider>

  </>
  );
};

export default StockAllScreen;

const styles = StyleSheet.create({});
