import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import bg from '../assets/images/bgHome.png';
import styles from '../styles/Home';
import { useDispatch, useSelector } from 'react-redux';
import userAction from '../redux/actions/user';
import authAction from '../redux/actions/auth';

function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userData.token);

  const logoutHandler = () => {
    const success = () => {
      ToastAndroid.showWithGravity('Logout Success', ToastAndroid.TOP, ToastAndroid.SHORT);
    };
    const failed = () => {
      ToastAndroid.showWithGravity('Logout Failed', ToastAndroid.TOP, ToastAndroid.SHORT);
    };
    dispatch(authAction.logoutThunk(token, success, failed));
    navigation.navigate('Home');
  };

  useEffect(() => {
    const success = () => {
      ToastAndroid.showWithGravity(`Success`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(userAction.getUserThunk(token, success));
  }, [userAction]);
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.text}>Get a cup of coffee for free every sunday morning</Text>
          {!token ? (
            <View>
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => {
                  navigation.navigate('Signup');
                }}
              >
                <Text style={styles.textStart}>Create New Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.textLogin}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => {
                  navigation.navigate('Product');
                }}
              >
                <Text style={styles.textStart}>Create Your Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={logoutHandler}>
                <Text style={styles.textLogin}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

export default Home;
