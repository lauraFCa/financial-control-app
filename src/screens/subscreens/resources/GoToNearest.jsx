import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


export default function GoToNearest({ navigation }) {
    //TODO Usar giroscopio
    return (
        <View>
            <View style={st.page}>
                <Text>Indo até <Text style={st.agency}>AGENCIA 001</Text></Text>
            </View>
            <View>
                <TouchableOpacity onPress={navigation.navigate("resources")}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    page: {
        borderTopWidth: 10,
        borderTopColor: 'darkblue'
    },
    agency: {
        color: 'darkblue'
    }
});