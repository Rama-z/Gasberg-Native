import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import styles from '../styles/CardProduct';
import { useNavigation } from '@react-navigation/native';

// import Sample from "../assets/images/product.png"

const CardProduct = ({ img, name, price, id }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate('ProductDetail', id);
      }}
    >
      <View style={styles.containerImage}>
        <Image source={{ uri: img }} style={styles.imageCard} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardPrice}>{`Rp ${price}`}</Text>
      </View>
    </Pressable>
  );
};

export default CardProduct;
