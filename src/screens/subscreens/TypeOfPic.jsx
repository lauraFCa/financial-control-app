import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../database/firebaseStorageMethods';
import Toast from 'react-native-toast-message';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64;

export default function TypeOfPic({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState({uri:null});
    const [displayProgress, setDisplayProgress] = useState(false);
    const [displayMsg, setDisplayMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("É necessário anexar uma foto para salvar!");
    const [blockBtns, setBlockBtns] = useState(false);

    const selectGift = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            quality: 1,
        });
        console.log("result", result)
        if (!result.canceled) {
            setImage({
                uri: result.assets[0].uri,
                width: result.assets[0].width,
                height: result.assets[0].height
            });
            setModalVisible(false);
        }
    }

    uploadProfilePic = async () => {
        setBlockBtns(true);
        setDisplayProgress(true);
        const userId = await AsyncStorage.getItem('userDoc');
        const extension = (image.uri.split('.'))[(image.uri.split('.')).length - 1];
        const photoDt = {
            name: userId + '.' + extension,
            contentType: 'image/' + extension,
            contentLanguage: 'pt-Br',
            type: "Image",
            cacheControl: null,
            contentLanguage: "pt-Br",
            customMetadata: {
                height: image.height,
                width: image.width,
            }
        };
        try {
            const storage = new Storage("profile");
            const uploadResp = await storage.uploadFile(image.uri, photoDt.name, photoDt);
            const downloadUrl = await storage.downloadFileUrl(photoDt.name);
            await AsyncStorage.setItem('profilePic', downloadUrl);
            Toast.show({ type: 'success', text1: 'Sucesso', text2: 'A imagem foi carregada com sucesso!' });
            navigation.navigate("Profile");
        } catch (error) {
            console.log(error.message)
            Toast.show({ type: 'error', text1: 'Houve uma falha no upload', text2: error.message });
            setErrorMsg(error.message);
            setDisplayMsg(true);
        } finally {
            setDisplayProgress(false);
            setBlockBtns(false);
        }
    }


    return (
        <View style={{ marginTop: statusBarHeight, flex:1 }}>
            <View style={{ height: 20, backgroundColor: 'darkblue', paddingVertical: 10 }}></View>
            <Text style={st.title}>Selecione como quer inserir uma nova foto:</Text>
            <View style={st.btnsView}>
                <TouchableOpacity disabled={blockBtns} style={st.btn} onPress={() => navigation.navigate('ChangeProfilePic')}>
                    <Text style={st.btnTxt}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={blockBtns} style={st.btn} onPress={() => setModalVisible(true)}>
                    <Text style={st.btnTxt}>Galeria</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide"
                transparent={true} visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={st.modalContainer}>
                    <View style={st.innerContainer}>
                        <TouchableOpacity style={st.btn} onPress={selectGift}>
                            <Text style={st.btnTxt}>Escolher da galeria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[st.btn, { backgroundColor: '#c95e5e' }]}
                            onPress={() => setModalVisible(false)}>
                            <Text style={st.btnTxt}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {image.uri && <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: image.uri }} style={{ width: image.width/3, height: image.height/3 }} />
                <TouchableOpacity disabled={blockBtns} style={[st.btn, { marginTop: 20 }]} onPress={uploadProfilePic}>
                    <Text style={st.btnTxt}>Usar essa foto</Text>
                </TouchableOpacity>
            </View>}
            <View>
                <Text style={[st.msg, { display: displayMsg ? "flex" : "none" }]}>{errorMsg}</Text>
            </View>
            {displayProgress ? <Text style={{ justifyContent: 'center', fontSize: 20 }}>Enviando...</Text> : null}
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} 
                style={{ flex:1,position: 'absolute', bottom: 30, right: 20 }}>
                <Text style={{fontSize: 18, color: 'darkblue'}}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

const st = StyleSheet.create({
    title: {
        fontSize: 24,
        marginTop: 20,
        marginHorizontal: 15
    },
    btnsView: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btn: {
        backgroundColor: 'darkblue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    btnTxt: {
        fontSize: 18,
        color: 'lightgrey'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparência
    },
    innerContainer: {
        gap: 10
    },
    realBtn: {
        margin: 5,
        padding: 10
    }
});