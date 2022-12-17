import React, { useState } from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Cart';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/Hazel.png';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Divider } from '@rneui/themed';

import { useDispatch, useSelector } from 'react-redux';
import cartAction from '../../redux/actions/transaction';

function Cart() {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.transaction.cart);
  const user = useSelector((state) => state.user.profile);
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userData.token);
  const { width } = useWindowDimensions();

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const getItemTotal = () => {
    let price = cartState.price * quantity;
    return costing(price);
  };

  const getTotal = () => {
    let price = cartState.price * quantity;
    let cost = 0;
    if (cartState.size === '2') cost = 3000;
    if (cartState.size === '3') cost = 5000;
    let tax = 0.1 * (price + cost);
    const total = price + tax + cost;
    return costing(total);
  };

  const getSizeCost = () => {
    let cost = 0;
    if (cartState.size === '2') cost = 3000;
    if (cartState.size === '3') cost = 5000;
    return costing(cost);
  };

  const getTaxCost = () => {
    let price = cartState.price * quantity;
    let cost = 0;
    if (cartState.size === '2') cost = 3000;
    if (cartState.size === '3') cost = 5000;
    let tax = 0.1 * (price + cost);
    return costing(tax);
  };

  const handleCheckout = () => {
    let dataCart = cartState;
    console.log(dataCart);
    let price = cartState.price * quantity;
    let cost = 0;
    if (cartState.size === '2') cost = 3000;
    if (cartState.size === '3') cost = 5000;
    let tax = 0.1 * (price + cost);
    const total = price + tax + cost;
    const data = {
      product_id: dataCart.id,
      delivery_adress: user.address,
      promo_id: null,
      total: total,
      image: dataCart.image,
      price: dataCart.price,
      size: dataCart.size,
      qty: quantity,
    };
    console.log(data);
    dispatch(transactionActions.dataTransaction(data));
    // dispatch(cartAction.createTransactionThunk(data, token));
    navigation.navigate('Checkout');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>
          My <Text style={{ fontFamily: 'Poppins-Black' }}>Cart</Text>
        </Text>
      </View>
      {cartState.length !== 0 && (
        <>
          <View style={{ paddingTop: 40 }}>
            <View style={{ minHeight: 250 }}>
              <View style={styles.card}>
                <View
                  style={{
                    marginRight: 20,
                    backgroundColor: 'white',
                    width: width / 3,
                    padding: 10,
                    borderRadius: 30,
                  }}
                >
                  <Image source={{ uri: cartState.image }} style={styles.cardImage} />
                  <Text style={styles.cardPrice}>IDR {costing(cartState.price)}</Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>{cartState.name_product}</Text>
                  <View style={styles.quantity}>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => {
                        quantity !== 1 && setQuantity(quantity - 1);
                      }}
                    >
                      <IconComunity name={'window-minimize'} size={15} />
                    </Pressable>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <Pressable
                      style={styles.quantityBtn}
                      onPress={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      <Icons name={'plus'} size={10} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <Divider width={1} style={{ width: '100%', marginTop: 15 }} />
            <View style={{ paddingTop: 30 }}>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Item Total</Text>
                <Text style={styles.textPrice}>IDR {getItemTotal()}</Text>
              </View>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Size Cost</Text>
                <Text style={styles.textPrice}>IDR {getSizeCost()}</Text>
              </View>
              <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Tax</Text>
                <Text style={styles.textPrice}>IDR {getTaxCost()}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: 'black' }}>
                Total :
              </Text>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: 'black' }}>
                IDR {getTotal()}
              </Text>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 30 }}>
              <TouchableOpacity onPress={handleCheckout} activeOpacity={0.8}>
                <View
                  style={{
                    marginVertical: 15,
                    backgroundColor: '#FFBA33',
                    height: 70,
                    borderRadius: 20,
                    paddingLeft: 30,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                  }}
                >
                  <IconComunity name={'chevron-right'} size={25} style={{ color: 'black' }} />
                  <Text
                    style={{
                      paddingLeft: 55,
                      color: 'black',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                    }}
                  >
                    CHECKOUT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default Cart;
