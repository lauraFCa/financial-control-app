import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SeePicture({ navigation, route }) {
    const [tempoNula, setTempoNula] = useState(0);
    const [msg, setMsg] = useState('Carregando...');

    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        const loadPic = async () => {
            const profPic = await AsyncStorage.getItem('profilePic');
            if (profPic) {
                setPhoto(profPic);
            };
        };
        loadPic();
    }, []);

    useEffect(() => {
        let timer;
        if (!photo) {
            timer = setTimeout(() => {
                setTempoNula(tempoNula + 1);
            }, 1000); 
        } else {
            setTempoNula(0); 
        }

        return () => clearTimeout(timer);
    }, [photo, tempoNula]);

    useEffect(() => {
        if (tempoNula >= 8) {
            setMsg("A imagem não foi encontrada!");
            setTempoNula(0);
        }
    }, [tempoNula]);


    return (
        <View style={styles.image}>
            <View style={styles.return}>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <FontAwesome name="close" size={30} color="darkblue" />
                </TouchableOpacity>
            </View>
            <View>
                {photo ?
                    <Image source={{ uri: photo }} style={{ width: 0.95 * screenWidth, height: 0.95 * screenHeight }} /> :
                    <Text>{msg}</Text>}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    return: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});