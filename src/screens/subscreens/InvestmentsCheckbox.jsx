import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import ArrowBack from '../../components/ArrowBack';
import { useLoading } from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DBStorage from '../../database/firebaseDBMethods';
import { Feather } from '@expo/vector-icons';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64;

export default function InvestmentsCheckbox({ route, navigation }) {
    const { showLoading, hideLoading } = useLoading();

    const [items, setItems] = useState([]);
    const [isRef, setRef] = useState(false);

    useEffect(() => {
        if (route.params) {
            setItems(route.params.invs);
        }
        const update = async () => {
            try {
                const doc = await AsyncStorage.getItem('userDoc');
                const fr = new DBStorage(doc)
                let exists = await fr.getFullDoc();
                let alreadInv = exists.investments;
                setItems(alreadInv);
            } catch (e) { console.log(e) }
        };
        update();
        setRef(false);
    }, [isRef])

    const toggleInterest = (index) => {
        const updatedItems = [...items];
        updatedItems[index].interest = !updatedItems[index].interest;
        setItems(updatedItems);
    };


    const saveData = async () => {
        try {
            showLoading();

            const doc = await AsyncStorage.getItem('userDoc');
            const fr = new DBStorage(doc);
            var res = await fr.updateDoc({
                investments: items
            });
            if (res !== true) {
                console.log(res)
            }
        } catch (err) {
            console.log(err);
        } finally {
            if (route.params) {
                route.params.refreshProfile();
            }
            hideLoading();
            navigation.navigate("Profile");
        }
    };

    const renderCheckboxItem = ({ item, index }) => (
        <View style={styles.checkboxItem}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => toggleInterest(index)}>
                <Text style={styles.labelTxt}>{item.label}</Text>
                <View style={{ marginLeft: 10 }}>
                    {item.interest ?
                        <Feather name="check-square" size={24} color="darkblue" /> :
                        <Feather name="square" size={24} color="darkblue" />
                    }
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ marginTop: statusBarHeight, paddingHorizontal: 15, height: '100%' }}>
            <ArrowBack navigation={navigation} navigate="Profile" style={{ marginTop: 10 }} />
            <View style={styles.container}>
                <Text style={styles.header}>Selecione as ações de interesse:</Text>
                <FlatList
                    data={items}
                    renderItem={renderCheckboxItem}
                    keyExtractor={(item) => item.label}
                />
            </View>
            <View style={styles.btn_container}>
                <View style={styles.btn_buttonContainer}>
                    <TouchableOpacity style={styles.btn_button} onPress={saveData}>
                        <Text style={styles.btn_buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn_button}
                        onPress={() => {
                            navigation.navigate('SaveInvestments', { isRefresh: () => { setRef(true); } });
                        }}>
                        <Text style={styles.btn_buttonText}>Novo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    checkboxItem: {
        marginVertical: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: .4,
        borderRadius: 5,
        borderColor: '#00008b6c'
    },
    labelTxt: {
        fontSize: 18,
        padding: 2
    },

    container: {
        padding: 16,
        justifyContent: 'center',
        marginTop: statusBarHeight + 8,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    btn_container: {
        flex: 1,
        marginTop: 30,
    },
    btn_buttonContainer: {
        flexDirection: 'row',

        paddingHorizontal: 16,
    },
    btn_button: {
        backgroundColor: 'darkblue',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 8,
    },
    btn_buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
