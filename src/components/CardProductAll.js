import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import styles from '../styles/CardProductAll';
import { useNavigation } from '@react-navigation/native';

// import Sample from "../assets/images/product.png"

const CardProduct = ({ image, name, price, id, index }) => {
  const navigation = useNavigation();
  const random = Math.floor(100000 + Math.random() * 900000);
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
      }}
    >
      <View style={styles.containerImage} key={random}>
        <Image source={{ uri: image }} style={styles.imageCard} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardPrice2}>{costing(price)}</Text>
      </View>
    </Pressable>
  );
};

export default CardProduct;
