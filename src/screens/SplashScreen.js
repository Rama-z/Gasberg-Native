import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { View, Text, ImageBackground } from 'react-native';
import styles from '../styles/SplashScreen';
import splash from '../assets/images/splash-coffee.jpg';
import { useDispatch, useSelector } from 'react-redux';
import userAction from '../redux/actions/user';

function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const splashSuccess = () => {
      navigation.dispatch(StackActions.replace('Product'));
    };
    const splashFailed = () => {
      navigation.dispatch(StackActions.replace('Welcome'));
    };
    dispatch(userAction.getUserThunk(auth.userData.token, splashSuccess, splashFailed));
  }, [navigation, userAction]);
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
