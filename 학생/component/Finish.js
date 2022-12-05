import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  Dimensions, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import bg from '../assets/bg.jpg'



const windowWidth = Dimensions.get('window').width; //핸드폰 크기에 맞춰 넓이 및 높이 알맞게 설정
const windowHeight = Dimensions.get('window').height;


const Finish = () => { //문제를 푼 이후 마지막 페이지
   

    return(
        
        <View style={styles.container}>
        <StatusBar style="auto" />
        
  
        <ImageBackground 
        style={styles.box}
        source = {bg}
        resizeMode = "stretch" 
        >
        <Text style={{fontWeight: 'bold',fontSize: windowWidth*0.1, alignItems: 'center', color: "black", borderColor: "#33691E", marginRight: 15, marginLeft: 15,}}>
          Congratulations!!! 
          </Text>

       
        
        </ImageBackground>
        
        
      </View>
    )
}

const styles = StyleSheet.create({
    box:{
        width:"100%",
        height:"100%",
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 22
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {
      width: '50%',
      height: '30%',
      backgroundColor: "#cecece",
      marginTop:20,
      fontSize: 15,
      padding:10,
      marginBottom: 20,
      
  
    }
  });

export default Finish;