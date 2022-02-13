import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React,{useState,useEffect} from 'react';
import {Divider} from 'react-native-paper'
import Product from '../components/Product';
import { Modal, Portal,  Button, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputField from '../components/InputField';
import { getAllProducts } from '../services/ProductsServices';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import { ActivityIndicator, Colors } from 'react-native-paper';

const ProductAllScreen = () => {

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [products,setProducts] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const isFocused = useIsFocused();
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    let mounted = true;
    if(isFocused){ 
      getAll()
    }
    return () => mounted = false;
  },[isFocused]);

  const getAll = async () => {
    const data = await getAllProducts()
    setProducts(data)
    setIsLoading(false)
  }

  const onDelete = async () => {
    const item = products.filter((product) => product.id === selectedItem.id)[0]
    try {
      await axios.delete(`http://192.168.1.10:8080/api/product/${item.id}`)
      setProducts(products.filter((product) => product.id !== item.id))
      hideDeleteModal();
      console.log('item deleted')
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = async () => {
    const item = products.filter((product) => product.id === selectedItem.id)[0]
    try {
      const {data} = await axios.put(`http://192.168.1.10:8080/api/product/${item.id}`,{
        name:selectedItem.name,
        category:selectedItem.category,
        buyingPrice:selectedItem.buyingPrice,
      })
      hideEditModal();
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
        <TouchableOpacity onPress={onDelete}  style={{backgroundColor:'#FE5F55',padding:2,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center',marginBottom:8}}><Text style={{color:'white',fontWeight:'bold'}}>Delete</Text></TouchableOpacity>
        <TouchableOpacity onPress={hideDeleteModal} style={{backgroundColor:'#7A9E9F',padding:2,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
      </Modal>
    </Portal>

    <Portal>
  
      <Modal visible={visibleEdit} onDismiss={hideEditModal} contentContainerStyle={{backgroundColor: '#4F6367', padding: 18, margin:40,borderRadius:10}}>
       
        <Text style={{fontSize:16,fontWeight:'bold',marginBottom:10,color:'white'}}>Edit Product</Text>
        <InputField label={'Name'} placeholder={'Enter Name'} isModal={true} value={selectedItem?.name}  onChangeText={(text) => handleChange(text,'name')}/>
        <InputField label={'Category'} placeholder={'Enter category'} isModal={true} value={selectedItem?.category}  onChangeText={(text) => handleChange(text,'category')}/>
        <InputField label={'Buying Price'} placeholder={'Enter buying price'} isModal={true} value={selectedItem?.buyingPrice}  onChangeText={(text) => handleChange(text,'buyingPrice')}/>
        <TouchableOpacity onPress={onEdit} style={{marginTop:10,backgroundColor:'#7A9E9F',padding:10,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Save</Text></TouchableOpacity>
       
      </Modal>
    </Portal>

    <View style={{flex:1,padding:10,paddingTop:20}}>
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Products</Text>
    <Divider style={{marginLeft:10,height:3,width:70,marginBottom:20}} />
    
    {
      isLoading ? (<ActivityIndicator style={{marginTop:10}} animating={true} color={'#4F6367'} />)
      : (
        <ScrollView>
          {
            products.length > 0 ? products.map((item)=>(
              <Product key={item.id} type={'product'}  deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal} selectItemCallBack = {selectItem}  data={item}/>
            )):(
              <View style={{padding:10}}>
                  <Text style={{color:'#4F6367'}}>No Products...</Text>
              </View>
            )
          }
      </ScrollView>
      )
    }

    
  
  </View>

  </Provider>
  </>
  );
};

export default ProductAllScreen;

const styles = StyleSheet.create({});
