import { View, Text, ImageBackground, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';

import bg from '../../assets/images/bgSignup.png';
import google from '../../assets/images/google.png';
import styles from '../../styles/Signup';
import Input from '../../components/Input';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import authAction from '../../redux/actions/auth';

function Signup() {
  const [form, setForm] = useState({
    email: '',
    pass: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onChangeHandler = (text, type) => {
    setForm((form) => ({ ...form, [type]: text }));
  };
  console.log(form);
  const registHandler = (e) => {
    e.preventDefault();
    const success = () => {
      ToastAndroid.showWithGravity(
        `Congrats, register successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      navigation.navigate('Login');
    };
    const failed = (error) => {
      ToastAndroid.showWithGravity(`${error}`, ToastAndroid.SHORT, ToastAndroid.TOP);
    };
    dispatch(authAction.registerThunk(form, success, failed));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
          <Input
            value={form.email}
            handler={onChangeHandler}
            placeholder="Enter your email adress"
            isPassword={false}
            text={'email'}
          />
          <Input
            value={form.pass}
            handler={onChangeHandler}
            placeholder="Enter your password"
            isPassword
            text={'pass'}
          />
          <Input
            value={form.phone}
            handler={onChangeHandler}
            placeholder="Enter your phone number"
            isPassword={false}
            text={'phone'}
          />
          <TouchableOpacity style={styles.createBtn} onPress={registHandler}>
            <Text style={styles.textCreate}>Create Account</Text>
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

export default Signup;
