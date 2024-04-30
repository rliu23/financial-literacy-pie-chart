
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button, Switch, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
//import PieChart from "react-js-pie-chart";
//import Pie from 'react-native-pie'
//import {LineChart} from 'react-native-charts-wrapper'
import {PieChart} from "react-native-chart-kit";
export default function HomeScreen() {
    const data = [
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

    return (
      <View style={styles.container}>
        <PieChart
            data={data}
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


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});