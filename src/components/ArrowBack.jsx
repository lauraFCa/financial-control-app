import { TouchableOpacity } from 'react-native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useLoading } from '../Context';

export default function ArrowBack({ navigation, navigate, style }) {
    const { setShouldRefresh } = useLoading();

    let btnStyle = {
        marginHorizontal: 10,
        position: 'absolute',
        zIndex: 99,
        ...style
    }

    handleNav = () => {
        if(navigate == 'Profile'){
            setShouldRefresh(true);
        }
        navigation.navigate(navigate);
    }

    return (
        <TouchableOpacity style={btnStyle} onPress={handleNav}>
            <Ionicons name="arrow-back-circle-outline" size={30} color="darkblue" />
        </TouchableOpacity>
    )
}
