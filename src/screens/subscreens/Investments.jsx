import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList, StatusBar,
} from 'react-native';
import Storage from '../../database/firebaseMethods';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoading } from '../../Context';
import Checkbox from 'expo-checkbox';
import ArrowBack from '../../components/ArrowBack';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64;

export default function Investments({ navigation }) {
  const { showLoading, hideLoading, getShouldRefresh, setShouldRefresh } = useLoading();

  const [opts, setOpts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        showLoading();
        const doc = await AsyncStorage.getItem('userDoc');
        const fr = new Storage(doc);
        let res = await fr.getFullDoc();
        let opt = res.investments;
        opt = opt.map((option) => ({ ...option, selected: false }));
        setOpts(opt);
        setSelectedOptions(opt);
      } catch (err) {
        console.log(err);
      } finally {
        hideLoading();
        setShouldRefresh(false);
      }
    };

    getAllData().catch(console.error);
  }, [getShouldRefresh()]);

  const toggleOption = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      return prevSelectedOptions.map((prevOption) => {
        if (prevOption.id === option.id) {
          // Inverte o estado da opção selecionada
          return { ...prevOption, selected: !prevOption.selected };
        } else {
          return prevOption;
        }
      });
    });
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.optionContainer}>
        <Checkbox
          value={selectedOptions.some((selectedOption) => selectedOption.id === item.id)}
          onValueChange={() => toggleOption(item)}
        />
        <Text style={{ marginLeft: 8, fontSize: 18 }}>{item.label}</Text>
      </View>
    </View>
  );

  const saveData = async () => {
    try {
      showLoading();
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new Storage(doc);
      var res = await fr.updateDoc({
        investments: selectedOptions,
      });
      if (res === 1) {
        alert('Salvo com sucesso');
      }
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  return (
    <View style={{ marginTop: statusBarHeight, paddingHorizontal: 15, height: '100%' }}>
      <ArrowBack navigation={navigation} navigate="Profile" style={{ marginTop: 10 }} />
      <View style={styles.container}>
        <Text style={styles.header}>Selecione as ações de interesse:</Text>
        <FlatList
          data={opts}
          renderItem={renderItem}
          keyExtractor={(item) => item.label.toString()}
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
              navigation.navigate('SaveInvestments');
            }}>
            <Text style={styles.btn_buttonText}>Novo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    marginTop: statusBarHeight,
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
