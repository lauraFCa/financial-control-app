import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import TooltipComp from '../TooltipComp';
import HorizontalMenuOption from './HorizontalMenuOption';


const menuOptions = [
    {
        actionType: 'Adicionando',
        label: 'Entrada',
        icon: 'plussquareo',
        type: 0, //entrada
    },
    {
        actionType: 'Adicionando',
        label: 'Compra',
        icon: 'tagso',
        type: 1, //saida
    },
    {
        actionType: 'Adicionando',
        label: 'Gasto',
        icon: 'barcode',
        type: 1, //saida
    },
    {
        actionType: null,
        label: 'Conta',
        icon: 'setting',
        type: 2 //settings
    },
    {
        actionType: null,
        label: 'Gráficos',
        icon: 'areachart',
        type: 3 //graphs
    },
    {
        actionType: null,
        label: 'Moedas',
        icon: 'money-symbol',
        type: 4 //money
    },
];


export default function Menu({ isRefresh, isRef, refresh, navigation, moneyGraph, showMenuTip, setTip, showSettingsTip, setShowSettingsTip }) {


    return (
        <TooltipComp tipText="Arraste o menu para o lado, para ver todas as suas opções!" placement="bottom"
        tStyle={{marginTop: -30}} showTip={showMenuTip} setTip={setTip}>
            <ScrollView
                style={[st.scrollContainer, { paddingRight: 10 }]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {menuOptions.map((item, index) => (
                    <View style={{ height: 100, marginRight: 15 }} key={index}>
                        <HorizontalMenuOption
                            refresh={refresh}
                            isRefresh={isRefresh}
                            isRef={isRef}
                            navigation={navigation}
                            dados={item}
                            key={index}
                            allData={moneyGraph}
                            showSettingsTip={showSettingsTip}
                            setShowSettingsTip={setShowSettingsTip}
                        />
                    </View>
                ))}
            </ScrollView>

        </TooltipComp>


    )
}


const st = StyleSheet.create({
    scrollContainer: {
        marginBottom: 20,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14,
    }
});
