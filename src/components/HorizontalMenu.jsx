import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Ionicons, Fontisto } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Storage from './../database/firebaseMethods';
import { useLoading } from './../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HorizontalMenu({ refresh, navigation, dados, allData }) {
  const { showLoading, hideLoading, setShouldRefresh } = useLoading();


  const [myDados, setDados] = useState([]);
  useEffect(() => {
    setDados(dados);
  }, [dados]);

  const [description, setDescription] = useState('');
  const [money, setMoney] = useState(0);

  //#region DATE

  const [date, setDate] = useState(new Date());
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

  const showDatepicker = () => {
    showMode('date');
  };

  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é base 0, então adicione 1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  //#endregion

  const [isModalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    if (dados.type === 2) {
      navigation.navigate('Settings');
    } else if (dados.type === 3) {
      navigation.navigate('Graphs', { allData: allData });
    } else if (dados.type === 4) {
      navigation.navigate('Money');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const saveData = async () => {
    try {
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new Storage(doc);
      setModalVisible(false);
      showLoading();
      if (myDados.type === 0) {
        res = await fr.appendToIncomes({
          description: description,
          value: money,
          date: formatarData(date),
          category: dados.label,
        });
      } else if (myDados.type === 1) {
        res = await fr.appendToExpenses({
          description: description,
          value: money,
          date: formatarData(date),
          category: dados.label,
        });
      }
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setShouldRefresh(true);
      hideLoading();
    }

    refresh();
  };

  return (
    <View>
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
                <TouchableOpacity onPress={showDatepicker}>
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

      <TouchableOpacity style={st._actionBtn} onPress={handleModal}>
        <View style={st._areaBtn}>
          {dados.type === 4 ?
            <Fontisto name={dados.icon} size={26} color="#000" /> :
            <AntDesign name={dados.icon} size={26} color="#000" />}
        </View>
        <Text style={st._labelBtn}>{dados.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const st = StyleSheet.create({
  _actionBtn: {
    alignItems: 'center',
    marginRight: 32,
  },
  _areaBtn: {
    backgroundColor: '#ecf0f1',
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
  },

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
