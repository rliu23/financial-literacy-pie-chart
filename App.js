import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScreen from './screens/input';
import { Feather } from '@expo/vector-icons';
import HomeScreen from './screens/home'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Screens() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => 
            (<Feather name="home" color={color} size={size} />),
          }}
      />
      <Tab.Screen name="Input" component={InputScreen}
        options={{
          tabBarIcon: ({ color, size }) => 
          (<Feather name="edit-3" color={color} size={size} />),
        }}
      />
    </Tab.Navigator>

      )
}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Container" component={Screens} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Input" component={InputScreen}/>
   </Stack.Navigator>
    </NavigationContainer>
  );
}





