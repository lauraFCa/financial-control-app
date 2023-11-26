import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity, StatusBar
} from 'react-native';
import React, { useState } from 'react';
import Storage from '../../database/firebaseMethods';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLoading } from './../../Context';
import ArrowBack from '../../components/ArrowBack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64;


export default function SaveInvestments({ navigation }) {
  const { showLoading, hideLoading, setShouldRefresh } = useLoading();

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [opcao, setOpcao] = useState(null);

  const handleCheck1 = () => {
    setOpcao(0);
  };

  const handleCheck2 = () => {
    setOpcao(1);
  };

  const handleSubmit = async () => {
    try {
      showLoading();
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new Storage(doc)
      await fr.appendToInvestments({
        label: description,
        value: value,
        status: opcao,
      });
    } catch (err) { console.log(err); } finally { hideLoading(); }
    setShouldRefresh(true);
    alert("salvo com sucesso!")
    navigation.navigate("Investments");
  };


  return (
    <View style={{ marginTop: statusBarHeight + 15, paddingHorizontal: 15, height: '100%' }}>
      <ArrowBack navigation={navigation} navigate={"Investments"} />
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 50 }}>
        Cadastrando nova Ação de Interesse
      </Text>
      <View style={styles.container}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
          placeholder="Título da ação"
        />

        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setValue(text);
          }}
          value={value}
          placeholder="Quanto a ação está valendo hoje?"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Qual o status desta ação hoje?:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity style={styles.radioButton} onPress={handleCheck1}>
            <Text>
              <AntDesign
                name={opcao === 0 ? 'checkcircle' : 'checkcircleo'}
                size={18}
                color="darkblue"
              />
              &nbsp;Crescimento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioButton} onPress={handleCheck2}>
            <Text style={{ alignItems: 'center' }}>
              <AntDesign
                name={opcao === 1 ? 'checkcircle' : 'checkcircleo'}
                size={18}
                color="darkblue"
              />
              &nbsp;Queda
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="Enviar" onPress={handleSubmit} color="darkblue" />
      </View>

      <View style={{ position: 'absolute', bottom: 0, right: 20 }}>
        <TouchableOpacity onPress={() => { navigation.navigate("Investments") }}>
          <Ionicons name="arrow-back-circle-sharp" size={40} color="darkblue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: 'darkblue',
    marginBottom: 8,
    marginTop: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignContent: 'center',
    marginTop: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  back: {
    marginHorizontal: 10,
    position: 'absolute',
    zIndex: 99
  },
});
