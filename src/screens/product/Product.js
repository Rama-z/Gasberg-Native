import React, { useEffect, useRef, useState } from 'react';

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
  BackHandler,
  Alert,
} from 'react-native';
import {
  useNavigation,
  NavigationContainer,
  useNavigationContainerRef,
  useRoute,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import productAction from '../../redux/actions/product';
import authAction from '../../redux/actions/auth';

const Product = ({ route }) => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const router = useRoute();
  const products = useSelector((state) => state.product.product);
  const promos = useSelector((state) => state.product);
  const isPending = useSelector((state) => state.product.isLoading);
  const auth = useSelector((state) => state.auth);
  const routeName = router.name;
  const screenName = useSelector((state) => state.auth.screenName);
  console.log(screenName);
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
    const listener = navigation.addListener('focus', () => {
      dispatch(authAction.route('Product'));
      dispatch(productAction.getProductThunk());
    });
    return () => listener();
  }, [dispatch]);

  useEffect(() => {
    const getAllSuccess = () => {
      ToastAndroid.showWithGravity(
        'Swipe right to open navigation',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    };
    const getAllFailed = () => {
      ToastAndroid.showWithGravity('Get Product Failed', ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(productAction.getAllPromoThunk(URLPromo, getAllSuccess, getAllFailed));
  }, [dispatch]);

  useEffect(() => {
    const onBackPress = () => {
      const screenNames = screenName;
      console.log(screenNames);
      if (screenNames == 'Product') {
        Alert.alert(
          'Exit App',
          'Are you sure want to exit from the application?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          {
            cancelable: false,
          }
        );
        return true;
      }
      return;
    };
    const backPress = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backPress.remove();
  }, [navigation]);

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
              dispatch(authAction.route('Favorite'));
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
              dispatch(authAction.route('Promo'));
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
