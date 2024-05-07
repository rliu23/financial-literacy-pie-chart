
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, TextInput, Button, Switch, Touchable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
//import PieChart from "react-js-pie-chart";
//import Pie from 'react-native-pie'
//import {LineChart} from 'react-native-charts-wrapper'
import {PieChart} from "react-native-chart-kit";

const DismissKeyboard = ({ children }) => (
    // Dismiss keyboard when tapping anywhere
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );

export default function HomeScreen(route) {
    const COOL_COLORS = ["#578CFF", "#8E57FF", "#5758FF", "#57C1FF", "#C557FF", "#78FFA0", "#78FFFB", "#77FFCC", "#78D8FF"];
    const WARM_COLORS = ["#FFFD40", "#FFB840", "#FF9A40", "#FF5B64", "#FF70B6", "#FF6238"]
    /*console.log("route data below");
    console.log(route)      
    console.log(route.key);*/
    const { data } = route?.route?.params ?? { data: [] };
    const [budget, setBudget] = useState('');

    const handlePress = () => {
        const navigate = useNavigation();
        navigation.replace("Input");
    };
    console.log("data read from Home page below");
    console.log(data);

    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.inputText}>Enter data in Input Screen to display data.</Text>
                {/*
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handlePress}
                    underlayColor='white'>
                    <Text style={styles.navText}>Go to Input Screen</Text>
                </TouchableOpacity>
                */}
                
            </View>
        )
    }
    else {
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };
        const chartData = data.sort((a, b) => (a.isFixed === b.isFixed) ? 0 : a.isFixed ? 1 : -1)
        .map((field, index) => ({
            name: field.title,
            amount: parseInt(field.value) || 0,
            fixed: field.isFixed,
            color: field.isFixed ? COOL_COLORS[index % COOL_COLORS.length] : WARM_COLORS[index % WARM_COLORS.length],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }));
        const fixedData = data.filter(field => field.isFixed).map((field, index) => ({
            name: field.title,
            amount: parseInt(field.value) || 0,
            fixed: field.isFixed,
            color: COOL_COLORS[index % COOL_COLORS.length], // Cycle through the predefined colors
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }));
        const notFixedData = data.filter(field => !field.isFixed).map((field, index) => ({
            name: field.title,
            amount: parseInt(field.value) || 0,
            fixed: field.isFixed,
            color: WARM_COLORS[index % WARM_COLORS.length], // Cycle through the predefined colors
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }));
        /*
        // Add budget data item
        chartData = setBudget(chartData => [
            ...chartData,
            {
                name: "remainingBudget",
                // MIGHT ERROR WHEN SWITCHING FROM INPUT TO HOME WITH SOMETHING ALREADY IN TEXT FIELD
                amount: parseInt(0),
                color: COLORS[prevChartData.length % COLORS.length], // Calculate color index based on existing items
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ]);
        const totalAmount = chartData.reduce((total, data) => total + data.amount, 0);
         */

        console.log("chartdata below");
        console.log(chartData);

        
/*
        const handleBudgetChange = (value) => {
            const index = chartData.findIndex(item => item.name === "remainingBudget");

            if (index !== -1) {
                const updatedChartData = [...chartData]; // Copy of chartData
                // Update the field you want to change
                updatedChartData[index] = {
                    ...updatedChartData[index],
                    // Update field value
                    amount: value
                };
                chartData = updatedChartData;
            }
            else {
                console.log("BUDGET ERROR OCCURRED !!!")
            }

            
        }*/
        const totalAmount = 0;

        if (totalAmount > budget) {
            return (
                <DismissKeyboard> 
                <View>
                    <Text>
                        Expenses (${totalAmount}) greater than income (${budget}).
                        Enter greater income or reduce expenses.
                    </Text>
                    <Text style={{fontSize:18, paddingVertical:5}}>
                        Total Income
                    </Text>
                    <TextInput
                        placeholder="Enter monthly income"
                        keyboardType="numeric"
                        style={styles.input}
                        value={budget}
                        // onChangeText={handleBudgetChange}
                    />
                </View>
                </DismissKeyboard>
                
            )
        }
        else {
            return (
                <ScrollView bounces={false}>
                <DismissKeyboard>
                
                <View style={styles.container}>
                    <Text style={{fontSize:18, paddingVertical:5}}>
                        Total Income
                    </Text>
                    <TextInput
                        placeholder="Enter monthly income"
                        keyboardType="numeric"
                        style={styles.input}
                        value={budget}
                        //onChangeText={handleBudgetChange}
                    />
                    <Text style={{fontSize:18, paddingTop:20}}>
                    All Expenses
                    </Text>
                    <PieChart
                        data={chartData}
                        width={400}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 10]}
                        absolute
                    />
                    <Text style={{fontSize:18, paddingTop:15}}>
                    Fixed Expenses
                    </Text>
                    <PieChart
                        data={fixedData}
                        width={400}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 10]}
                        absolute
                    />
                    <Text style={{fontSize:18, paddingTop:15}}>
                    Variable Expenses
                    </Text>
                    <PieChart
                        data={notFixedData}
                        width={400}
                        height={200}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 10]}
                        absolute
                    />
                </View>
                
                </DismissKeyboard>
                </ScrollView>
            )

        }

        
        
    }
}
/*
export default function HomeScreen({ route }) {
    
    

    if (data != []) {
        const chartData = data.map((field, index) => ({
            name: field.category,
            amount: parseInt(field.amount),
            color: COLORS[index % COLORS.length], // Cycle through the predefined colors
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }));
    }
    
    

    const data1 = [
        {
          name: "Rent",
          population: 1000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Food",
          population: 200,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Savings",
          population: 2000,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Utilities",
          population: 400,
          color: "dodgerblue",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];

    

    return (
      <View style={styles.container}>
        <PieChart
            data={data1}
            width={400}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 10]}
            absolute
        />

        

    
    </View>
    )
  }
*/



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 19,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 5,
    },
    navText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 5,
    },
    navButton: {
        margin: 10,
        alignSelf: 'center',
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
        width: '40%',
    },
    input: {
        fontSize: 19,
        height: 40,
        borderColor: 'rgba(200,200,200,5)',
        borderWidth: 1,
        paddingHorizontal: 5,
        borderRadius: 4,
      },
});