import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userAction from '../../redux/actions/user';

import styles from '../../styles/Profile';
import DefaultImg from '../../assets/images/default-img.png';

import back from '../../assets/images/iconBack.png';
import next from '../../assets/images/arrowRight.png';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const auth = useSelector((state) => state.auth.userData);

  const toOerderHistory = () => {
    navigation.navigate('Order History');
  };

  useEffect(() => {
    dispatch(userAction.getUserThunk(auth.token));
  }, [dispatch, auth.token]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.containerContent}>
        <Text style={styles.titleContent}>My profile</Text>
        <View style={styles.subTitle}>
          <Text style={styles.textInfo}>Your Information</Text>
          <TouchableOpacity>
            <Text style={styles.btnEdit}>edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperProfile}>
          <View style={styles.contentImage}>
            <View style={{ width: 80, height: 80, borderRadius: 200 }}>
              {profile.isLoading ? (
                <ActivityIndicator />
              ) : (
                <Image
                  source={{
                    uri: profile.image !== null ? profile.image : DefaultImg,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 200 }}
                />
              )}
            </View>
          </View>
          <View>
            <Text style={styles.textName}>{profile.display_name}</Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                width: 160,
                borderBottomColor: '#6A4029',
                marginBottom: 10,
              }}
            >
              <Text style={styles.textEmail}>{profile.email}</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                width: 160,
                borderBottomColor: '#6A4029',
                marginBottom: 10,
              }}
            >
              <Text style={styles.textPhone}>{`+62 ${profile.phone}`}</Text>
            </View>
            <Text style={styles.address}>{profile.address}</Text>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <TouchableOpacity style={styles.btn} onPress={toOerderHistory}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}
            >
              Order History
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}
            >
              Edit password
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}
            >
              FAQ
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontWeight: 'bold',
                fontSize: 18,
                color: '#000',
              }}
            >
              Help
            </Text>
            <Image source={next} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
                color: '#fff',
              }}
            >
              Save Change
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
