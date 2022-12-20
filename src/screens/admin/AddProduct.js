import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TextInput, ToastAndroid } from 'react-native';
import ButtonOpacity from '../../components/ButtonOpacity';
import styles from '../../styles/AddProduct';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import camera from '../../assets/images/camera.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import productActions from '../../redux/actions/product';

function NewProduct() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [body, setBody] = useState({});
  const [file, setFile] = useState();
  const token = useSelector((state) => state.auth.userData.token);

  const changeHandler = (text, name) => {
    setBody((body) => ({ ...body, [name]: text }));
  };

  const createProductHandler = () => {
    const success = (id) => {
      ToastAndroid.showWithGravityAndOffset(
        `Product Created`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
      navigation.navigate('ProductDetail', id);
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
    body.productName && bodies.append('menu', body.productName);
    body.price && bodies.append('price', body.price);
    body.description && bodies.append('description', body.description);
    body.categoryId && bodies.append('varian_id', body.categoryId);
    body.promo_id && bodies.append('promo_id', body.promo_id);

    dispatch(productActions.createProductThunk(bodies, token, success, error));
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
              // onPress={postRegister}
              onPressHandler={{
                onPress: libraryLauncher,
              }}
            />
          </View>
          <View>
            <Text style={styles.text}>Product Name</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type product name min. 30 characters"
              keyboardType="none"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(text, 'productName')}
            />
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type product price"
              keyboardType="numeric"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(parseInt(text), 'price')}
            />
            <Text style={styles.text}>Category</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Type Category id"
              keyboardType="numeric"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(parseInt(text), 'categoryId')}
            />
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Describe your product max. 150 characters"
              keyboardType="none"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(text, 'description')}
            />
            <Text style={styles.text}>Promo Id</Text>
            <TextInput
              style={styles.input_bottom}
              placeholder="Promo id you want to use"
              keyboardType="none"
              placeholderTextColor="#9F9F9F"
              onChangeText={(text) => changeHandler(text, 'promo_id')}
            />
          </View>
          <View>
            <ButtonOpacity
              color={'#6A4029'}
              text="Create Product"
              radius={20}
              colorText="white"
              height={70}
              width={'100%'}
              marginBottom={10}
              marginTop={20}
              // onPress={postRegister}
              onPressHandler={{
                onPress: createProductHandler,
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                right: 15,
                top: 15,
              }}>
              <IconComunity
                name="window-close"
                size={50}
                style={styles.icons}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <Pressable
              style={{
                marginTop: 20,
                marginBottom: 15,
                padding: 10,
                backgroundColor: '#DCDCDC',
              }}
              onPress={() => {
                launchCameras();
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Black',
                  color: '#868686',
                  fontSize: 17,
                  textAlign: 'center',
                }}>
                OPEN CAMERA
              </Text>
            </Pressable>
            <Pressable
              style={{padding: 10, backgroundColor: '#DCDCDC'}}
              onPress={() => {
                launchImageLibrarys();
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Black',
                  color: '#868686',
                  fontSize: 17,
                  textAlign: 'center',
                }}>
                OPEN IMAGE LIBRARY
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </>
  );
}

export default NewProduct;
