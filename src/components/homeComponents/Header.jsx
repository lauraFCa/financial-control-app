import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../database/firebaseStorageMethods';


export default function Header({ isRef, isRefresh, refresh, userData, navigation }) {

    const [profilePic, setProfilePic] = useState(null);
    const [IsRef, setIsRef] = useState(false);
    const [showProfilePic, setShowProfilePic] = useState(false);
    const slideDownRef = useRef(null);

    useEffect(() => {
        const getProfilePic = async () => {
            await updateProfilePic();
        };
        getProfilePic();
        slideDownRef.current.slideInDown(1000);
    }, [isRef]);


    const updateProfilePic = async () => {
        if (isRef) {
            setIsRef(true);
            const pic = await AsyncStorage.getItem('profilePic');
            if (pic) {
                setProfilePic(pic);
                setShowProfilePic(true);
            } else {
                try {
                    const userdoc = await AsyncStorage.getItem('userDoc');
                    const fr = new Storage("profile");
                    const picUrl = await fr.downloadFileUrl(userdoc+'.png');
                    setProfilePic(picUrl);
                    setShowProfilePic(true);
                    await AsyncStorage.setItem('profilePic', picUrl);
                } catch (e) {
                    console.log(e);
                }
            }
            isRefresh(!isRef);
            setIsRef(false);
        }
    }

    return (
        <View style={st.header_container}>
            <View style={st.header_content}>
                <Animatable.View ref={slideDownRef} style={st.header_profile}>
                    <Text style={st.header_userName}>{userData.name}</Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={st.header_btnUser}
                        onPress={() => navigation.navigate('Profile')}>

                        {showProfilePic ?
                            <Image source={{ uri: profilePic }} style={st.header_profilePic} /> :
                            <Feather name="user" size={27} color={'darkblue'} />}
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </View>
    )
}


const st = StyleSheet.create({
    header_profile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
    },
    header_container: {
        paddingTop: 20,
        backgroundColor: 'darkblue',
        paddingBottom: 60,
    },
    header_userName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    header_btnUser: {
        backgroundColor: '#fff',
        padding: 1,
        borderRadius: 100,
        borderWidth: 0.5,
        zIndex: 99
    },
    header_profilePic: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
    }
});
