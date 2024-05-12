import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Storage from '../../database/firebaseDBMethods';
import { useLoading } from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeModal from './HomeModal';
import TooltipComp from '../TooltipComp';


export default function HorizontalMenuOption({ isRef, isRefresh, refresh, navigation, dados, allData, showSettingsTip, setShowSettingsTip }) {

  const { showLoading, hideLoading, setShouldRefresh } = useLoading();
  const [myDados, setDados] = useState([]);

  useEffect(() => {
    setDados(dados);
  }, [dados]);

  const [description, setDescription] = useState('');
  const [money, setMoney] = useState(0);
  const [date, setDate] = useState(new Date());

  const [isModalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    if (dados.type === 2) {
      navigation.navigate('Settings');
    } else if (dados.type === 3) {
      navigation.navigate('Graphs', { allData: allData });
    } else if (dados.type === 4) {
      navigation.navigate('Money');
    }else if (dados.type === 5) {
      navigation.navigate('map');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const saveData = async () => {
    try {
      setModalVisible(false);
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new DBStorage(doc);
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
      refresh();
      isRefresh(!isRef);
      hideLoading();
    }

  };

  return (
    <View>

      <HomeModal setDescription={setDescription} setMoney={setMoney} setDate={setDate} date={date}
        isModalVisible={isModalVisible} dados={dados} handleModal={handleModal} saveData={saveData} />

      {myDados.type == 2 ?
        <TooltipComp tipText="Para começar, insira/atualize seus dados!" showTip={showSettingsTip} setTip={setShowSettingsTip} placement="left">
          
          <TouchableOpacity style={st._actionBtn} onPress={handleModal}>
            <View style={st._areaBtn}>
              {dados.type === 4 ?
                <Fontisto name={dados.icon} size={26} color="#000" /> :
                <AntDesign name={dados.icon} size={26} color="#000" />}
            </View>
            <Text style={st._labelBtn}>{dados.label}</Text>
          </TouchableOpacity>
        </TooltipComp> 
        
        :

        <TouchableOpacity style={st._actionBtn} onPress={handleModal}>
          <View style={st._areaBtn}>
            {dados.type === 4 ?
              <Fontisto name={dados.icon} size={26} color="#000" /> :
              <AntDesign name={dados.icon} size={26} color="#000" />}
          </View>
          <Text style={st._labelBtn}>{dados.label}</Text>
        </TouchableOpacity>
      }
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

});
