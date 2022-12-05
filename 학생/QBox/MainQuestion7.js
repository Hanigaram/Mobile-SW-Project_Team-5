//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Button, TextInput ,ImageBackground, StatusBar} from 'react-native';
import React, { useState } from 'react';
import bg from '../assets/bg.jpg'
import { db } from "../firebaseConfig";
import { 
  addDoc, 
  collection, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,  
  where,
  query } from "firebase/firestore";



import Question from '../component/Question';
import Select from '../component/Select';

const MainQuestion7 = (props) => {

  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const {params} = props.route
    const studentName = params? params.studentName:null;
   
    const [questionTextInput, setQuestionTextInput] = useState("")
  

    const [qData, setQData] = useState(
        {question:
            {q:"Jim needs to rent a car. A rental company charges $21.00 per day to rent a car and $0.10 for every mile driven. He will travel 250 miles. He has $115.00 to spend. How many days can he rent the car for?",
             s1:"Write an inequality to solve the problem",
             s2:"Guess and check", 
             s3:"Add up until I find the number of days",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지 입력한거 유무 확인

    const sQuestion1 = [
      {id :"1-1", sQ:"What inequality will represent the situation? Use the letter “d” as your vairable"},
     {id :"1-2", sQ:"Nice job! That inequality looks good. Now can you solve for “d” and enter your answer as an inequality?"},
     {id :"1-3", sQ:"Great! Now based on that inequality, how many days can Jim rent the car for?"},
    ]

    const sQuestion2 = [
      {id :"2-1", sQ:"Ok, you want to guess and check. First, how much will he pay in mileage?"},
      {id :"2-2", sQ:"Cool, so he’s paying $25 in mileage. How many days do you think he can rent the car for? "},
      {id :"2-3", sQ:"Ok, so you think that he can rent it for [x] days. How much would Jim pay in total?"},
    ]

    const sQuestion3 = [
      {id :"3-1", sQ:"Ok, you want to try adding up. Let’s start by finding the cost of driving 250 miles. How much will that cost?"},
      {id :"3-2", sQ:"All right, you say he pays $25 for mileage. Then he has to pay $21 for each day that he rents. How many times can you add $21 without going over $115?"},
    ]

    const onChangeInput = (event) => {
      setQuestionTextInput(event)
    
    }

    

    const updateDB = async ()=>{
      let docId = ""

      try{
        console.log(studentName)
        const q = query(collection(db, "student1"), where('studentName',"==", studentName))
        console.log(q)

        const singleDoc = await getDocs(q);

        singleDoc.forEach((doc)=>{
          console.log(doc.id)
          docId = doc.id //불러온 id값을 docId에 저장
        })
        
        const docRef = doc(db, "student1", docId);
        await updateDoc(docRef, {
          q7Text:questionTextInput
        });
        alert("Updated!!")
        
      }catch(error){
        console.log(error.message)
      }
    }

    return(
        <View style={styles.container}>
        <StatusBar style="auto" />
        
  
        <ImageBackground 
        style={styles.box}
        source = {bg}
        resizeMode = "stretch" 
        >
      
        {/*질문*/}
        <Question contents = {qData.question.q}></Question> 
       

       {state === false ?  //state가 false면 문제에대한 생각을 받는 text 창 뜨게 하기
          <>
           <Text style={{fontWeight: 'bold',fontSize: 25, paddingLeft:20, paddingRight:20}}>What do you think the problem is asking you to do?</Text>
          <TextInput
           style = {styles.input}
           value={questionTextInput}
           onChangeText = {onChangeInput}
           multiline = {true}   
         ></TextInput> 

         <Button title="제출"
            onPress={()=>{
                updateDB(),
                setState(true) // 클릭과 동시에 다음 셀렉문 나오게 state 상태를 전환하기
            }} />
         </>

         : // 텍스트 문구를 받았을 경우 state를 true로 변경 하여 밑에 셀렉문이 뜨게한다.
         <>
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={7} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={7} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={7} studentName = {studentName}></Select>

        

         <Button title="다음 문제" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("MainQuestion8", //보낼 js 파일 입력
                {
                  studentName: studentName //학생이름 다음 페이지로 넘겨주기
                }) 
            }} />
         </>
         }
        
          
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
      backgroundColor: '#fff',
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
      backgroundColor: "#FFF8DC",
      marginTop:20,
      fontSize: 15,
      padding:10,
      marginBottom: 20,
      borderWidth:1,
      borderRadius:20,
      
  
    }
  });

export default MainQuestion7;