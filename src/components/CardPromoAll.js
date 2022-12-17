import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import styles from '../styles/CardProductAll';
import { useNavigation } from '@react-navigation/native';

const CardPromo = ({ image, name, price, id, index, discount }) => {
  const navigation = useNavigation();
  const discountPrice = (price * (100 - discount)) / 100;
  const costing = (price) => {
    return (
      'IDR ' +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    );
  };
  return (
    <>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate('ProductDetail', id);
        }}
        key={index}
      >
        <View style={styles.containerImage}>
          <Image source={{ uri: image }} style={styles.imageCard} />
          <View style={styles.containerPromo}>
            <Text style={styles.textPromo}>{discount}%</Text>
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardPrice}>{costing(price)}</Text>
          <Text style={styles.cardPrice2}>{costing(discountPrice)}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default CardPromo;
