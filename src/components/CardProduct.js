import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import styles from '../styles/CardProduct';
import { useNavigation } from '@react-navigation/native';
import authAction from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

// import Sample from "../assets/images/product.png"

const CardProduct = ({ image, name, price, id, index }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const costing = (price) => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate('ProductDetail', id);
        dispatch(authAction.route('ProductDetail'));
      }}
      key={index}
    >
      <View style={styles.containerImage}>
        <Image source={{ uri: image }} style={styles.imageCard} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardPrice}>{costing(price)}</Text>
      </View>
    </Pressable>
  );
};

export default CardProduct;
