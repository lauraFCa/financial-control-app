import { BarChart } from "react-native-chart-kit";
import { Dimensions, View, StyleSheet, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function MoneysGraph({ bardata, name, color }) {

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0,
        strokeWidth: 1,
        barPercentage: 0.5,
        color: () => { return color }
    };


    return (
        <View style={styles.graphGroup}>
            <Text style={styles.txt}>{name.replace("/", " x ")}</Text>
            <BarChart
                width={screenWidth - 20}
                height={220}
                data={bardata}
                yAxisLabel=""
                chartConfig={chartConfig}
                fromZero={true}
                showValuesOnTopOfBars={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500'
    },
    graphGroup: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 139,.2)',
        margin: 10,
        padding: 5
    }
})