import { StyleSheet, Text, View,ScrollView, TextInput, TouchableWithoutFeedback,Keyboard } from 'react-native';
import React,{useState} from 'react';
import {Divider} from 'react-native-paper'
import AdminSupplierCustomer from '../components/AdminSupplierCustomer';
import { Modal, Portal,  Button, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputField from '../components/InputField';


const StockAllScreen = () => {

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

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
        <TouchableOpacity style={{backgroundColor:'#FE5F55',padding:2,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center',marginBottom:8}}><Text style={{color:'white',fontWeight:'bold'}}>Delete</Text></TouchableOpacity>
        <TouchableOpacity onPress={hideDeleteModal} style={{backgroundColor:'#7A9E9F',padding:2,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Cancel</Text></TouchableOpacity>
      </Modal>
    </Portal>

    <Portal>
      <Modal visible={visibleEdit} onDismiss={hideEditModal} contentContainerStyle={{backgroundColor: '#4F6367', padding: 18, margin:40,borderRadius:10}}>
        <Text style={{fontSize:16,fontWeight:'bold',marginBottom:10,color:'white'}}>Edit Stock</Text>
        <InputField label={'Name'} placeholder={'Enter Name'} isModal={true} />
        <InputField label={'Phone Number'} placeholder={'Enter phone number'} isModal={true} />
        <TouchableOpacity onPress={hideDeleteModal} style={{marginTop:10,backgroundColor:'#7A9E9F',padding:10,paddingHorizontal:20,borderRadius:10,alignItems:'center',alignSelf:'center'}}><Text  style={{color:'white',fontWeight:'bold'}}>Save</Text></TouchableOpacity>
      </Modal>
    </Portal>
   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView>
    <View style={{flex:1,padding:10,paddingTop:20}}>
   
    <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold',color:'#4F6367'}}>Stocks</Text>
    <Divider style={{marginLeft:10,height:3,width:60,marginBottom:20}} />

    <View style={{marginBottom:20}}>
      <TextInput placeholder='Search by product...' style={{
        backgroundColor:'white',borderRadius:15,height:40,paddingLeft:20,color:'#4F6367',fontSize:15,
        shadowColor: '#4F6367',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation:3,
        }} />
    </View>

        <AdminSupplierCustomer type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'}  deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'}  deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'}  deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'} deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
        <AdminSupplierCustomer type={'stock'}  deleteModalCallBack = {showDeleteModal}  editModalCallBack = {showEditModal}/>
  </View>
  </ScrollView>
  </TouchableWithoutFeedback>
  </Provider>

  </>
  );
};

export default StockAllScreen;

const styles = StyleSheet.create({});
