import React, { useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64

export default function ChangeProfilePic({ navigation }) {

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [display, setDisplay] = useState(false);
    const [changeIcon, setChangeIcon] = useState("camera");
    const [takenPhoto, setTakenPhoto] = useState({});

    const camera = useRef(Camera);

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


    const flipCamera = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    }


    const handleAttachPhoto = async () => {
        if (changeIcon === "camera") {
            const photo = await camera.current.takePictureAsync();
            setTakenPhoto(photo);
            camera.current.pausePreview();
            setDisplay(true);
            setChangeIcon("save");
        } else {
            resetPic();
            navigation.navigate("UploadPic", { photoData: takenPhoto });
        }
    };


    const resetPic = () => {
        setDisplay(false);
        setChangeIcon("camera");
        camera.current.resumePreview();
    }



    return (
        <View style={{ flex: 1, marginTop: statusBarHeight }}>
            <Camera style={{ flex: 1 }} type={type} ref={camera}>
                <View style={[st.return, { display: display ? "none" : "flex" }]}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Profile"); }}>
                        <Ionicons name="arrow-back" size={30} color="#969696" />
                    </TouchableOpacity>
                </View>
                <View style={[st.tryAgain, { display: display ? "flex" : "none" }]}>
                    <TouchableOpacity onPress={() => { resetPic }}>
                        <Text style={st.tryAgainTxt}>Nova foto</Text>
                    </TouchableOpacity>
                </View>
                <View style={st.cameraBtns}>
                    <TouchableOpacity style={{ display: display ? "none" : "flex" }} onPress={flipCamera}>
                        <Ionicons name="camera-reverse-outline" size={35} color="#969696" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleAttachPhoto}>
                        <Ionicons name={changeIcon} size={35} color="#969696" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );

}


const st = StyleSheet.create({
    view: {
        marginTop: statusBarHeight,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#000000da",
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        marginTop: 15,
        color: "#969696",
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#969696',
        alignItems: 'center',
        width: 160,
        borderRadius: 5,
        paddingVertical: 10,
    },
    btnTxt: {
        fontSize: 15,
    },
    cameraBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 30,
        width: '100%',
        paddingHorizontal: 20,
    },
    return: {
        position: 'absolute',
        top: 20,
        left: 15,
    },
    tryAgain: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#969696',
    },
    tryAgainTxt: {
        fontSize: 18,
    }
});