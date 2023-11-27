import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import TooltipComp from '../TooltipComp';


export default function Balance({ showBalanceTip, setBalanceTip, setShowMenuTip, income, negative }) {

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };


    const toggleBalance = () => {
        let state = fadeAnim.addListener((st) => { return st })
        if (state % 2 == 0) {
            fadeOut();
        } else {
            fadeIn();
        }
    };

    const [isShowSecondTip, setIsShowSecondTip] = useState(false);
    const [zindex, setzindex] = useState(99);

    return (
        <TooltipComp tipText="Aqui estão os balanços que você registrar no app!" placement={"top"}
            showTip={showBalanceTip} tStyle={{ marginTop: -35, width: 300 }}
            setTip={() => { setzindex(0); setBalanceTip(false); setIsShowSecondTip(true); }}>

            <TouchableOpacity style={[st.balance_viewContainer, { zIndex: zindex }]} onPress={toggleBalance} >
                <View style={{ width: 300 }}></View>
                <TooltipComp tipText="Você pode esconder ou exibir os valores, apenas clicando aqui!"
                    showTip={isShowSecondTip} setTip={() => { setIsShowSecondTip(false); setzindex(99); setShowMenuTip(true); }} placement={"bottom"}>

                    <View style={st.balance_container} >
                        <Animated.View style={[st.balance_data, { opacity: fadeAnim }]}>
                            <View style={st.balance_item}>
                                <Text style={st.balance_itemTitle}>Saldo</Text>
                                <View style={st.balance_content}>
                                    <Text style={st.balance_currency}>R$</Text>
                                    <Text style={st.balance_balance}>{income}</Text>
                                </View>
                            </View>
                            <View style={st.balance_item}>
                                <Text style={st.balance_itemTitle}>Gastos</Text>
                                <View style={st.balance_content}>
                                    <Text style={st.balance_currency}>R$</Text>
                                    <Text style={st.balance_expenses}>{negative}</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>

                </TooltipComp>
            </TouchableOpacity >
        </TooltipComp>

    )

}


const st = StyleSheet.create({
    balance_viewContainer: {
        marginTop: -50,
        marginHorizontal: 12,
    },
    balance_container: {
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.3,
        borderRadius: 4,
        marginVertical: 14
    },
    balance_data: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    balance_item: {
        borderRadius: 4,
        paddingTop: 22,
        paddingBottom: 22,
        zIndex: 99,
    },
    balance_itemTitle: {
        fontSize: 20,
        color: '#DADADA',
    },
    balance_content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balance_currency: {
        color: '#DADADA',
        marginRight: 6,
    },
    balance_balance: {
        fontSize: 22,
        color: '#2ecc71',
    },
    balance_expenses: {
        fontSize: 22,
        color: '#e74c3c',
    },
});
