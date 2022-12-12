import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import profile from '../../assets/drawer/profile.png';
import HomePage from '../homePage/Index';
import styles from '../../styles/HomePage';
import Navbar from '../../components/Navbar';
import Card from '../../components/CardProduct';
import Sample from '../../assets/images/product.png';
// Tab ICons...
import home from '../../assets/drawer/home.png';
import search from '../../assets/drawer/search.png';
import notifications from '../../assets/drawer/bell.png';
import settings from '../../assets/drawer/settings.png';
import logout from '../../assets/drawer/logout.png';
// Menu
import menu from '../../assets/drawer/menu.png';
import close from '../../assets/drawer/close.png';

// Photo
import photo from '../../assets/drawer/photo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import productAction from '../../redux/actions/product';

export default function App() {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('Profile');
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  const products = useSelector((state) => state.product.product);
  const isPending = useSelector((state) => state.product.isLoading);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(productAction.getProductThunk());
  }, [dispatch]);
  return (
    <SafeAreaView style={styless.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        {/* <Image source={profile} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 8
        }}></Image>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>Jenna Ezarik</Text>
        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity> */}

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, 'Profile', home)}
          {TabButton(currentTab, setCurrentTab, 'Orders', home)}
          {TabButton(currentTab, setCurrentTab, 'Settings', search)}
          {TabButton(currentTab, setCurrentTab, 'Privacy policy', notifications)}
          {TabButton(currentTab, setCurrentTab, 'Security', settings)}
        </View>

        <View>{TabButton(currentTab, setCurrentTab, 'Sign-out', logout)}</View>
      </View>

      {
        // Over lay View...
      }

      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        {
          // Menu Button...
        }

        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // Do Actions Here....
              // Scaling the view...
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                // YOur Random Value...
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
          >
            <Image
              source={showMenu ? close : menu}
              style={{
                width: 20,
                height: 20,
                tintColor: 'black',
                marginTop: 40,
              }}
            ></Image>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              paddingTop: 20,
            }}
          >
            A good coffee is a good day
          </Text>

          <ScrollView style={styles.container}>
            {/* <Text style={styles.title}>A good coffee is a good day</Text> */}
            <Text
              style={styles.category}
              onPress={() => {
                navigation.navigate('ProductDetail');
              }}
            >
              Favorite Products
            </Text>
            <Text
              style={styles.see}
              onPress={() => {
                navigation.navigate('ScreenFavorite');
              }}
            >
              See more
            </Text>

            {isPending ? (
              <View style={styles.btnLoading}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : (
              products.length > 0 &&
              !isPending && (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  keyboardShouldPersistTaps={'always'}
                  style={{ height: height / 2 }}
                >
                  {products?.map((e) => {
                    return (
                      <Card
                        name={e.product_name}
                        price={e.price}
                        img={e.image}
                        id={e.id}
                        key={e.id}
                      />
                    );
                  })}
                  {/* <Card /> */}
                </ScrollView>
              )
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == 'LogOut') {
          // Do your Stuff...
        } else {
          setCurrentTab(title);
        }
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? '#6A4029' : 'white',
          }}
        ></Image>

        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? '#6A4029' : 'white',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A4029',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
