import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Storage from './../database/firebaseMethods';
import { useLoading } from './../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ChangeData({ label, value, refresh }) {

  const { showLoading, hideLoading, setShouldRefresh } = useLoading();

  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [perfilInv, setperfilInv] = useState('');
  const [profissao, setprofissao] = useState('');

  const [userData, setUserData] = useState({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const getAllData = async () => {
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new Storage(doc);
      try {
        showLoading();
        let res = await fr.getFullDoc();
        let uD = res.userData;
        setUserData(uD);
      } catch (err) { console.log(err) } finally { hideLoading(); }
    };

    getAllData().catch(console.error);
  }, []);

  updateData = async () => {
    const doc = await AsyncStorage.getItem('userDoc');
    const fr = new Storage(doc);

    if (label === 'Nome') {
      let out = await updateName(fr);
      console.log(out);
    }
    if (label === 'Email') {
      let out = await updateEmail(fr);
      console.log(out);
    }
    if (label === 'Profissão') {
      let out = await updateProfissao(fr);
      console.log(out);
    }
    if (label === 'Perfil de Investimento') {
      let out = await updatePerfil(fr);
      console.log(out);
    }

    toggleModal();
    setShouldRefresh(true);
    await refresh();
  };



  updateName = async (fr) => {
    let perf = "";
    if (userData.perfilInvestimento && userData.perfilInvestimento != '') {
      perf = userData.perfilInvestimento;
    }
    let prof = "";
    if (userData.profissao && userData.profissao != '') {
      prof = userData.profissao;
    }
    let outp = await fr.updateDoc({
      userData: {
        name: name,
        email: userData.email,
        perfilInvestimento: perf,
        profissao: prof
      },
    });
    return outp;
  }

  updateEmail = async (fr) => {
    let perf = "";
    if (userData.perfilInvestimento && userData.perfilInvestimento != '') {
      perf = userData.perfilInvestimento;
    }
    let prof = "";
    if (userData.profissao && userData.profissao != '') {
      prof = userData.profissao;
    }
    let outp = await fr.updateDoc({
      userData: {
        name: userData.name,
        email: email,
        perfilInvestimento: perf,
        profissao: prof
      },
    });
    return outp;
  }

  updateProfissao = async (fr) => {
    let perf = "";
    if (userData.perfilInvestimento && userData.perfilInvestimento != '') {
      perf = userData.perfilInvestimento;
    }
    let outp = await fr.updateDoc({
      userData: {
        name: userData.name,
        email: userData.email,
        perfilInvestimento: perf,
        profissao: profissao,
      },
    });
    return outp;
  }

  updatePerfil = async (fr) => {
    let prof = "";
    if (userData.profissao && userData.profissao != '') {
      prof = userData.profissao;
    }
    let outp = await fr.updateDoc({
      userData: {
        name: userData.name,
        email: userData.email,
        perfilInvestimento: perfilInv,
        profissao: prof
      },
    });
    return outp;
  }




  return (
    <View>
      <View style={styles.component}>
        <Modal style={styles.modal_modal} isVisible={isModalVisible}>
          <View style={styles.modal_modalView}>
            <View style={styles.modal_container}>
              <View style={styles.modal_titleView}>
                <Text style={styles.modal_title}>Alterando</Text>
              </View>

              <View style={{ padding: 12 }}>
                <View style={styles.modal_inputGroup}>
                  <Text style={styles.modal_label}>{label}</Text>
                  <TextInput
                    style={styles.modal_input}
                    placeholder={value}
                    onChangeText={(text) => {
                      if (label === 'Nome') {
                        setname(text);
                      }
                      if (label === 'Email') {
                        setemail(text)
                      }
                      if (label === 'Profissão') {
                        setprofissao(text)
                      }
                      if (label === 'Perfil de Investimento') {
                        setperfilInv(text)
                      }
                    }}
                  />
                </View>
              </View>

              <View style={styles.modal_buttonContainer}>
                <TouchableOpacity
                  style={styles.modal_btn}
                  onPress={toggleModal}>
                  <Ionicons
                    name="arrow-back-circle-sharp"
                    size={55}
                    color={"darkblue"}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.modal_btn} onPress={updateData}>
                  <Ionicons
                    name="add-circle-sharp"
                    size={55}
                    color={"darkblue"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.btn}>
          <Text>Alterar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderBottomColor: "darkblue",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5,
  },
  component: {
    marginTop: 10,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    paddingLeft: 20,
    color: '#c5c5c5',
  },
  value: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    alignSelf: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#e7e7e7',
  },

  modal_modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
  },
  modal_container: {
    borderTopLeftRadius: 20,
  },
  modal_titleView: {
    backgroundColor: "darkblue",
    marginBottom: 5,
  },
  modal_title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    color: '#fff',
  },
  modal_inputGroup: {
    marginTop: 10,
    marginBottom: 10,
  },
  modal_label: {
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 8,
  },
  modal_input: {
    borderWidth: 0.8,
    borderColor: "darkblue",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 16,
    fontSize: 20,
  },
  modal_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});
