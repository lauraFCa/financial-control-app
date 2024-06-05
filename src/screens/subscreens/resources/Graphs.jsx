import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Ionicons } from '@expo/vector-icons';

import { useLoading } from "../../../Context";


const screenWidth = Dimensions.get("window").width;
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64;


export default function Graphs({ route, navigation }) {

    const { showLoading, hideLoading } = useLoading();

    const [moneyFlow, setMoneyFlow] = useState([]);
    const [incomeData, setIncomeData] = useState(null);
    const [expensesData, setExpensesData] = useState(null);

    useEffect(() => {

        showLoading();
        let dt = route.params.allData;

        //money flow
        let newFlow = [];
        if (dt.moneyFlow) {
            dt.moneyFlow.forEach(element => {
                newFlow.push({
                    name: element.name === "expenses" ? "Gastos" : "Receitas",
                    value: parseFloat(element.value),
                    color: element.name === "expenses" ? '#990000' : "#008060"
                })
            });
        }
        setMoneyFlow(newFlow);

        //income
        let incomes1 = dt.incomes;
        let newIncomes = {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        };
        if (incomes1) {
            incomes1.forEach(element => {
                newIncomes.labels.push(element.description);
                newIncomes.datasets[0].data.push(parseFloat(element.value));
            });
            setIncomeData(newIncomes);
        }

        //expenses
        let expenses1 = dt.expenses;
        let newExpenses = {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        };
        if (expenses1) {
            expenses1.forEach(element => {
                newExpenses.labels.push(element.description);
                newExpenses.datasets[0].data.push(parseFloat(element.value));
            });
            setExpensesData(newExpenses);
        }

        hideLoading();
    }, [])


    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0,
        strokeWidth: 1,
        barPercentage: 0.5,
    };

    const lineChartConfig = {
        ...chartConfig,
        color: (opacity = 1) => `rgba(139, 16, 0, ${opacity})`
    }

    const barChartConfig = {
        ...chartConfig,
        color: (opacity = 1) => `rgba(0, 139, 93, ${opacity})`
    };


    return (
        <View style={{ marginTop: statusBarHeight, height: '100%' }}>
            <TouchableOpacity style={styles.back} onPress={() => { navigation.navigate("MoreOptions") }}>
                <Ionicons name="arrow-back" size={18} color="darkblue" />
            </TouchableOpacity>
            <Text style={[styles.title, { marginTop: 8, paddingHorizontal: 8 }]}>Minhas Finanças</Text>

            <ScrollView style={{ marginBottom: statusBarHeight + 20 }}>

                <View style={styles.graphGroup}>
                    <Text style={styles.graphTitle}>Gastos X Receitas</Text>
                    {moneyFlow ?
                        <PieChart
                            data={moneyFlow}
                            width={screenWidth - 20}
                            height={220}
                            chartConfig={{
                                ...chartConfig,
                                color: () => `rgba(0, 0, 139, 1)`
                            }}
                            accessor={"value"}
                            backgroundColor={"transparent"}
                        />
                        : <Text style={{ margin: 20 }}>Sem dados</Text>
                    }
                </View>

                <View style={styles.graphGroup}>
                    <Text style={styles.graphTitle}>Receitas</Text>
                    {incomeData ?
                        <BarChart
                            width={screenWidth}
                            height={300}
                            data={incomeData}
                            yAxisLabel="R$"
                            yLabelsOffset={0}
                            chartConfig={barChartConfig}
                            fromZero={true}
                        />
                        : <Text style={{ margin: 20 }}>Sem dados</Text>
                    }
                </View>

                <View style={styles.graphGroup}>
                    <Text style={styles.graphTitle}>Gastos</Text>
                    <FlashMessage duration={5000} />
                    {expensesData ?
                        <LineChart
                            bezier
                            width={screenWidth - 20}
                            height={300}
                            data={expensesData}
                            yAxisLabel="R$"
                            yAxisSuffix=""
                            verticalLabelRotation={20}
                            chartConfig={lineChartConfig}
                            fromZero={true}
                            onDataPointClick={({ value, index, getColor }) => {
                                showMessage({
                                    message: `R$ ${value}`,
                                    description: `${expensesData.labels[index]}`,
                                    backgroundColor: getColor(.5)
                                })
                            }
                            }
                        />
                        : <Text style={{ margin: 20 }}>Sem dados</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    graphTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
    },
    graph: {
        fontSize: 16,
        textAlign: 'center'
    },
    graphGroup: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 139,.2)',
        margin: 10,
        padding: 5
    },
    back: {
        marginHorizontal: 10,
        marginVertical: 8,
        position: 'absolute',
        top: 6,
        zIndex: 99,
        borderRadius: 100,
        borderWidth: 2,
        padding: 5,
        borderColor: 'darkblue'
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center"
    },
})