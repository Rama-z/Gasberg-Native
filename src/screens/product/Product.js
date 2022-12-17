import React, { useEffect, useState } from 'react';

import styles from '../../styles/HomePage';
import Navbar from '../../components/Navbar';
import Card from '../../components/CardProduct';
import CardPromo from '../../components/CardPromo';
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
  const promos = useSelector((state) => state.product);
  const isPending = useSelector((state) => state.product.isLoading);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState('');
  const [limit, setLimit] = useState(20);
  const [promo, setPromo] = useState('promo');
  // const profile = useSelector(state => state.profile.profile);
  const URLS = `${process.env.API_BACKEND_URL}/products?search=${search}&filter=${filter}&sort=${sort}&page=${page}&limit=${limit}`;
  const URLPromo = `${process.env.API_BACKEND_URL}/products?search=${search}&filter=${filter}&sort=${sort}&page=${page}&limit=${limit}&promo=${promo}`;

  useEffect(() => {
    const success = () => {
      ToastAndroid.showWithGravity(`Login successfully`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    const failed = () => {
      ToastAndroid.showWithGravity(`Login error`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(productAction.getProductThunk(success, failed));
  }, [dispatch]);

  useEffect(() => {
    const getAllSuccess = () => {
      ToastAndroid.showWithGravity('Get Product Success', ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    const getAllFailed = () => {
      ToastAndroid.showWithGravity('Get Product Failed', ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(productAction.getAllPromoThunk(URLPromo, getAllSuccess, getAllFailed));
  }, [dispatch]);

  return (
    <View style={styles.sectionContainer}>
      <Navbar>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>A good coffee is a good day</Text>
          <Text style={styles.category}>Favorite Products</Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('Favorite');
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
                {products.map((e, idx) => {
                  return <Card name={e.menu} price={e.price} image={e.image} id={e.id} key={idx} />;
                })}
              </ScrollView>
            )
          )}
          <Text style={styles.category}>Promo for you</Text>
          <Text
            style={styles.see}
            onPress={() => {
              navigation.navigate('Promo');
            }}
          >
            See more
          </Text>

          {isPending ? (
            <View style={styles.btnLoading}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            promos.promo.length > 0 &&
            !isPending && (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ height: height / 2 }}
              >
                {promos.promo.map((e, idx) => {
                  return (
                    <CardPromo
                      name={e.menu}
                      price={e.price}
                      image={e.image}
                      id={e.id}
                      discount={e.discount}
                      key={idx}
                    />
                  );
                })}
              </ScrollView>
            )
          )}
        </ScrollView>
      </Navbar>
    </View>
  );
};

export default Product;
