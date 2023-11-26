import React, { useEffect, useState } from 'react';
import { View, Animated, Easing } from 'react-native';

export default function LogoImage({ navigation }) {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [rotation] = useState(new Animated.Value(0));

    useEffect(() => {
        const startAnimation = async () => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            await new Promise(resolve => setTimeout(resolve, 3500));

            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            await new Promise(resolve => setTimeout(resolve, 2000));
        };

        startAnimation();
    }, []);

    const animatedStyle = {
        opacity: fadeAnim,
        transform: [
            {
                rotate: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
                source={require('./../static/imgs/logo.png')}
                style={[{ width: 200, height: 200 }, animatedStyle]}
            />
        </View>
    );
}
