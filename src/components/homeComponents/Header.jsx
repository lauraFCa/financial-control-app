import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';

export default function Header({ userData, navigation }) {

    const slideDownRef = useRef(null);
    useEffect(() => {
        slideDownRef.current.slideInDown(1000);
    }, []);

    return (
        <View style={st.header_container}>
            <View style={st.header_content}>
                <Animatable.View ref={slideDownRef} style={st.header_profile}>
                    <Text style={st.header_userName}>{userData.name}</Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={st.header_btnUser}
                        onPress={() => navigation.navigate('Profile')}>
                        <Feather name="user" size={27} color={'darkblue'} />
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
        padding: 10,
        borderRadius: 100,
        zIndex: 99
    },
});
