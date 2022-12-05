//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, Button, TextInput, ImageBackground,StatusBar } from 'react-native';
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

const MainQuestion5 = (props) => {

  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const {params} = props.route
    const studentName = params? params.studentName:null;
   
    const [questionTextInput, setQuestionTextInput] = useState("")
  

    const [qData, setQData] = useState(
        {question:
            {q:"Mario is setting up a new tent during a camping trip. The tent came with 7 feet of rope. The instructions are to use 34.5 inches of the rope to tie a tarp on top of the tent. Then, the remaining rope should be cut into 8¼-inch sections to tie the tent to stakes in the ground. Mario will use all of the rope as instructed. Write and solve an equation to determine the number of 8¼-inch sections of rope Mario can cut from the rope.",
             s1:"Write equations to solve the problem",
             s2:"Add on from 34.5 inches until I use up all the rope", 
             s3:"Subtract from the total until I get to 0",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지 입력한거 유무 확인

    const sQuestion1 = [
      {id :"1-1", sQ:"What equation will represent the situation? Use the letter “m” as your vairable"},
     {id :"1-2", sQ:"Nice job! That equation looks good. Now can you solve for “m”?"}
    ]

    const sQuestion2 = [
      {id :"2-1", sQ:"Ok, you want to add on sections to 34.5 inches until you use up all the rope. First, how many inches of rope does Mario have?"},
      {id :"2-2", sQ:"How many times can you add 8¼ inches to 34.5 inches to get 84 inches?"}
    ]

    const sQuestion3 = [
      {id :"3-1", sQ:"Ok, you want to subtract from the total. Start by subtracting 34.5 inches. How much rope does Mario have left?"},
      {id :"3-2", sQ:"Nice work! Now, how many times can Mario cut 8¼-inch sections from the rope before he has no rope left?"},
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
          q5Text:questionTextInput
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
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={5} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={5} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={5} studentName = {studentName}></Select>

        

         <Button title="다음 문제" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("MainQuestion6", //보낼 js 파일 입력
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

export default MainQuestion5;