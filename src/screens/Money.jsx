import { useEffect, useState } from "react"
import { useLoading } from "../Context";
import ApiRequests from "../server/apidata";
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MoneysGraph from "../components/MoneysGraph";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 64


const api = new ApiRequests();

export default function Money({ navigation }) {

    const { showLoading, hideLoading } = useLoading();
    const [pesoName, setPesoName] = useState("");
    const [dolarName, setDolarName] = useState("");
    const [euroName, setEuroName] = useState("");

    const moedas = ["ARS-BRL", "EUR-BRL", "USD-BRL"];
    const [dolar, setDolar] = useState(null);
    const [euro, setEuro] = useState(null);
    const [peso, setPeso] = useState(null);


    useEffect(() => {
        const getMoney = async () => {
            showLoading();
            try {
                var outp = await api.getMoneyData(moedas);

                let arg = outp[moedas[0].replace("-", "")];
                let eur = outp[moedas[1].replace("-", "")];
                let us = outp[moedas[2].replace("-", "")];

                setDolarName(us["name"]);
                setPesoName(arg["name"]);
                setEuroName(eur["name"]);

                let meuro = {
                    labels: [eur["code"], eur["codein"]],
                    datasets: [
                        {
                            data: [parseFloat(eur["ask"]), parseFloat(1)]
                        }
                    ]
                };
                setEuro(meuro);

                let mpeso = {
                    labels: [arg["code"], arg["codein"]],
                    datasets: [
                        {
                            data: [parseFloat(arg["ask"]), parseFloat(1)]
                        }
                    ]
                };
                setPeso(mpeso);

                let mdolar = {
                    labels: [us["code"], us["codein"]],
                    datasets: [
                        {
                            data: [parseFloat(us["ask"]), parseFloat(1)]
                        }
                    ]
                };
                setDolar(mdolar);

            }
            catch (e) { console.log(e) } finally {
                hideLoading();
            }
        }

        getMoney();
    }, [])


    return (
        <View style={{ marginTop: statusBarHeight }}>
            <TouchableOpacity style={styles.back} onPress={() => { navigation.navigate("Home") }}>
                <Ionicons name="home" size={18} color="darkblue" />
            </TouchableOpacity>
            <ScrollView style={{ marginTop: 16, paddingHorizontal: 8 }}>

                <Text style={styles.title}>Cotações</Text>

                {peso ? <MoneysGraph color={"rgb(0, 139, 93)"} bardata={peso} name={pesoName} />
                    : <View style={styles.load}></View>}

                {dolar ? <MoneysGraph color={"rgb(163, 39, 23)"} bardata={dolar} name={dolarName} />
                    : <View style={styles.load}></View>}

                {euro ? <MoneysGraph color={"rgb(163, 39, 23)"} bardata={euro} name={euroName} />
                    : <View style={styles.load}></View>}

            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
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
    load: {
        padding: 12,
        marginBottom: 24,
        marginLeft: 12
    }
})