import React, { useState, useCallback } from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Pressable,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Payment';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@rneui/themed';
// import Sample from '../image/Hazel.png';

import { useDispatch, useSelector } from 'react-redux';
import cartAction from '../../redux/actions/transaction';
import axios from 'axios';
import transactionActions from '../../redux/actions/transaction';
import PushNotification from 'react-native-push-notification';

function Payment() {
  const [Payment, setPayment] = useState();
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.transaction.cart);
  const transaction = useSelector((state) => state.transaction);
  console.log(transaction);
  const token = useSelector((state) => state.auth.userData.token);
  const total = useSelector((state) => state.transaction.total);

  const handleShowNotification = (msg) => {
    PushNotification.localNotification({
      channelId: 'local-notification',
      title: 'Grassberg Coffee',
      message: msg,
    });
  };

  const sizes = () => {
    let sizer = 'Reguler';
    if (cartState.size == '2') sizer = 'Large';
    if (cartState.size == '3') sizer = 'XL';
    return sizer;
  };

  const handlePress = () => {
    if (isLoading) return;
    if (!Payment)
      return ToastAndroid.showWithGravityAndOffset(
        `Select Payment Method !`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
    setLoading(true);
    const BaseUrl = `${process.env.API_BACKEND_URL}${transaction.transaction_id}`;
    const success = () => {
      ToastAndroid.showWithGravityAndOffset(
        `Success Create Transaction`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
      navigation.navigate('Product');
      handleShowNotification('Transaction Success');
    };
    const failed = () => {
      ToastAndroid.showWithGravityAndOffset(
        `System Error`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
    };
    const sendBody = {
      product_id: cartState.id,
      payment_id: Payment,
      delivery_address: cartState.delivery_address,
      total: transaction.total,
      // status: 'Paid',
    };
    dispatch(transactionActions.createTransactionThunk(sendBody, token, success, failed));
    // axios
    //   .patch(BaseUrl, sendBody, { headers: { 'x-access-token': token } })
    //   .then((result) => {
    //     setLoading(false);
    //     // if (Payment === '1') {
    //     //   Linking.openURL(result.data.redirctUrl);
    //     // }
    //     ToastAndroid.showWithGravityAndOffset(
    //       `Success Create Transaction`,
    //       ToastAndroid.SHORT,
    //       ToastAndroid.TOP,
    //       25,
    //       50
    //     );
    //     dispatch(cartAction.deleteCartFulfilled());
    //     navigation.navigate('Home');
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log('error', error);
    //     ToastAndroid.showWithGravityAndOffset(
    //       `System Error`,
    //       ToastAndroid.SHORT,
    //       ToastAndroid.TOP,
    //       25,
    //       50
    //     );
    //   });
  };

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
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
        <Text style={styles.titleNavbar}>Payment</Text>
      </View>
      <View style={{ paddingTop: 30 }}>
        <Text style={styles.TitleProduct}>Products</Text>
        <View style={styles.Containercard}>
          <View style={styles.card}>
            <View>
              <Image source={{ uri: cartState.image }} style={styles.imageCard} />
            </View>
            <View style={{ marginHorizontal: 15, minWidth: 100, maxWidth: 80 }}>
              <Text style={styles.Title}>{cartState.name_product}</Text>
              <Text style={styles.Title}>x {cartState.qty}</Text>
              <Text style={styles.Title}>{sizes()}</Text>
            </View>
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.price}>IDR {costing(cartState.price)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.TitleProduct}>Payment method</Text>
        <View style={styles.CardMethods}>
          <View>
            <View style={styles.radio}>
              <Pressable
                style={Payment === '1' ? styles.checkedOuter : styles.unchekedOuter}
                onPress={() => {
                  setPayment('1');
                }}
              >
                <View style={Payment === '1' ? styles.checkedInner : undefined}></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={Payment === '2' ? styles.checkedOuter : styles.unchekedOuter}
                onPress={() => {
                  setPayment('2');
                }}
              >
                <View style={Payment === '2' ? styles.checkedInner : undefined}></View>
              </Pressable>
            </View>
            <View style={styles.radio}>
              <Pressable
                style={Payment === '3' ? styles.checkedOuter : styles.unchekedOuter}
                onPress={() => {
                  setPayment('3');
                }}
              >
                <View style={Payment === '3' ? styles.checkedInner : undefined}></View>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={styles.methodList}>
              <View style={styles.methodCard}>
                <IconComunity name={'card-bulleted-outline'} style={styles.cardIcon} size={20} />
              </View>
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setPayment('1');
                }}
              >
                Card
              </Text>
            </View>
            <Divider width={1} style={{ width: '100%', marginTop: 5, marginBottom: 3.5 }} />
            <View style={styles.methodList}>
              <View style={styles.methodBank}>
                <IconComunity name={'bank'} style={styles.cardIcon} size={20} />
              </View>
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setPayment('2');
                }}
              >
                Bank account
              </Text>
            </View>
            <Divider width={1} style={{ width: '100%', marginTop: 5, marginBottom: 3.5 }} />
            <View style={styles.methodList}>
              <View style={styles.methodCod}>
                <IconComunity name={'truck-fast'} style={{ color: 'black' }} size={20} />
              </View>
              <Text
                style={styles.textMethod}
                onPress={() => {
                  setPayment('3');
                }}
              >
                Cash on delivery
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 20,
            alignItems: 'center',
          }}
        >
          <Text style={styles.totals}>Total</Text>
          <Text style={styles.prices}>IDR {costing(total)}</Text>
        </View>
        <View style={{ paddingBottom: 30 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handlePress();
            }}
          >
            <View
              style={{
                marginBottom: 20,
                backgroundColor: '#6A4029',
                height: 70,
                borderRadius: 20,
                paddingLeft: 30,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="white" style={{ marginLeft: 120 }} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Bold',
                    fontSize: 16,
                    paddingLeft: 35,
                  }}
                >
                  Proceed payment
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Payment;
