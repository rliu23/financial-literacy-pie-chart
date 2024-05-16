
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, TextInput, Button, Switch, Touchable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
// Other potential Pie Chart libraries in case react-native-chart-kit becomes outdated.
//import PieChart from "react-js-pie-chart";
//import Pie from 'react-native-pie'
//import {LineChart} from 'react-native-charts-wrapper'
import {PieChart} from "react-native-chart-kit";
import "react-native-reanimated"

const DismissKeyboard = ({ children }) => (
    // Dismiss keyboard when tapping anywhere
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );

export default function HomeScreen(route) {
    // Warm colors are variable, cool colors are fixed.
    const COOL_COLORS = ["#0AF869", "#578CFF",  "#C557FF", "#8E57FF",   "#77FFCC", "#57C1FF",  "#78FFFB", ];
    const WARM_COLORS = ["#FFFF00", "#FFB840", "#FC7904", "#FF1212", "#FF70B6", "#FFCAFF"]
    
    const { data } = route?.route?.params ?? { data: [] };
    var { budget } = route?.route?.params ?? { budget: 0 };

    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.inputText}>Enter expenses in Input Screen to display data.</Text>
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
        var chartData = data.sort((a, b) => (a.isFixed === b.isFixed) ? 0 : a.isFixed ? -1 : 1)
        .map((field, index) => ({
            name: field.title,
            amount: parseInt(field.value) || 0,
            fixed: field.isFixed,
            color: field.isFixed ? WARM_COLORS[index % WARM_COLORS.length] : COOL_COLORS[index % COOL_COLORS.length],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        }));
        
        const fixedData = data.filter(field => !field.isFixed).map((field, index) => ({
            name: field.title,
            amount: parseInt(field.value) || 0,
            fixed: field.isFixed,
            color: COOL_COLORS[index % COOL_COLORS.length], // Cycle through the predefined colors
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }));

        const notFixedData = data.filter(field => field.isFixed).map((field, index) => ({
            name: field.title,
            amount: parseInt(field.value) || 0,
            fixed: field.isFixed,
            color: WARM_COLORS[index % WARM_COLORS.length], // Cycle through the predefined colors
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        }));
        
        
     
        const expenses = chartData.reduce((total, data) => total + data.amount, 0);
       
        const remainingBudget = budget - expenses;

        // Adding remaining budget item to all expenses pie chart.
        const budgetItem = {
            name: "Remaining",
            amount: parseFloat(remainingBudget), 
            fixed: false, 
            color: "#EFEFEF", 
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        };
        chartData = [
            ...chartData,
            budgetItem
        ]

        if (budget == "") {
            budget = 0;
        }
        if (expenses > budget) {
            return (
                <DismissKeyboard> 
                <View style={styles.container}>
                    <Text style={{fontSize:19, marginHorizontal: 15, textAlign: 'center',}}>
                        Expenses (${expenses}) greater than budget (${budget}).
                        Enter greater budget or reduce expenses on Input Screen.
                    </Text>
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
                        Budget
                    </Text>
                    <TextInput
                        placeholder="Budget"
                        keyboardType="numeric"
                        style={styles.input}
                        value={budget}
                        editable={false}
                    />
                    <View style={styles.expenseContainer}>
                        <Text style={styles.titleText}>Expenses</Text>
                        <Text style={styles.titleText}>Remaining Budget</Text>
                    </View>
                    <View style={{flex: 1,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  paddingHorizontal: 20, }}>
                        <Text style={styles.expenseText}>{expenses}</Text>
                        <View style={{width: 145,}}></View>
                        <Text style={styles.expenseText}>{remainingBudget}</Text>
                        
                    </View>
                    <Text style={{fontSize:18, paddingTop:20}}>
                    All Expenses
                    </Text>
                    <PieChart
                        data={chartData}
                        width={400}
                        height={250}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"-10"}
                        center={[20, 10]}
                        absolute
                    />
                    <Text style={{fontSize:18, paddingTop:15}}>
                    Fixed Expenses
                    </Text>
                    <PieChart
                        data={fixedData}
                        width={400}
                        height={250}
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
                        height={250}
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        flex:1, 
        textAlign: 'center', 
        fontSize:18, 
        paddingVertical:15,
    },
    expenseContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    expenseText: {
        borderColor: 'rgba(200,200,200,.2)',
        borderWidth: 1,
        borderRadius: 1,
        justifyContent: 'center',
        fontSize: 19,
        paddingHorizontal: 20,
        paddingVertical: 5,

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
        fontSize: 19.5,
        height: 40,
        borderColor: 'rgba(200,200,200,.2)',
        borderWidth: 1,
        paddingHorizontal: 30,
        borderRadius: 1,
    },
});