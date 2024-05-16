import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64

export default function MoreOptions({ navigation, route }) {
    const [moneyFlow, setMoneyFlow] = useState(null);

    useEffect(() => {
        setMoneyFlow(route.params.dados);
    }, []);

    const menus = [
        {
            actionType: null,
            label: 'Gráficos',
            page: 'Graphs',
            icon: 'areachart',
            data: moneyFlow,
            type: 1 //graphs
        },
        {
            actionType: null,
            label: 'Cotações',
            page: 'Money',
            icon: 'money-symbol',
            type: 2 //money
        },
        {
            actionType: null,
            label: 'Eventos',
            page: 'MapLoadingScreen',
            icon: 'calendar',
            type: 3 //events
        },
    ]
    return (
        <View style={{ marginTop: statusBarHeight, flex: 1, flexDirection: 'colunm' }}>
            <View style={{}}>
                <View style={st.txtView}>
                    <Text style={st.title}>
                        Mais opções para você!
                    </Text>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }}>
                        <View style={st.menusView}>
                            {menus.map((item, index) => (
                                <TouchableOpacity style={st._actionBtn} key={index}
                                    onPress={() => { navigation.navigate(item.page, { allData: item.data }) }}>
                                    <View style={st._areaBtn} key={`${index}V`} >
                                        {item.type === 2 ?
                                            <Fontisto key={`${index}i`} name={item.icon} size={26} color="darkblue" /> :
                                            <AntDesign key={`${index}i`} name={item.icon} size={26} color="darkblue" />
                                        }
                                    </View>
                                    <Text key={`${index}T`} style={st._labelBtn}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View></View>
                </ScrollView>
            </View>
            <View style={st.back}>
                <TouchableOpacity style={st.backBtn} onPress={() => { navigation.navigate("Home") }}>
                    <AntDesign name="back" size={24} color="darkblue" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const st = StyleSheet.create({
    _actionBtn: {
        alignItems: 'center',
        marginHorizontal: 32,
        marginVertical: 16
    },
    _areaBtn: {
        backgroundColor: '#d5e1e4',
        borderRadius: 30,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _labelBtn: {
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000'
    },
    title: {
        marginHorizontal: 10,
        marginVertical: 8,
        fontSize: 22,
        color: '#dadada'
    },
    txtView: {
        backgroundColor: 'darkblue',
        paddingVertical: 20
    },
    menusView: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        width: '100%',
    },
    back: {
        position: 'absolute',
        bottom: 30,
        right: 30
    },
    backBtn: {
        borderWidth: 3,
        borderColor: 'darkblue',
        borderRadius: 100,
        padding: 5
    }
});
