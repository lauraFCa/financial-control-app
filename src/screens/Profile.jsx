import { View, StatusBar, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Storage from '../database/firebaseMethods';
import { useLoading } from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64;


export default function Perfil({ navigation }) {
  const { showLoading, hideLoading } = useLoading();
  const [dados, setDados] = useState({
    email: "",
    name: "",
    perfilInvestimento: "",
    profissao: ""
  });
  const [investimentos, setInvestimentos] = useState([{
    label: "",
    status: 1,
    value: ""
  }]);

  useEffect(() => {
    const getAllData = async () => {
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new Storage(doc)
      try {
        showLoading();

        let res = await fr.getFullDoc();
        if (res) {
          let uD = res.userData;
          let inv = res.investments;
          let invs = []
          if (inv) {
            inv.forEach(element => {
              invs.push({
                id: element.id,
                label: element.label,
                status: element.status,
                value: parseFloat(element.value).toFixed(2)
              })
            });
          }
          setDados(uD);
          setInvestimentos(invs);
        } else {
          console.log(res)
        }
      } catch (err) { console.log(err) } finally { hideLoading(); }
    };

    getAllData().catch(console.error);
  }, []);

  return (
    <View style={{ height: '100%', marginTop: statusBarHeight }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text
            style={styles.userName}
            from={{ translateX: -300 }}
            animate={{ translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 300 }}>
            {dados.name + '\n'}
            <Text style={styles.label}>{dados.email}</Text>
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btnUser}
            onPress={() => {
              alert('Change photo');
            }}>
            <Feather name="user" size={27} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.data}>
        <Text style={styles.text}>
          Profissão:
          <Text style={styles.insiderText}>{' ' + dados.profissao}</Text>
        </Text>

        <Text style={styles.text}>
          Perfil de investimento:
          <Text style={styles.insiderText}>
            {' ' + dados.perfilInvestimento}
          </Text>
        </Text>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Ações de Interesse </Text>

          <View>
            <FlatList
              style={styles.list}
              data={investimentos}
              keyExtractor={(item) => String(item.label)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.inv_container}>
                  <Text style={styles.inv_data}>{/* {props.Id} */}</Text>
                  <View style={styles.inv_content}>
                    <Text style={styles.inv_label}>{item.label}</Text>

                    <View>
                      <Text
                        style={
                          item.status == 1
                            ? styles.inv_value
                            : styles.inv_expenses
                        }>
                        {item.status == 1
                          ? `${item.value}%`
                          : `-${item.value}%`}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          <View
            style={{ marginTop: 30, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { navigation.navigate("Investments") }}>
              <View style={styles.addView}>
                <Text style={{ paddingRight: 8, paddingTop: 3, fontSize: 12 }}>
                  Alterar
                </Text>
                
                <Feather name="refresh-cw" size={18} color="darkblue" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles._homeBtnView}>
        <TouchableOpacity
          style={styles._homeBtn}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <MaterialIcons name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'darkblue',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    color: 'darkblue',
  },
  insiderText: {
    color: '#000',
    fontWeight: 'normal',
  },
  container: {
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  btnUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2,
  },
  data: {
    color: '#dadada',
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingTop: 5,
    marginTop: 5,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },

  _homeBtnView: {
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 70,
    right: 10,
  },
  _homeBtn: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'darkblue',
  },

  inv_container: {
    flex: 1,
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada',
  },
  inv_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8,
  },
  inv_data: {
    color: '#dadada',
    fontWeight: 'bold',
  },
  inv_label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inv_value: {
    fontSize: 15,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  inv_expenses: {
    fontSize: 15,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});
