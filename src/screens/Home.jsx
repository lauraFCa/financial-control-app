import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoading } from '../Context';
import Storage from './../database/firebaseMethods';
import Balance from '../components/homeComponents/Balance';
import Header from '../components/homeComponents/Header';
import Menu from '../components/homeComponents/Menu';
import Movements from '../components/homeComponents/Movements';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64

export default function Home({ navigation }) {
  const { showLoading, hideLoading, getShouldRefresh, setShouldRefresh } = useLoading();
  const [moneyGraph, SetMoneyGraph] = useState([{}]);

  const [isRefresh, setIsRefresh] = useState(false);

  const refresh = async () => {
    const doc = await AsyncStorage.getItem('userDoc');
    const fr = new Storage(doc);
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
    let res;
    const getAllData = async () => {
      let isNew = await AsyncStorage.getItem('isNew');

      if (isNew === 'true') {
        setBalanceTip(true);
        await AsyncStorage.removeItem('isNew');
      };

      try {
        showLoading();
        if (getShouldRefresh()) {
          const doc = await AsyncStorage.getItem('userDoc');
          const fr = new Storage(doc);
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
      }

    };


    getAllData().catch(console.error);

  }, [isRefresh]);


  return (
    <ScrollView style={{ marginTop: statusBarHeight, flex: 1 }}>

      <Header userData={userData} navigation={navigation} />

      <Balance showBalanceTip={showBalanceTip} setBalanceTip={setBalanceTip}
        setShowMenuTip={setShowMenuTip} income={income} negative={negative} />

      <Menu refresh={refresh} isRefresh={setIsRefresh} isRef={isRefresh} navigation={navigation} moneyGraph={moneyGraph}
        showMenuTip={showMenuTip} setTip={() => { setShowMovementsTip(true); setShowMenuTip(false); }}
        showSettingsTip={showSettingsTip} setShowSettingsTip={setShowSettingsTip} />

      <Movements money={money} showMovementsTip={showMovementsTip} msg={msg}
        setShowMovementsTip={() => { setShowMovementsTip(false); setShowSettingsTip(true); }} />

    </ScrollView>
  );
}
