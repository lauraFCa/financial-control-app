import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Camera, CameraType } from 'expo-camera';

export default function GyroscopeUse() {

  const camera = useRef(Camera);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [imageUri, setImageUri] = useState(require('./../../../../assets/more.png'));
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const handleSelectImage = () => {

  };


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


  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={CameraType.back}
        ref={camera}
      >
        {imageUri && (
          <View style={{ position: 'absolute', width: '100%', height: '80%' }}>
            <Image
              source={imageUri}
              style={{
                width: 100,
                height: 100,
                transform: [
                  { perspective: 1000 },
                  { rotateX: `${y}deg` },
                  { rotateY: `${x}deg` },
                ],
              }}
            />
          </View>
        )}
      </Camera>
      <TouchableOpacity onPress={handleSelectImage} style={{ padding: 20 }}>
        <Text style={{ color: 'black' }}>Selecionar Imagem</Text>
      </TouchableOpacity>
    </View>
  );
};

