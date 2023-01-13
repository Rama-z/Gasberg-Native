import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/Login';
import Input from '../../components/Input';
import google from '../../assets/images/google.png';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import authAction from '../../redux/actions/auth';

function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    pass: '',
  });
  const auth = useSelector((state) => state.auth);
  const onChangeHandler = (text, type) => {
    setForm((form) => ({ ...form, [type]: text }));
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const success = () => {
      ToastAndroid.showWithGravity(`Login successfully`, ToastAndroid.SHORT, ToastAndroid.TOP);
      navigation.navigate('Product');
    };
    const failed = () => {
      ToastAndroid.showWithGravity(`Login error`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(authAction.loginThunk(form, success, failed));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgLogin.png')}
        resizeMode="cover"
        style={styles.bg}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Input
            value={form.email}
            handler={onChangeHandler}
            placeholder="Enter your email address"
            isPassword={false}
            text={'email'}
          />
          <Input
            value={form.pass}
            handler={onChangeHandler}
            placeholder="Enter your password"
            isPassword={true}
            text={'pass'}
          />
          <Text style={styles.forgot}>Forgot Password?</Text>
          <TouchableOpacity style={styles.createBtn} onPress={loginHandler}>
            {auth.isLoading ? (
              <View style={styles.btnLoading}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : (
              <Text style={styles.textCreate}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleBtn}>
            <View style={styles.googleContainer}>
              <Image source={google} />
              <Text style={styles.textGoogle}>Create with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Login;
