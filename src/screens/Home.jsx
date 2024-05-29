import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoading } from '../Context';
import DBStorage from './../database/firebaseDBMethods';
import Balance from '../components/homeComponents/Balance';
import Header from '../components/homeComponents/Header';
import Menu from '../components/homeComponents/Menu';
import Movements from '../components/homeComponents/Movements';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import Toast from 'react-native-toast-message';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 64

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const { showLoading, hideLoading, getShouldRefresh, setShouldRefresh } = useLoading();
  const [moneyGraph, SetMoneyGraph] = useState([{}]);

  const [isRefresh, setIsRefresh] = useState(false);

  const refresh = async () => {
    await AsyncStorage.setItem('userDoc', 'user_0');
    const doc = await AsyncStorage.getItem('userDoc');
    const fr = new DBStorage(doc);
    let res = await fr.getFullDoc();
    await AsyncStorage.setItem('fullUserData', JSON.stringify(res))
  };

  const [userData, setUserData] = useState({});

  const [money, setMoney] = useState([]);
  const [income, setIncome] = useState(0);
  const [negative, setNegative] = useState(0);

  const [msg, setMsg] = useState('');


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
  const [showSettingsTip, setShowSettingsTip] = useState(false);

  useEffect(() => {
    setIsRefresh(true);
    let res;
    const getAllData = async () => {
      //remove bellow this line
      await AsyncStorage.setItem('userDoc', 'user_0');
      const doc = await AsyncStorage.getItem('userDoc');
      const fr = new DBStorage(doc);
      const dadosDoBanco = await fr.getFullDoc(doc);
      await AsyncStorage.setItem('fullUserData', JSON.stringify(dadosDoBanco));
      //remove above this line
      let isNew = await AsyncStorage.getItem('isNew');

      if (isNew === 'true') {
        setBalanceTip(true);
        await AsyncStorage.removeItem('isNew');
      };

      try {
        showLoading();
        if (getShouldRefresh()) {
          const doc = await AsyncStorage.getItem('userDoc');
          const fr = new DBStorage(doc);
          const dadosDoBanco = await fr.getFullDoc(doc);
          await AsyncStorage.setItem('fullUserData', JSON.stringify(dadosDoBanco));
          setShouldRefresh(false);
        }

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
        setRefreshing(false);
      }
      setIsRefresh(false);
    };

    getAllData().catch(console.error);

  }, [refreshing]);



  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [{ x, y, z }, setGyroscope] = useState({ x: 0, y: 0, z: 0 });
  const [{ rx, ry, rz }, setRound] = useState({ rx: 0, ry: 0, rz: 0, });

  Accelerometer.setUpdateInterval(800);
  Gyroscope.setUpdateInterval(800);

  useEffect(() => {
    Accelerometer.addListener(setAcceleration);
    Gyroscope.addListener(setGyroscope);
  }, []);

  useEffect(() => {

    const beforeX = x;
    const beforeY = y;
    const beforeZ = z;
    const rx = Number((x).toFixed(2)) * 100;
    const ry = Number((y).toFixed(2)) * 100;
    const rz = Number((z).toFixed(2)) * 100;
    setRound({ rx, ry, rz });
    console.log(rx, ry, rz);
    console.log(ry-y)
    if (Math.abs(ry - beforeY) > 100) {
      console.log('Girou para a direita');
      Toast.show({ type: 'success', text2: 'Esse aplicativo não permite a rotação de tela' });
    }
  }, [x]);


  const onRefresh = async () => {
    setIsRefresh(true);
    setRefreshing(true);
  };

  return (
    <ScrollView style={{ marginTop: statusBarHeight, flex: 1 }} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={['#0000ff']}
        tintColor="#0000ff" />}>
      <Header refresh={refresh} isRefresh={setIsRefresh} isRef={isRefresh} userData={userData} navigation={navigation} />

      <Balance showBalanceTip={showBalanceTip} setBalanceTip={setBalanceTip}
        setShowMenuTip={setShowMenuTip} income={income} negative={negative} />

      <Menu refresh={refresh} isRefresh={setIsRefresh} isRef={isRefresh} navigation={navigation} moneyGraph={moneyGraph}
        showMenuTip={showMenuTip} setTip={() => { setShowMovementsTip(true); setShowMenuTip(false); }}
        showSettingsTip={showSettingsTip} setShowSettingsTip={setShowSettingsTip} />

      <Movements money={money} showMovementsTip={showMovementsTip} msg={msg}
        setShowMovementsTip={() => { setShowMovementsTip(false); setShowSettingsTip(true); }} />
      <Toast />
    </ScrollView>
  );
}
