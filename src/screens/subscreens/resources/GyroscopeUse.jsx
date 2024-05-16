import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, Button } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function GyroscopeUse({ navigation }) {

  const camera = useRef(Camera);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return (<View><Text>Permission to use camera was not granted!</Text></View>);
  }

  if (!permission.granted) {
    return (
      <View style={st.view}>
        <Text style={st.title}>
          Autoriza a utilizacao da camera?
        </Text>
        <View>
          <TouchableOpacity style={st.btn} onPress={requestPermission}>
            <Text style={st.btnTxt}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={st.btn} onPress={() => { navigation.navigate("Profile") }}>
            <Text style={st.btnTxt}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(false);

  const [imageUri, setImageUri] = useState(require('./../../../../assets/more.png'));
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0, });
  const [subscription, setSubscription] = useState(null);
  const [{ rx, ry, rz }, setRound] = useState({ x: 0, y: 0, z: 0, });

  const _slow = () => Gyroscope.setUpdateInterval(600);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
    const rx = Number((x).toFixed(2)) * 100;
    const ry = Number((y).toFixed(2)) * 100;
    const rz = Number((z).toFixed(2)) * 100;
    setRound({ rx, ry, rz });
    console.log(rz);
    _slow();
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    makeAsync = async () => {
      await selectGift();
    }
    makeAsync();
  }, [image]);


  useEffect(() => {
    // _subscribe();
    // return () => _unsubscribe();
  }, [x]);

  const handleSelectImage = () => {
    setImageUri(require('./../../../../assets/more.png'));
  };

  const selectGift = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result", result)
    if (!result.cancelled) {
      setImage(true);
      setImageUri(result.uri);
      setModalVisible(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={st.modalContainer}>
          <View style={st.innerContainer}>
            <Button title="Escolher da Galeria" onPress={selectGift} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <View style={{ display: !modalVisible ? "flex" : "none" }}>

        <Camera
          style={{ flex: 1 }}
          type={CameraType.back}
          ref={camera}
        >
          {imageUri && (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={image ? {uri: imageUri} : imageUri}
                style={{
                  width: 80,
                  height: 80,

                  transform: [
                    { perspective: 1000 },
                    { rotateX: `${ry}deg` },
                    { rotateY: `${rx}deg` },
                    { rotateZ: `${rz}deg` },
                  ],
                }}
              />
            </View>
          )}
        </Camera>
        <TouchableOpacity onPress={handleSelectImage} style={{ padding: 20 }}>
          <Text style={{ color: 'black' }}>Selecionar Imagem</Text>
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: 30, right: 20 }}>
          <TouchableOpacity onPress={() => { navigation.navigate("Home") }}><Text>back</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparência
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});