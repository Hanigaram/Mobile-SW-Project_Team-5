//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';


// 총 8개의 문제를 위한 js파일과 마지막을 알려주는 Finish파일
import MainQuestion1 from './QBox/MainQuestion1';
import MainQuestion2 from './QBox/MainQuestion2';
import MainQuestion3 from './QBox/MainQuestion3';
import MainQuestion4 from './QBox/MainQuestion4';
import MainQuestion5 from './QBox/MainQuestion5';
import MainQuestion6 from './QBox/MainQuestion6';
import MainQuestion7 from './QBox/MainQuestion7';
import MainQuestion8 from './QBox/MainQuestion8';
import Finish from './component/Finish';

const Stack = createStackNavigator(); //네비게이터 사용

export default function App() {
 

 return(
  <NavigationContainer>
    
     {/* 초기 1번문제부터 풀게하기 위해 initialRouteName='MainQuestion1'로 설정*/}
    <Stack.Navigator initialRouteName='MainQuestion1'> 
      <Stack.Screen name = "MainQuestion1" component={MainQuestion1}/>
      <Stack.Screen name = "MainQuestion2" component={MainQuestion2}/>
      <Stack.Screen name = "MainQuestion3" component={MainQuestion3}/>
      <Stack.Screen name = "MainQuestion4" component={MainQuestion4}/>
      <Stack.Screen name = "MainQuestion5" component={MainQuestion5}/>
      <Stack.Screen name = "MainQuestion6" component={MainQuestion6}/>
      <Stack.Screen name = "MainQuestion7" component={MainQuestion7}/>
      <Stack.Screen name = "MainQuestion8" component={MainQuestion8}/>
      <Stack.Screen name = "Finish" component={Finish}/>


 
    </Stack.Navigator>
  </NavigationContainer>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22
  },
  
});
