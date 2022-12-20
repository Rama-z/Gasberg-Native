import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  DrawerLayoutAndroid,
  Button,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styles from '../../styles/ManageProduct';

import back from '../../assets/image/back.png';
import finger from '../../assets/image/finger.png';

import ProductsPayment from '../../Components/history';
import { useDispatch, useSelector } from 'react-redux';

const ManageOrder = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Delivery');
  };

  const markDone = () => {
    console.log('semua acc');
  };

  const deliveryDetail = useSelector((state) => state.checkout.checkoutItemList);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.red}>
          <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
            <Image
              source={back}
              style={{
                width: 10,
                height: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.order}>Customer Order</Text>
      <View style={styles.section}>
        <Image
          source={finger}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={styles.swipe}>swipe on an item when it's done</Text>
      </View>

      <ProductsPayment
        grandTotal={deliveryDetail.totalPrice}
        name={deliveryDetail.product_name}
        qty={deliveryDetail.quantity}
        image={deliveryDetail.image}
      />

      {/* <Text style={styles.left}>You have no history left</Text> */}
      <View style={styles.buttons2}>
        <Pressable style={styles.inbuttons2} onPress={markDone}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: 'black',
              textAlign: 'center',
            }}
          >
            Mark all as done
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

function onPress() {
  console.log('teken');
}

export default ManageOrder;
