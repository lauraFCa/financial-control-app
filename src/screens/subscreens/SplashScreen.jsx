import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Storage from '../../database/firebaseMethods';
import LogoImage from '../../components/LogoImage';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        
        const fetchData = async () => {
            await AsyncStorage.setItem("isNew", "true")
            const doc = await AsyncStorage.getItem('userDoc');
            if (!doc) {
                await AsyncStorage.removeItem('isAuth');
                await AsyncStorage.removeItem('fullUserData');
                navigation.navigate("Auth");
            } else {
                const fr = new Storage(doc);
                let dadosDoBanco = {};
                try {
                    let isauth = await AsyncStorage.getItem('fullUserData')
                    if (isauth) {
                        navigation.navigate('Home');
                    } else {
                        dadosDoBanco = await fr.getFullDoc();
                        await AsyncStorage.setItem('fullUserData', JSON.stringify(dadosDoBanco));
                        await new Promise(resolve => setTimeout(resolve, 5400));
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do banco:', error);
                } finally {
                    navigation.navigate('Home');
                }
            }
        };

        fetchData();
    }, []);


    return (
        <View style={{ justifyContent: 'center', alignContent: 'center', height: '100%' }}>
            <LogoImage />
        </View>
    );
};

