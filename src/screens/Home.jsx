import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, ScrollView, StatusBar, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HorizontalMenu from './../components/HorizontalMenu';
import Movements from '../components/Movements';
import { useLoading } from '../Context';
import Storage from './../database/firebaseMethods';
import Tooltip from 'react-native-walkthrough-tooltip';


const menuOptions = [
  {
    actionType: 'Adicionando',
    label: 'Entrada',
    icon: 'plussquareo',
    type: 0, //entrada
  },
  {
    actionType: 'Adicionando',
    label: 'Compra',
    icon: 'tagso',
    type: 1, //saida
  },
  {
    actionType: 'Adicionando',
    label: 'Gasto',
    icon: 'barcode',
    type: 1, //saida
  },
  {
    actionType: null,
    label: 'Conta',
    icon: 'setting',
    type: 2 //settings
  },
  {
    actionType: null,
    label: 'Gráficos',
    icon: 'areachart',
    type: 3 //graphs
  },
  {
    actionType: null,
    label: 'Moedas',
    icon: 'money-symbol',
    type: 4 //money
  },
];

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64

export default function Home({ navigation }) {
  const { showLoading, hideLoading, getShouldRefresh, setShouldRefresh } = useLoading();
  const [moneyGraph, SetMoneyGraph] = useState([{}]);

  const refresh = async () => {
    const doc = await AsyncStorage.getItem('userDoc');
    const fr = new Storage(doc);
    let res = await fr.getFullDoc();
    await AsyncStorage.setItem('fullUserData', JSON.stringify(res))
  };

  const slideDownRef = useRef(null);
  const [userData, setUserData] = useState({});

  const [money, setMoney] = useState([]);
  const [income, setIncome] = useState(0);
  const [negative, setNegative] = useState(0);

  const [msg, setMsg] = useState('');

  //#region Balance animation
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };


  const toggleBalance = () => {
    let state = fadeAnim.addListener((st) => { return st })
    if (state % 2 == 0) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  //#endregion

  const parseDate = (dateString) => {
    if (dateString) {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    } else {
      return new Date();
    }
  };


  const [showBalanceTip, setBalanceTip] = useState(false);
  const [showMenuTip, setShowMenuTip] = useState(false);
  const [showMovementsTip, setShowMovementsTip] = useState(false);

  useEffect(() => {
    slideDownRef.current.slideInDown(1000);

    let res;
    const getAllData = async () => {
      let isNew = await AsyncStorage.getItem('isNew');

      if (isNew === 'true') {
        setBalanceTip(true);
        await AsyncStorage.removeItem('isNew');
      };

      try {
        showLoading();
        const fullRes = await AsyncStorage.getItem('fullUserData');
        res = JSON.parse(fullRes);

        if (res) {
          setUserData(res.userData);

          let allIncomes = [];
          let incomeSum = 0;
          if (res.incomes) {
            res.incomes.forEach(element => {
              allIncomes.push({
                ...element,
                type: 1
              })
              incomeSum += parseFloat(element.value);
            });
          }
          setIncome(incomeSum.toFixed(2));

          let allExpenses = [];
          let expenseSum = 0;
          if (res.expenses) {
            res.expenses.forEach(element => {
              allExpenses.push({
                ...element,
                type: 0
              })
              expenseSum += parseFloat(element.value);
            });
          }
          setNegative(expenseSum.toFixed(2));

          let allMoney = [...allIncomes, ...allExpenses];

          SetMoneyGraph({
            incomes: allIncomes,
            expenses: allExpenses,
            moneyFlow: [
              {
                name: "incomes",
                value: incomeSum.toFixed(2)
              },
              {
                name: "expenses",
                value: expenseSum.toFixed(2)
              }
            ],
          })

          const listaOrdenada = allMoney.sort((a, b) => {
            const dataA = parseDate(a.date);
            const dataB = parseDate(b.date);
            return dataB - dataA;
          });

          setMoney(listaOrdenada);
          setMsg("")
        } else {
          setMsg('Nenhum dado encontrado!');
        }
      } catch (err) {
        console.log(err);
        setMsg('Nenhum dado encontrado!');
      } finally {
        setShouldRefresh(false);
        hideLoading();
      }
    };


    getAllData().catch(console.error);

  }, [getShouldRefresh()]);


  return (
    <ScrollView style={{ marginTop: statusBarHeight, flex: 1 }}>
      {/** #region HEADER **/}
      <View style={st.header_container}>
        <View style={st.header_content}>
          <Animatable.View ref={slideDownRef} style={st.header_profile}>
            <Text style={st.header_userName}>{userData.name}</Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={st.header_btnUser}
              onPress={() => navigation.navigate('Profile')}>
              <Feather name="user" size={27} color={'darkblue'} />
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
      {/** #endregion HEADER **/}

      {/** #region BALANCE **/}
      <TouchableOpacity
        style={st.balance_viewContainer}
        onPress={toggleBalance}>
        <Tooltip
          isVisible={showBalanceTip}
          content={
            <View style={{ padding: 5 }}>
              <Text>Você pode esconder ou exibir os valores, apenas clicando nele!</Text>
            </View>
          }
          onClose={() => setBalanceTip(false)}
          placement="bottom"
        >
          <Tooltip
            isVisible={showBalanceTip}
            content={
              <View style={{ padding: 5 }}>
                <Text>Aqui estão os balanços que você registrar no app!</Text>
              </View>
            }
            onClose={() => { setBalanceTip(false); setShowMenuTip(true); }}
            placement="top"
          >
            <View style={st.balance_container} >
              <Animated.View style={[st.balance_data, { opacity: fadeAnim }]}>
                <View style={st.balance_item}>
                  <Text style={st.balance_itemTitle}>Saldo</Text>
                  <View style={st.balance_content}>
                    <Text style={st.balance_currency}>R$</Text>
                    <Text style={st.balance_balance}>{income}</Text>
                  </View>
                </View>
                <View style={st.balance_item}>
                  <Text style={st.balance_itemTitle}>Gastos</Text>
                  <View style={st.balance_content}>
                    <Text style={st.balance_currency}>R$</Text>
                    <Text style={st.balance_expenses}>{negative}</Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          </Tooltip>
        </Tooltip>
      </TouchableOpacity>
      {/** #endregion BALANCE **/}

      <Tooltip
        isVisible={showMenuTip}
        content={
          <View style={{ padding: 5 }}>
            <Text>Arraste o menu para o lado, para ver todas as suas opções!</Text>
          </View>
        }
        onClose={() => { setShowMovementsTip(true); setShowMenuTip(false); }}
        placement="bottom"
      >
        <ScrollView
          style={[st.scrollContainer, { paddingRight: 10 }]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {menuOptions.map((item, index) => (
            <View style={{ height: 100, marginRight: 15 }} key={index}>
              <HorizontalMenu
                refresh={refresh}
                navigation={navigation}
                dados={item}
                key={index}
                allData={moneyGraph}
              />
            </View>
          ))}
        </ScrollView>
      </Tooltip>
      {/** #region MOVIMENTACOES **/}

      <View style={{ padding: 10, marginLeft: 3, marginRight: 3 }}>

        <Tooltip
          isVisible={showMovementsTip}
          content={
            <View style={{ padding: 5 }}>
              <Text>Aqui ficará toda a movimentação financeira que você registrar!</Text>
            </View>
          }
          onClose={() => { setShowMovementsTip(false); }}
          placement="top"
        >
          <Text style={st.title}>Últimas movimentações</Text>
          <Text>{msg}</Text>
        </Tooltip>
        <ScrollView showsVerticalScrollIndicator={false}>
          {money.map((item, index) => (
            <View key={index}>
              <Movements props={item} key={index} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/** #endregion MOVIMENTACOES **/}
    </ScrollView>
  );
}

const st = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  header_profile: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
  },
  header_container: {
    paddingTop: 20,
    backgroundColor: 'darkblue',
    paddingBottom: 60,
  },
  header_userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header_btnUser: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 100,
    zIndex: 99
  },

  balance_viewContainer: {
    marginTop: -50,
    zIndex: 99,
    marginLeft: 12,
    marginRight: 12,
  },
  balance_container: {
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.3,
    borderRadius: 4,
    marginStart: 14,
    marginEnd: 14,
  },
  balance_data: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  balance_item: {
    borderRadius: 4,
    paddingTop: 22,
    paddingBottom: 22,
    zIndex: 99,
  },
  balance_itemTitle: {
    fontSize: 20,
    color: '#DADADA',
  },
  balance_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance_currency: {
    color: '#DADADA',
    marginRight: 6,
  },
  balance_balance: {
    fontSize: 22,
    color: '#2ecc71',
  },
  balance_expenses: {
    fontSize: 22,
    color: '#e74c3c',
  },

  scrollContainer: {
    marginBottom: 20,
    marginTop: 18,
    paddingEnd: 14,
    paddingStart: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 14,
    marginBottom: 20,
  },
});
