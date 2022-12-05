//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, StatusBar } from 'react-native';
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



  import Question from '../component/Question'; //문제지를 위한 컴포넌트
  import Select from '../component/Select'; // 세가지 선택지의 각 선택지 생성하기 위한 컴포넌트

const MainQuestion2 = (props) => {
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const {params} = props.route //학생 명을 받아오기 위함
    const studentName = params? params.studentName:null; //학생명을 그대로 변수에 넣어줌
   
    const [questionTextInput, setQuestionTextInput] = useState("")
  

    const [qData, setQData] = useState(
        {question:
            {q:"Jen wants to run a total of 22 miles in five days. The table shows her log for the miles she ran on Monday, Tuesday, Wednesday, and Thursday. How many miles must Jen run on Friday to reach her goal?",
             s1:"Add up her miles and then find out how many more she needs to get to 22 miles",
             s2:"Write an equation to solve it", 
             s3:"Subtract her miles from 22 and see how many are left",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지 입력한거 유무 확인

    const sQuestion1 = [
      {id :"1-1", sQ:"Let’s add up Jen’s total from Monday through Thursday. How many miles has she run?"},
     {id :"1-2", sQ:"OK, if she ran 16 1/8 miles, how many more does she have to run to reach 22 miles?"}
    ]

    const sQuestion2 = [
      {id :"2-1", sQ:"What equation will represent the situation? Use the letter “m” as your vairable"},
      {id :"2-2", sQ:"Your equation is equivalent to 16  1/8 + m = 22. Can you solve for m?"}
    ]

    const sQuestion3 = [
      {id :"3-1", sQ:"Let’s subtract Jen’s miles from Monday through Friday from 22. How many miles does Jen have left to run?"},
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
          q2Text:questionTextInput
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
       

       {state === false ?  //state가 false면 문제에대한 생각을 받는 text 창 활성화
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
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={2} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={2} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={2} studentName = {studentName}></Select>

        

         <Button title="다음 문제" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("MainQuestion3", //다음 문제로 이동
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

export default MainQuestion2;