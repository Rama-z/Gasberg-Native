import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import Signup from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import SplashScreen from '../screens/SplashScreen';
import Product from '../screens/product/Product';
import ProductAll from '../screens/product/ProductAll';
import ProductDetail from '../screens/product/ProductDetail';
import Cart from '../screens/transaction/Cart';
import Checkout from '../screens/transaction/Checkout';
import Payment from '../screens/transaction/Payment';
import Drawer from '../screens/drawer/index';
import Favorite from '../screens/product/Favorite';
import Promo from '../screens/product/Promo';
import Search from '../screens/Search';

function Router() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
      <Stack.Screen name="ProductAll" component={ProductAll} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
      <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
      <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Stack.Screen name="Promo" component={Promo} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Router;
