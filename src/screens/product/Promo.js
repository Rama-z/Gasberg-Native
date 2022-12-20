import React, { useEffect, useState } from 'react';

import styles from '../../styles/Favorite';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';

import { View, Image, ScrollView, Text, Pressable, ToastAndroid } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import productAction from '../../redux/actions/product';
import CardPromo from '../../components/CardPromoAll';

function Promo() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector((state) => state.product);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState('');
  const [limit, setLimit] = useState('');
  const [promo, setPromo] = useState(true);
  const URLS = `${process.env.API_BACKEND_URL}/products?search=${search}&filter=${filter}&sort=${sort}&page=${page}&limit=${limit}`;
  const URLPromo = `${process.env.API_BACKEND_URL}/products?search=${search}&filter=${filter}&sort=${sort}&page=${page}&limit=${limit}&promo=${promo}`;

  const costing = (price) => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };

  useEffect(() => {
    const getAllSuccess = () => {
      ToastAndroid.showWithGravity('Get Product Success', ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    const getAllFailed = () => {
      ToastAndroid.showWithGravity('Get Product Failed', ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(productAction.getAllProductThunk(URLS, getAllSuccess, getAllFailed));
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
    <View style={{ flex: 1 }}>
      <View style={styles.navbar}>
        <IconComunity
          name={'chevron-left'}
          size={20}
          style={styles.icons}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.titleNavbar}>Promo Products</Text>
      </View>
      <ScrollView style={styles.scrolles}>
        <View>
          <Text style={styles.category}>Promo for Everyone</Text>
          <View style={styles.containerCard}>
            {product.promo.map((data, idx) => {
              {
                return (
                  <View key={idx}>
                    <CardPromo
                      image={data.image}
                      name={data.menu}
                      price={data.price}
                      id={data.id}
                      key={data.id}
                      discount={data.discount}
                      index={idx}
                    />
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Promo;
