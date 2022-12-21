import React, { useEffect, useState } from 'react';

import styles from '../../styles/ProductDetail';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Sample from '../../assets/images/product.png';
// import ButtonCustom from '../../components/FancyButton';

import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ToastAndroid,
  Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import transactionActions from '../../redux/actions/transaction';

function ProductDetail(props) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const product_id = props.route.params;
  const { id } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState();
  const [sizes, setSize] = useState('1');

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.transaction);

  useEffect(() => {
    const BaseUrl = process.env.API_BACKEND_URL;
    const productId = product_id ? product_id : id;
    axios
      .get(`${BaseUrl}/products/${productId}`)
      .then((result) => {
        setProduct(result.data.data);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(
          `Error`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50
        );
        navigation.goBack();
      });
  }, [axios]);

  const CartHandler = () => {
    if (!sizes) {
      return ToastAndroid.showWithGravityAndOffset(
        `Please Select a size`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
    }
    // if (!modalVisible) return setModalVisible(true);
    const data = {
      id: product.id,
      productName: product.menu,
      price: product.price,
      image: product.image,
      qty: null,
      size: sizes,
    };
    dispatch(transactionActions.dataTransaction(data));
    return ToastAndroid.showWithGravityAndOffset(
      `Added Product To Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
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
          name="chevron-left"
          size={22}
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <IconComunity
          name="cart-outline"
          size={22}
          style={styles.icon}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
        {/* {cartState.cart.length !== 0 && (
          <View style={styles.notif}>
            <Text style={styles.textNotif}>1</Text>
          </View>
        )} */}
      </View>
      <View style={styles.main}>
        <View style={styles.price}>
          {product?.discount ? (
            <>
              <Text style={styles.strip}> {product ? costing(product?.price) : ''} </Text>
              <Text style={styles.priceTextDisount}>
                {product
                  ? costing((parseInt(product?.discount) / 100) * parseInt(product?.price))
                  : ''}
              </Text>
            </>
          ) : (
            <Text style={styles.priceText}>{product ? costing(product?.price) : ''}</Text>
          )}
        </View>
        <View style={styles.top}>
          <Image source={{ uri: product?.image }} style={styles.product} />
          <Text style={styles.Title}>{product?.menu}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.firstText}>
            Delivery only on{' '}
            <Text style={{ color: '#6A4029', fontFamily: 'Poppins-Bold' }}>Monday to friday </Text>{' '}
            at <Text style={{ color: '#6A4029', fontFamily: 'Poppins-Bold' }}>1 - 7 pm</Text>
          </Text>
          <Text style={styles.description}>{product?.description}</Text>
          <Text style={styles.sizeText}> Choose a size</Text>
          <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <Pressable
              style={sizes === '1' ? styles.selected : styles.button}
              onPress={() => {
                setSize('1');
              }}
            >
              <Text style={sizes === '1' ? styles.selectedText : styles.buttonText}>R</Text>
            </Pressable>
            <Pressable
              style={sizes === '2' ? styles.selected : styles.button}
              onPress={() => {
                setSize('2');
              }}
            >
              <Text style={sizes === '2' ? styles.selectedText : styles.buttonText}>L</Text>
            </Pressable>
            <Pressable
              style={sizes === '3' ? styles.selected : styles.button}
              onPress={() => {
                setSize('3');
              }}
            >
              <Text style={sizes === '3' ? styles.selectedText : styles.buttonText}>XL</Text>
            </Pressable>
          </View>
          <View style={{ width: width, paddingBottom: 30 }}>
            {/* <ButtonCustom text={"Add to cart"} textColor={"white"} color={"#6A4029"}/> */}
            <TouchableOpacity onPress={CartHandler} activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: '#6A4029',
                  height: 70,
                  width: width / 1.2,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 17 }}>
                  Add to cart
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Cart already has one product, are you sure you want to change it?
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      CartHandler();
                      setModalVisible(false);
                      return ToastAndroid.showWithGravityAndOffset(
                        `Added Product To Cart`,
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        25,
                        50
                      );
                    }}
                    style={[styles.buttonModal, styles.buttonClose]}
                  >
                    <Text style={styles.textStyle}>Continue</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductDetail;
