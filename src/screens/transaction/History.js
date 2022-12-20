import React, { useEffect, useState } from 'react';
import styles from '../../styles/History';
import stylesModal from '../../styles/StyleNavbar';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import ViewOverflow from 'react-native-view-overflow';

import {
  View,
  Image,
  ToastAndroid,
  Text,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Animated from 'react-native-reanimated';
const SCREEN_WIDTH = Dimensions.get('window').width;

function History() {
  const [modalVisible, setModalVisible] = useState();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth.userData);
  const transaction = useSelector((state) => state.transaction);
  const token = useSelector((state) => state.auth.userData.token);
  const dispatch = useDispatch();
  const [sort, setSort] = useState('');
  const [page, setPage] = useState('');
  const [limit, setLimit] = useState(5);
  const [history, setHistory] = useState([]);
  const [meta, setMeta] = useState([]);
  const URLS = `${process.env.API_BACKEND_URL}/transactions?sort=${sort}&page=${page}&limit=${limit}`;

  const config = (token) => {
    return {
      headers: {
        'x-access-token': `${token}`,
      },
    };
  };

  const getHistory = () => {
    axios.get(URLS, config(token)).then((res) => {
      console.log(res);
      setHistory(res.data.data);
      setMeta(res.data.meta.totalData);
    });
  };

  const loadMoreItem = () => {
    setLimit(limit + 4);
  };

  const leftSwipe = (index, id) => {
    return (
      <TouchableOpacity onPress={() => deleteItem(index, id)} activeOpacity={0.6}>
        <View style={styles2.deleteBox}>
          <Animated.Text style={{ transform: [{ scale: 0.9 }], fontSize: 20, fontStyle: 'bold' }}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <Swipeable renderRightActions={() => leftSwipe(index, item.id)}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ paddingLeft: 25, paddingRight: 25, marginVertical: 10 }}
          onLongPress={() => {
            setModalVisible(item.transaction_id);
          }}
          delayLongPress={10}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: width / 1.15,
              display: 'flex',
              borderRadius: 20,
              flexDirection: 'row',
              padding: 15,
            }}
          >
            <View>
              <Image source={{ uri: item.image }} style={styles.imageCard} />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.cardTitle}>{item.menu}</Text>
              <Text style={styles.cardPrice}>IDR {costing(item.total)}</Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
              <Text style={styles.cardStatus}>Promo Code: {item.codes}</Text>
            </View>
            <Modal
              visible={modalVisible === item.id ? true : false}
              transparent={true}
              onRequestClose={() => {
                setModalVisible();
              }}
            >
              <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                  <Text style={stylesModal.modalText}>Are you sure want to delete this items?</Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Pressable
                      style={[stylesModal.button, stylesModal.buttonClose]}
                      onPress={() => setModalVisible()}
                    >
                      <Text style={stylesModal.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[stylesModal.button, stylesModal.buttonClose]}
                      onPress={() => {
                        deleteItems(item.id);
                      }}
                    >
                      {transaction.isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={stylesModal.textStyle}>Delete</Text>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const renderLoader = () => {
    if (history.length != meta) {
      return (
        <View style={styles.btnLoading}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      );
    }
    return;
  };

  useEffect(() => {
    getHistory();
    const focusEvent = navigation.addListener('focus', () => {
      setLimit(5);
    });
    const blurEvent = navigation.addListener('blur', (e) => {
      setHistory([]);
    });
    return () => {
      focusEvent();
      blurEvent();
    };
  }, [dispatch, limit]);

  const costing = (price) => {
    return parseFloat(price)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const deleteItem = (index, id) => {
    const arr = [...history];
    arr.splice(index, 1);
    setHistory(arr);
    const deleteURL = `${process.env.API_BACKEND_URL}/transactions/${id}`;
    const body = { deleted_at: 'now()' };
    axios
      .patch(deleteURL, body, config(token))
      .then((res) => {
        ToastAndroid.showWithGravity(
          'Transaction history deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.showWithGravity(
          'Failed to delete transaction history',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      });
  };

  return (
    <View style={styles.container}>
      {transaction.history?.length >= 0 && (
        <>
          <View style={{ padding: 30 }}>
            <IconComunity
              name={'chevron-left'}
              size={20}
              style={styles.icons}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.title}>Order History</Text>
            <View style={styles.swipe}>
              <IconComunity name={'gesture-swipe-left'} size={20} />
              <Text style={styles.swipeText}>Swipe item to delete</Text>
            </View>
          </View>
          {transaction.isLoading && transaction.history?.length === 0 ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <FlatList
              data={history}
              renderItem={renderItem}
              onEndReached={loadMoreItem}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderLoader}
            />
          )}
        </>
      )}
      {transaction.err === 'data_not_found' && transaction.history?.length === 0 && (
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <IconComunity
              name={'chevron-left'}
              size={20}
              style={styles.icons}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              style={{ fontFamily: 'Poppins-Black', color: 'black', fontSize: 18, paddingLeft: 10 }}
            >
              History
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <IconComunity name="clipboard-text-outline" size={170} style={{ color: '#C7C7C7' }} />
            <Text style={{ fontFamily: 'Poppins-Black', color: 'black', fontSize: 28 }}>
              No History yet
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                width: '80%',
                textAlign: 'center',
              }}
            >
              Hit the orange button down below to Create an order
            </Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <View
                style={{
                  marginVertical: 15,
                  backgroundColor: '#6A4029',
                  height: 70,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                }}
              >
                <Text style={{ color: '#F6F6F9', fontFamily: 'Poppins-Black', fontSize: 17 }}>
                  Start odering
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default History;

const styles2 = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    // padding: 16,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 25,
    marginRight: 15,
  },
});
