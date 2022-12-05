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

const MainQuestion4 = (props) => {

  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const {params} = props.route
    const studentName = params? params.studentName:null;
   
    const [questionTextInput, setQuestionTextInput] = useState("")
  

    const [qData, setQData] = useState(
        {question:
            {q:"Elena, Karla, and Faye are playing a card game where they score points. Karla scores twice the number of points Elena does, and Faye scores 30 points more than Elena does. The sum of their three scores is 114. Who scores more points, Karla or Faye?",
             s1:"Guess the number of points and see if it works.",
             s2:"Write an equation to solve it", 
             s3:"Use a diagram to try and understand the problem",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지 입력한거 유무 확인

    const sQuestion1 = [
      {id :"1-1", sQ:"Ok, you want to guess-and-check. How many points do you want to guess that Elena won?"},
     {id :"1-2", sQ:"Ok, you guessed [x] points for Elena. Then how many would Karla and Faye win?"},
     {id :"1-3", sQ:"Nice work! Now, what do Elena’s, Karla’s and Faye’s scores add up to?"},
     {id :"1-4", sQ:"Nice work! The points for Elena, Karla, and Faye add up to 114, so that seems correct! So who scored the most?"},
    ]

    const sQuestion2 = [
      {id :"2-1", sQ:"What equation will represent the situation? Use the letter “e” as your vairable"},
      {id :"2-2", sQ:"Great! That equation looks good. Now, solve for e and enter your answer."},
      {id :"2-3", sQ:"Ok, Elena scored 21 points. Then how many points did Karla and Faye score?"},
      {id :"2-4", sQ:"So who scored the most?"}
    ]

    const sQuestion3 = [
      {id :"3-1", sQ:"Each tall rectangle is equal to the number of points that Elena won. How many points are ALL of the tall rectangles together?"},
      {id :"3-2", sQ:"Ok, so the four bars represent 84 points. Then how many points did Elena score?"},
      {id :"3-3", sQ:"That seems correct. So then, how many points did Karla and Faye score?"},
      {id :"3-4", sQ:"So who scored the most?"},
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
          q4Text:questionTextInput
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
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={4} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={4} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={4} studentName = {studentName}></Select>

        

         <Button title="다음 문제" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("MainQuestion5", //보낼 js 파일 입력
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

export default MainQuestion4;