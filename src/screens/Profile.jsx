
/**
 * @file Profile.jsx
 * @desc This file contains the Profile screen component.
 * The Profile screen displays user information such as name, email, profession, investment profile, and a list of investments.
 * Users can also view and change their profile picture.
 */

import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, RefreshControl } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import DBStorage from '../database/firebaseDBMethods';
import { useLoading } from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

/**
 * @function Perfil
 * @desc Profile screen component
 * @param {object} navigation - Navigation object for navigating between screens
 * @returns {JSX.Element} Profile screen component
 */
export default function Perfil({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [profilePic, setProfilePic] = useState(null);
  const [showProfilePic, setShowProfilePic] = useState(false);

  const { showLoading, hideLoading, setShouldRefresh } = useLoading();
  const [dados, setDados] = useState({
    email: "",
    name: "",
    perfilInvestimento: "",
    profissao: ""
  });
  const [investimentos, setInvestimentos] = useState([{
    label: "",
    status: 0,
    value: "",
    interest: true
  }]);

  const [refreshProf, setRefreshProf] = useState(false);

  /**
   * @function getAllData
   * @desc Fetches user data and investments from AsyncStorage and Firestore
   */
  useEffect(() => {
    const getAllData = async () => {
      reloadPic();
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new DBStorage(doc);

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
                interest: element.interest,
                label: element.label,
                status: element.status, // 1=queda, 0=crescimento
                value: parseFloat(element.value).toFixed(2)
              })
            });
          }
          setDados(uD);
          setInvestimentos(invs);
        } else {
          console.log(res)
        }
        setShouldRefresh(false);
      } catch (err) { console.log(err); } finally { hideLoading(); }
    };

    getAllData().catch(console.error);
  }, [refreshProf, profilePic]);

  const reloadPic = async () => {
    const profPic = await AsyncStorage.getItem('profilePic');
    if (profPic) {
      setProfilePic(profPic);
      setShowProfilePic(true);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadPic();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };


  return (
    <View>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff" />}>
        <View style={{ height: '100%', marginTop: statusBarHeight }} >
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
                  setModalVisible(true);
                }}>
                {showProfilePic ?
                  <Image source={{ uri: profilePic }} style={styles.header_profilePic} /> :
                  <Feather name="user" size={27} color={'#fff'} />}

                <Modal animationType="slide-up" transparent={true} visible={modalVisible} 
                  style={styles.modal} onRequestClose={() => { setModalVisible(!modalVisible); }}>
                  <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPressOut={() => setModalVisible(!modalVisible)} >
                    <View style={styles.modalContent}>
                      
                      <TouchableOpacity style={styles.modalOpt} onPress={() => {
                        setModalVisible(false);
                        navigation.navigate("SeePicture", { photoUrl: profilePic })
                      }}>
                        <Text style={styles.modalOptTxt}>Ver foto</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.modalOpt} onPress={() => { setModalVisible(false); navigation.navigate("TypeOfPic") }}>
                        <Text style={styles.modalOptTxt}>Alterar foto</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.close}>
                        <FontAwesome style={styles.closeButtonText} name="close" size={28} color="darkblue" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Modal>
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

              <ScrollView>
                {investimentos.map((item, index) => (
                  item.interest ?
                    <View style={styles.inv_container} key={index}>
                      <View style={styles.inv_content} key={index}>
                        <Text style={styles.inv_label} key={index}>{item.label}</Text>
                        <View>
                          <Text key={index}
                            style={
                              item.status == 0
                                ? styles.inv_value
                                : styles.inv_expenses
                            }>
                            {item.status == 0
                              ? `${item.value}%`
                              : `-${item.value}%`}
                          </Text>
                        </View>
                      </View>
                    </View> : <View key={index}></View>
                ))}
              </ScrollView>

              <View
                style={{ marginTop: 30, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("checkbox",
                    { invs: investimentos, refreshProfile: () => { setRefreshProf(!refreshProf); } })
                }}>
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

        </View>
      </ScrollView>
      <View style={styles._homeBtnView}>
        <TouchableOpacity
          style={styles._homeBtn}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <MaterialIcons name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  closeButtonText: {
    textAlign: 'right'
  },
  modalOptTxt: {
    fontSize: 20,
    color: 'darkblue'
  },
  modalBackground: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 999,
  },
  modalContent: {
    borderRadius: 10,
    width: 200,
    elevation: 100,
    position: 'absolute',
    right: 40,
    top: 70
  },
  modalOpt: {
    borderBottomWidth: 1,
    borderBottomColor: '#c5c5c5',
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(166, 166, 166, 0.8)',
    borderRadius: 6,
    marginBottom: 5
  },

  header_profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 1,
  },
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
    bottom: -200,
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
