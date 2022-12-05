//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Button, TextInput, ImageBackground, StatusBar } from 'react-native';
import React, { useState } from 'react';
import bg2 from '../assets/bg2.jpg'
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

const MainQuestion8 = (props) => {

  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const {params} = props.route
    const studentName = params? params.studentName:null;
   
    const [questionTextInput, setQuestionTextInput] = useState("")
  

    const [qData, setQData] = useState(
        {question:
            {q:"Owen is designing a rectangular garden whose length is 25 feet. He needs to put fencing all around the exterior of the garden and wants to use less than 80 feet of fencing. How wide could the garden be?",
             s1:"Guess and check",
             s2:"Write an inequality to solve the problem", 
             s3:"Add up until I figure out the width of the garden.",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지 입력한거 유무 확인

    const sQuestion1 = [
      {id :"1-1", sQ:"Ok, you want to guess and check. First, how much fencing will he need for the two sides of the fence that go along the length of the garden?"},
     {id :"1-2", sQ:"Ok, you said he will need 50 feet of fencing for the sides that go along the length of the garden. So, what is the widest garden that you think he could make?"},
     {id :"1-3", sQ:"Ok, so you’re guessing the garden would be [x] feet wide. How much fencing would he need to make the two sides that go along the width?"},
     {id :"1-4", sQ:"Ok, if that’s true, then how much fencing would he use all together to make his rectangular garden fence? work!"}
    ]

    const sQuestion2 = [
      {id :"2-1", sQ:"What inequality will represent the situation? Use the letter w as your variable."},
      {id :"2-2", sQ:"Great! That inequality makes sense. Now, solve for w and enter your answer as an inequality"},
      {id :"2-3", sQ:"Nice work! If that’s correct, then how wide could the fence be?"}
    ]

    const sQuestion3 = [
      {id :"3-1", sQ:"Ok, you want to try adding up. Let’s start by thinking about the two sides along the length of the garden. How much fence will Owen use for those sides?"},
      {id :"3-2", sQ:"ll right, you say he’ll use 50 feet of fencing for the two sides along the length. Now, how much fencing can you add without going over 80 feet? "},
      {id :"3-3", sQ:"All right, so if you can add 30 feet of fencing before running out, then how wide could the garden be?"},
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
          q8Text:questionTextInput
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
        source = {bg2}
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
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={8} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={8} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={8} studentName = {studentName}></Select>

         

        

         <Button title="제출" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("Finish", //보낼 js 파일 입력
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

export default MainQuestion8;