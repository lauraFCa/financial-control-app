import React, { useState } from "react"
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native"
import Storage from "../../database/firebaseStorageMethods";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export default function UploadPic({ navigation, route }) {
    const [displayProgress, setDisplayProgress] = useState(false);
    const [displayMsg, setDisplayMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("É necessário anexar uma foto para salvar!");
    const [toastResp, setToastResp] = useState(null);

    uploadProfilePic = async () => {
        if (route && route.params.photoData) {
            setDisplayProgress(true);
            const uri = route.params.photoData.uri;
            const userId = await AsyncStorage.getItem('userDoc');
            const extension = (uri.split('.'))[(uri.split('.')).length - 1];
            const photoDt = {
                name: userId + '.' + extension,
                contentType: 'image/' + extension,
                contentLanguage: 'pt-Br',
                type: "Image",
                cacheControl: null,
                contentLanguage: "pt-Br",
                customMetadata: {
                    height: route.params.photoData.height,
                    width: route.params.photoData.width,
                }
            };
            try {
                const storage = new Storage("profile");
                const uploadResp = await storage.uploadFile(uri, photoDt.name, photoDt);
                const downloadUrl = await storage.downloadFileUrl(photoDt.name);
                await AsyncStorage.setItem('profilePic', downloadUrl);
                Toast.show({ type: 'success', text1: 'Sucesso', text2: 'A imagem foi carregada com sucesso!' });
            } catch (error) {
                Toast.show({ type: 'error', text1: 'Houve uma flaha no upload', text2: error.message });
                setErrorMsg(error.message);
                setDisplayMsg(true);
            } finally {
                setDisplayProgress(false);
                navigation.navigate("Profile");
            }
        }
    }



    return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', backgroundColor: '#c5c5c5' }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 20, display: displayProgress ? "flex" : "none" }}>
                <Text style={{ justifyContent: 'center', fontSize: 20 }}>Enviando...</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={st.btn} onPress={uploadProfilePic}>
                    <Text style={st.btnTxt}>Usar essa foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={st.btn} onPress={() => navigation.navigate("ChangeProfilePic")}>
                    <Text style={st.btnTxt}>Tentar novamente</Text>
                </TouchableOpacity>
            </View>
            <Text style={[st.msg, { display: displayMsg ? "flex" : "none" }]}>
                {errorMsg}
            </Text>
            <View style={st.preview}>
                {route.params.photoData.uri ?
                    <Image source={{ uri: route.params.photoData.uri }} style={{ width: 300, height: 300 }} /> :
                    <Text>Photo not taken</Text>}
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    btn: {
        backgroundColor: 'darkblue',
        padding: 10,
        borderRadius: 5,
        width: 135,
    },
    btnTxt: {
        textAlign: 'center',
        color: '#c5c5c5'
    },
    msg: {
        color: "#7c0c0c",
        fontSize: 18,
        paddingVertical: 15
    },
    preview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});