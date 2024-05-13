import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";


export default function Resources({ navigation }) {

    return (
        <View>
            <View style={st.header}></View>
            <ScrollView>
                <TouchableOpacity onPress={navigation.navigate("GoToNearest")}>
                    <Text>Ir até a agencia mais próxima</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}

const st = StyleSheet.create({
    header: {
        height: 20,
        color: 'darkblue'
    }
});