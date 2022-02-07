import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import React,{useState} from 'react';
import {DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer';
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CustomDrawer = (props) => {
    const [expanded, setExpanded] = useState(true);
    const {state, descriptors, navigation} = props;
    let lastGroup = '';
    let newGroup = true;

  return (
    <View style={{flex:1}}>
        <View style={{flex:0.15, backgroundColor:'white', flexDirection:"row"}}>
            <View style={{flex:0.5,justifyContent:"center",paddingLeft:20}}>
                    <Image source={require('../../assets/images/logo1.png')} style={{height:40, width:100}} />
            </View>
            <View style={{flex:0.5,justifyContent:"center",alignItems:"flex-end",paddingRight:20}}>
                <TouchableOpacity onPress={()=> navigation.closeDrawer()}>
                    <Image source={require('../../assets/images/toggle1.png')} style={{height:18, width:18}} />
                </TouchableOpacity>
            </View>
        </View>
        
        <DrawerContentScrollView {...props} contentContainerStyle={{flex:1, backgroundColor:'#4F6367', borderTopRightRadius:15,paddingTop:20}}>
            <ScrollView>
            <List.AccordionGroup>
                {
                    state.routes.map((r)=>{
                        const gName = descriptors[r.key].options.groupName;
                        if(gName === 'Dashboard'){
                            return (
                                <DrawerItem
                                icon={({size,focused}) => <MaterialIcons color={focused ? '#4F6367' : 'white'} size={size} name='dashboard'/>}
                                key={r.key} 
                                label={({focused})=> <Text style={focused? {color:'#4F6367'}:{color:'white'}}>{gName}</Text>}
                                activeBackgroundColor='#EDEDED'
                                onPress={() => navigation.navigate(r.name)} 
                                focused={state.routes.findIndex((e) => e.name === r.name) === state.index}
                                />
                            )
                        }else{
                            if (lastGroup !== gName) {
                                newGroup = true;
                                lastGroup = gName;
                            } else newGroup = false;
                            return(
                                <View key={r.key}>
                                {
                                    newGroup && (
                                        <List.Accordion key={gName} title={gName} id={gName} style={{backgroundColor:'#4F6367',paddingHorizontal:10}} titleStyle={{color:'white',fontWeight:'800'}} right={() => <MaterialIcons name='keyboard-arrow-down' size={20} color='white' />}  >
                                        {
                                            state.routes.map((route)=>{
                                                const {drawerLabel,groupName} = descriptors[route.key].options;
                                                if(groupName === gName){
                                                    return(
                                                        <DrawerItem
                                                        icon={({focused}) => <FontAwesome5 color={focused ? '#4F6367' : 'white'} size={18} name={gName === 'Admins' ? 'user-tie' : gName === 'Products' ? 'store' : gName === 'Sales' ? 'money-check' : gName === 'Purchases' ? 'shopping-cart' : gName === 'Stocks' ? 'boxes' : gName === 'Customers' ? 'user-check' : 'user-alt' } />}
                                                        style={{paddingHorizontal:20}}
                                                        key={route.key} 
                                                        label={({focused})=> <Text style={focused? {color:'#4F6367'}:{color:'white'}}>{drawerLabel}</Text>}
                                                        activeBackgroundColor='#EDEDED'
                                                        onPress={() => navigation.navigate(route.name)} 
                                                        focused={state.routes.findIndex((e) => e.name === route.name) === state.index}
                                                         /> 
                                                    )
                                                }
                                            })
                                        }             
                                    </List.Accordion>
                                    )
                                }
                                </View>
                            )
                        }
                    })
                }
               
            </List.AccordionGroup>
            </ScrollView>
        </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
