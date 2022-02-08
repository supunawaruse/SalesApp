import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { LogBox } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import AdminAddScreen from './src/screens/AdminAddScreen';
import AdminAllScreen from './src/screens/AdminAllScreen';
import CustomerAllScreen from './src/screens/CustomerAllScreen';
import CustomerAddScreen from './src/screens/CustomerAddScreen';
import ProductAllScreen from './src/screens/ProductAllScreen';
import ProductAddScreen from './src/screens/ProductAddScreen';
import SalesAllScreen from './src/screens/SalesAllScreen';
import SaleAddSceen from './src/screens/SaleAddScreen';
import PurchaseAllScreen from './src/screens/PurchaseAllScreen';
import PurchaseAddScreen from './src/screens/PurchaseAddScreen';
import StockAllScreen from './src/screens/StockAllScreen';
import StockAddScreen from './src/screens/StockAddScreen';
import SupplierAllScreen from './src/screens/SupplierAllScreen';
import SupplierAddScreen from './src/screens/SupplierAddScreen';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import CustomDrawer from './src/components/CustomDrawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Drawer = createDrawerNavigator();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {

  return (
   <NavigationContainer>
      <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{headerTitleAlign:"center",headerTitleStyle:{color:'#4F6367'},headerStyle:{height:70}}} >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{drawerLabel:'Dashboard',groupName: 'Dashboard',headerTitle:"Dashboard"}}/>
        <Drawer.Screen name="AddminAll" component={AdminAllScreen} options={{drawerLabel:'All Admins', groupName: 'Admins',headerTitle:"Admins Details"}}/>
        <Drawer.Screen name="AddminAdd" component={AdminAddScreen} options={{drawerLabel:'Add Admin', groupName: 'Admins',headerTitle:"Add Admin"}}/>
        <Drawer.Screen name="ProductAll" component={ProductAllScreen} options={{drawerLabel:'All Products', groupName: 'Products',headerTitle:"Products Details"}}/>
        <Drawer.Screen name="ProductAdd" component={ProductAddScreen} options={{drawerLabel:'Add Product', groupName: 'Products',headerTitle:"Add Product"}}/>
        <Drawer.Screen name="SalesAll" component={SalesAllScreen} options={{drawerLabel:'All Sales', groupName: 'Sales',headerTitle:"Sales Details"}}/>
        <Drawer.Screen name="SaleAdd" component={SaleAddSceen} options={{drawerLabel:'Add Sale', groupName: 'Sales',headerTitle:"Add Sale"}}/>
        <Drawer.Screen name="PurchaseAll" component={PurchaseAllScreen} options={{drawerLabel:'All Purchases', groupName: 'Purchases',headerTitle:"Purchases Details"}}/>
        <Drawer.Screen name="PurchaseAdd" component={PurchaseAddScreen} options={{drawerLabel:'Add Purchase', groupName: 'Purchases',headerTitle:"Add Purchase"}}/>
        <Drawer.Screen name="StockAll" component={StockAllScreen} options={{drawerLabel:'All Stocks', groupName: 'Stocks',headerTitle:"Stocks Details"}}/>
        <Drawer.Screen name="StockAdd" component={StockAddScreen} options={{drawerLabel:'Add Stock', groupName: 'Stocks',headerTitle:"Add Stock"}}/>
        <Drawer.Screen name="CustomerAll" component={CustomerAllScreen} options={{drawerLabel:'All Customers', groupName: 'Customers',headerTitle:"Customers Details"}}/>
        <Drawer.Screen name="CustomerAdd" component={CustomerAddScreen} options={{drawerLabel:'Add Cusotmer', groupName: 'Customers',headerTitle:"Add Customer"}}/>
        <Drawer.Screen name="SupplierAll" component={SupplierAllScreen} options={{drawerLabel:'All Suppliers', groupName: 'Suppliers',headerTitle:"Suppliers Details"}}/>
        <Drawer.Screen name="SupplierAddd" component={SupplierAddScreen} options={{drawerLabel:'Add Supplier', groupName: 'Suppliers',headerTitle:"Add Supplier"}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
