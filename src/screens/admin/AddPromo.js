import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TextInput, ToastAndroid } from 'react-native';
import ButtonOpacity from '../../components/ButtonOpacity';
import styles from '../../styles/AddPromo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import camera from '../../assets/images/camera.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import promoActions from '../../redux/actions/promo';

function NewPromo() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [body, setBody] = useState({});
  const [file, setFile] = useState();
  const token = useSelector((state) => state.auth.userData.token);

  const changeHandler = (text, name) => {
    setBody((body) => ({ ...body, [name]: text }));
  };

  const createPromoHandler = () => {
    const success = (id) => {
      ToastAndroid.showWithGravityAndOffset(
        `Product Created`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
      console.log(id);
      navigation.navigate('Product');
    };
    const error = (error) => {
      ToastAndroid.showWithGravityAndOffset(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
    };
    let bodies = new FormData();
    file &&
      bodies.append('image', {
        name: 'test.' + file[0]?.type?.substr(6),
        type: file[0]?.type,
        uri: Platform.OS !== 'android' ? 'file://' + file[0]?.uri : file[0]?.uri,
      });
    body.codes && bodies.append('codes', body.codes);
    body.discount && bodies.append('discount', body.discount);
    body.valid_date && bodies.append('valid_date', body.valid_date);
    body.menu_id && bodies.append('menu_id', body.menu_id);
    // body.description && bodies.append('description', body.description);
    // body.minPrice && bodies.append('min_price', body.minPrice);
    console.log(bodies);
    console.log(body);

    dispatch(promoActions.createPromoThunk(bodies, token, success, error));
  };

  let cameraLauncher = () => {
    let options = {
      storageOptions: {
        saveToPhotos: true,
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.errorMessage) {
        console.log(response);
        return ToastAndroid.showWithGravityAndOffset(
          `Do not have access to open the camera`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50
        );
      }
      setFile(response.assets);
    });
  };

  let libraryLauncher = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.errorMessage) {
        return ToastAndroid.showWithGravityAndOffset(
          `Do not have access to open the library`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50
        );
      }
      setFile(response.assets);
    });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.all_container}>
          <View></View>
          <View style={styles.container_up}>
            <Image style={styles.image} source={file ? { uri: file[0].uri } : camera} />
            <ButtonOpacity
              color={'#000000'}
              text="Open Camera"
              radius={13}
              colorText="white"
              height={40}
              width={'60%'}
              marginBottom={10}
              marginTop={20}
              onPressHandler={{
                onPress: cameraLauncher,
              }}
            />
            <ButtonOpacity
              color={'#000000'}
              text="Open Gallery"
              radius={13}
              colorText="white"
              height={40}
              width={'60%'}
              marginBottom={10}
              marginTop={20}
              onPressHandler={{
                onPress: libraryLauncher,
              }}
            />
          </View>
          <View>
            <Text style={styles.text}>Code</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type promo name min. 30 characters"
              keyboardType="none"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(text, 'codes')}
            />
            <Text style={styles.text}>Discount</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type Discount Percentage"
              keyboardType="numeric"
              placeholderTextColor="#9F9F9F"
              onChangeText={(num) => changeHandler(parseInt(num) / 100, 'discount')}
            />
            <Text style={styles.text}>Menu Id</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type Promo Code"
              keyboardType="none"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(text, 'menu_id')}
            />
            <Text style={styles.text}>Valid Date</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type Promo Durations"
              keyboardType="numeric"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(text, 'valid_date')}
            />
          </View>
          <View>
            <ButtonOpacity
              color={'#6A4029'}
              text="Create Promo"
              radius={20}
              colorText="white"
              height={70}
              width={'100%'}
              marginBottom={10}
              marginTop={20}
              // onPress={postRegister}
              onPressHandler={{
                onPress: createPromoHandler,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default NewPromo;
