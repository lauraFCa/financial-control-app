import { useEffect, useState } from 'react';
import ChangeData from '../components/ChangeData';
import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text, StatusBar } from 'react-native';
import Storage from '../database/firebaseDBMethods';
import { useLoading } from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64


export default function Settings({ navigation }) {
  const { showLoading, hideLoading, setShouldRefresh } = useLoading();


  const [dados, setUserData] = useState({});
  const [shouldRefresh, setShouldRefreshSettings] = useState(true);

  useEffect(() => {
    const getAllData = async () => {

      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new DBStorage(doc);
      try {
        showLoading();
        let res = await fr.getFullDoc();
        let uD = res.userData;
        setUserData(uD);
      } catch (err) {
        console.log(err);
      } finally {
        hideLoading();
      }

    };

    getAllData();
  }, [shouldRefresh]);

  const refresh = async () => {
    setShouldRefreshSettings(!shouldRefresh);
  }

  const handleSair = async () => {
    await AsyncStorage.removeItem('isAuth');
    await AsyncStorage.removeItem('fullUserData');
    await AsyncStorage.removeItem('userDoc');
    navigation.navigate("Auth");
  }

  return (
    <View style={{ marginTop: statusBarHeight, height: '100%' }}>
      <View>
        <ChangeData
          label="Nome"
          value={dados.name}
          refresh={refresh}
        />
        <ChangeData
          label="Email"
          value={dados.email}
          refresh={refresh}
        />
        <ChangeData
          label="Profissão"
          value={dados.profissao}
          refresh={refresh}
        />
        <ChangeData
          label="Perfil de Investimento"
          value={dados.perfilInvestimento}
          refresh={refresh}
        />
      </View>

      <View style={styles.homeBtnView}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => {
            setShouldRefresh(true);
            navigation.navigate('Home');
          }}>
          <MaterialIcons name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sair} onPress={handleSair}>
        <Text style={{ fontSize: 20 }}>Sair</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBtnView: {
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 80,
    right: 10,
  },
  homeBtn: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'darkblue',
  },
  sair: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    borderWidth: 1,
    borderColor: 'darkblue',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16
  }

});
