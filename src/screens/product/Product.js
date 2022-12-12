import React, { useEffect, useState } from 'react';

import styles from '../../styles/HomePage';
import Navbar from '../../components/Navbar';
import Card from '../../components/CardProduct';
import Sample from '../../assets/images/product.png';

import {
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  LinearLayout,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import productAction from '../../redux/actions/product';

const Product = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);
  const isPending = useSelector((state) => state.product.isLoading);
  // const profile = useSelector(state => state.profile.profile);
  // console.log(products)
  useEffect(() => {
    const success = () => {
      ToastAndroid.showWithGravity(`Login successfully`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    const failed = () => {
      ToastAndroid.showWithGravity(`Login error`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(productAction.getProductThunk(success, failed));
  }, [dispatch]);
  return (
    <View style={styles.sectionContainer}>
      <Navbar>
        <ScrollView style={styles.container}>
          {/* <Text style={styles.title}>A good coffee is a good day</Text> */}
          <Text style={styles.category}>Favorite Products</Text>
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
                  return <Card name={e.menu} price={e.price} img={e.image} id={e.id} key={e.id} />;
                })}
              </ScrollView>
            )
          )}

          <Text style={styles.category}>Promo for you</Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('ScreenPromo');
            }}
          >
            See more
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ height: height / 2 }}
          >
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
            <Pressable style={styles.card}>
              <View style={styles.containerImage}>
                <Image source={Sample} style={styles.imageCard} />
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.cardTitle}>Hazelnut Latte</Text>
                <Text style={styles.cardPrice}>IDR 25.000</Text>
              </View>
            </Pressable>
          </ScrollView>
        </ScrollView>
      </Navbar>
    </View>
  );
};

export default Product;
