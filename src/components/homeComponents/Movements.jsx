import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import TooltipComp from '../TooltipComp';
import MovementRegister from './MovementRegister';

export default function Movements({ money, showMovementsTip, setShowMovementsTip, msg }) {
    return (
        <View style={st.container}>

            <TooltipComp tipText="Aqui ficará toda a movimentação financeira que você registrar!"
                showTip={showMovementsTip} setTip={setShowMovementsTip} placement="top">
                <Text style={st.title}>Últimas movimentações</Text>
                <Text>{msg}</Text>
            </TooltipComp>

            <ScrollView showsVerticalScrollIndicator={false}>
                {money.map((item, index) => (
                    <View key={index}>
                        <MovementRegister props={item} key={index} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}


const st = StyleSheet.create({
    container: {
        padding: 10,
        marginLeft: 3,
        marginRight: 3
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 14,
        marginBottom: 20,
    },
});
