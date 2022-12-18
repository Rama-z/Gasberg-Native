import React, { useEffect, useState } from 'react';

import styles from '../../styles/ProductAll';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sample from '../image/food4.png';

import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ToastAndroid,
  TextInput,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import productAction from '../../redux/actions/product';
import CardProduct from '../../components/CardProductAll';

function ProductAll() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector((state) => state.product);
  const productAll = useSelector((state) => state.product.productAll);
  console.log(product.productAll);
  const isLoading = useSelector((state) => state.product.isLoading);
  const isError = useSelector((state) => state.product.isError);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [inputSearch, setInput] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState('');
  const [limit, setLimit] = useState(20);
  const URLS = `${process.env.API_BACKEND_URL}/products?search=${inputSearch}&filter=${filter}&sort=${sort}&page=${page}&limit=${limit}`;

  useEffect(() => {
    dispatch(productAction.getAllProductThunk(URLS));
  }, []);

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
  }, [dispatch, inputSearch]);

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
        <Text style={styles.titleNavbar}>All Product</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Input Search Here..."
            value={search}
            placeholderTextColor={'#9F9F9F'}
            style={styles.input}
            onChangeText={(text) => {
              setSearch(text);
              setInput('');
            }}
          />
          <IconComunity
            name={inputSearch?.length === 0 || search?.length === 0 ? 'magnify' : 'window-close'}
            size={20}
            style={styles.icon}
            onPress={() => {
              search?.length !== 0 && setInput(search);
              if (search?.length !== 0 && inputSearch?.length !== 0) {
                setSearch('');
                setInput('');
              }
            }}
          />
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filter} onPress={() => setModalVisible(true)}>
          FILTER
        </Text>
      </View>
      {/* <ScrollView style={styles.scrolles}> */}
      <View>
        <View style={styles.containerCard}>
          {isLoading ? (
            <View style={styles.btnLoading}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : isError ? (
            <View>
              <Text>Product Not Found</Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={productAll}
                onEndReached={() => console.log('sukses')}
                renderItem={({ item }) => (
                  <View>
                    <CardProduct
                      name={item.menu}
                      image={item.image}
                      price={item.price}
                      id={item.id}
                      key={item.id}
                      index={item.id}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </View>
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
            <View style={{ position: 'absolute', right: 15, top: 15 }}>
              <IconComunity
                name={'window-close'}
                size={20}
                style={{ color: '#6f6f6f' }}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Text style={styles.titleFilter}>Category :</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: 180,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Text
                style={filter === 'food' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  filter === 'food' ? setFilter() : setFilter('food');
                }}
              >
                Food
              </Text>
              <Text
                style={filter === 'coffee' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  filter === 'coffee' ? setFilter() : setFilter('coffee');
                }}
              >
                Coffee
              </Text>
              <Text
                style={filter === 'nonCoffee' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  filter === 'nonCoffee' ? setFilter() : setFilter('nonCoffee');
                }}
              >
                Non Coffee
              </Text>
              <Text
                style={filter === '' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  setFilter('');
                }}
              >
                None
              </Text>
            </View>
            <Text style={styles.titleFilter}>Sort :</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text
                style={sort === 'newest' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  sort === 'newest' ? setSort() : setSort('newest');
                }}
              >
                Newest
              </Text>
              <Text
                style={sort === 'oldest' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  sort === 'oldest' ? setSort() : setSort('oldest');
                }}
              >
                Latest
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={sort === 'cheapest' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  sort === 'cheapest' ? setSort() : setSort('cheapest');
                }}
              >
                Cheapest
              </Text>
              <Text
                style={sort === 'priciest' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  sort === 'priciest' ? setSort() : setSort('priciest');
                }}
              >
                Priciest
              </Text>
            </View>
            <View>
              <Text
                style={sort === '' ? styles.buttonFilter : styles.button}
                onPress={() => {
                  setSort('');
                }}
              >
                None
              </Text>
            </View>
            <View>
              <Text
                style={styles.apply}
                onPress={() => {
                  console.log(URLS);
                  dispatch(productAction.getAllProductThunk(URLS));
                  setModalVisible(false);
                }}
              >
                Apply
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      {/* </ScrollView> */}
    </View>
  );
}

export default ProductAll;
