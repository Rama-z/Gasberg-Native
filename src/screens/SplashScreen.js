import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { View, Text, ImageBackground } from 'react-native';
import styles from '../styles/SplashScreen';
import splash from '../assets/images/splash-coffee.jpg';

function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Welcome'));
      // navigation.navigate('Welcome')
    }, 2500);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground source={splash} resizeMode="cover" style={styles.bg}>
        <Text style={styles.mainText}>Grasberg Coffee</Text>
        <Text style={styles.thirdText}>Developed by</Text>
        <Text style={styles.thirdText}>Capriconous a.k.a Zanuar Bagus Ramadhan</Text>
      </ImageBackground>
    </View>
  );
}

export default SplashScreen;
