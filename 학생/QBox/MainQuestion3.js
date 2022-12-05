//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Button, TextInput, ImageBackground, StatusBar } from 'react-native';
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

const MainQuestion3 = (props) => {

  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const {params} = props.route
    const studentName = params? params.studentName:null;
   
    const [questionTextInput, setQuestionTextInput] = useState("")
  

    const [qData, setQData] = useState(
        {question:
            {q:"Jennifer has 84.5 yards of fabric to make curtains. She makes 6 identical curtains and has 19.7 yards of fabric remaining. How many yards of fabric does Jennifer use per curtain?",
             s1:"Subtract the extra yards and then figure out how much fabric she used for each curtain",
             s2:"Write an equation to solve it", 
             s3:"Use a diagram to try and understand the problem",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지 입력한거 유무 확인

    const sQuestion1 = [
      {id :"1-1", sQ:"Let’s subtract the extra fabric. How much did Jennifer use for 6 curtains?"},
     {id :"1-2", sQ:"Yes! So she used 64.8 yards of fabric for six curtains. Now, how much fabric did she use for one curtain?"}
    ]

    const sQuestion2 = [
      {id :"2-1", sQ:"What equation will represent the situation? Use the letter “m” as your vairable"},
      {id :"2-2", sQ:"Nice job! That equation looks good. Now can you solve for “m”?"}
    ]

    const sQuestion3 = [
      {id :"3-1", sQ:"The shorter rectangles are the curtains. The longer one is the left over fabric. How long is the longer rectangle?"},
      {id :"3-2", sQ:"Great job! Can you find out how long all 6 of the shorter rectangles are combined?"},
      {id :"3-3", sQ:"Fantastic! Now let’s find how long each of those shorter rectangles are."},
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
          q3Text:questionTextInput
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
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={3} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={3} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={3} studentName = {studentName}></Select>

        

         <Button title="다음 문제" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("MainQuestion4", //보낼 js 파일 입력
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

export default MainQuestion3;