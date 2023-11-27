import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function HomeModal({ isModalVisible, dados, handleModal, saveData, setMoney, setDescription, setDate, date }) {
    formatarData = (dateInput) => {
        let data = new Date(dateInput)
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mes é base 0, então adicione 1
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    };

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    return (
        <Modal style={st.modal} isVisible={isModalVisible}>
            <View style={st.modalView}>
                <View style={st.container}>
                    <View style={st.titleView}>
                        <Text style={st.title}>
                            {dados.actionType} {dados.label}
                        </Text>
                    </View>

                    <View style={{ padding: 12 }}>
                        <View style={st.inputGroup}>
                            <Text style={st.label}>{dados.label}</Text>
                            <TextInput
                                style={st.input}
                                onChangeText={(text) => setDescription(text)}
                            />
                        </View>
                        <View style={st.inputGroup}>
                            <Text style={st.label}>Valor (R$)</Text>
                            <TextInput
                                style={st.input}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    const formattedText = text.replace(/[^0-9.]/g, '');
                                    setMoney(formattedText);
                                }}
                            />
                        </View>

                        <SafeAreaView>
                            <Text style={st.label}>Date</Text>
                            <TouchableOpacity onPress={() => { showMode('date'); }}>
                                <Text style={st.input}>{formatarData(date)}</Text>
                            </TouchableOpacity>

                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}
                        </SafeAreaView>
                    </View>

                    <View style={st.buttonContainer}>
                        <TouchableOpacity style={st.btn} onPress={handleModal}>
                            <Ionicons
                                name="arrow-back-circle-sharp"
                                size={55}
                                color="darkblue"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={st.btn} onPress={saveData}>
                            <Ionicons name="add-circle-sharp" size={55} color="darkblue" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    )
}


const st = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 10,
    },
    container: {
        borderTopLeftRadius: 20,
    },
    titleView: {
        backgroundColor: 'darkblue',
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
        color: '#fff',
    },
    inputGroup: {
        marginTop: 10,
        marginBottom: 10,
    },
    label: {
        textAlign: 'left',
        fontSize: 20,
        marginBottom: 8,
    },
    input: {
        borderWidth: 0.8,
        borderColor: 'darkblue',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginBottom: 16,
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
});
