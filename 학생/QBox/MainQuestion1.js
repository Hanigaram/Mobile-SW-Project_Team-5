//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground , StatusBar } from 'react-native';
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


import { EnrollModal } from '../component/Modal'; //학생이름을 등록하기 위한 모달 컴포넌트
import Question from '../component/Question'; //문제지를 위한 컴포넌트
import Select from '../component/Select'; // 세가지 선택지의 각 선택지 생성하기 위한 컴포넌트


const MainQuestion1 = (props) => {
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

    const [studentName, setStudentName] = useState("") //학생이름
    const [questionTextInput, setQuestionTextInput] = useState("") //초기 문제에대한 생각을 담는 useState
    

    const [qData, setQData] = useState(
        // 1번문제의 주요 Question과 세가지의 선택지에 들어갈 String값들을 저장
        {question:
            {q:"Todd orders pictures from a photographer. Each picture costs $7.50. A one-time shipping fee of $3.25 is added to the cost of the order.The total cost of Todd’s order before tax is $85.75. How many pictures did Todd order?",
             s1:"Write an equation to solve the problem",
             s2:"Add on the shipping fee until I get to $85,75.", 
             s3:"Subtract away from $85,75 until I get to O.",
            },
           })
     

    const [state, setState] = useState(false) //처음 문제에 대해 어떻게 생각하는지를 입력한것에 대한 유무 확인

    const sQuestion1 = [ //첫번째 선택지의 소문제 정보들
      {id :"1-1", sQ:"OK. Using p to represent the number of pictures, write an equation that represents how p, $7.50 per picture, and the $3.25 shipping fee combine to make $85.75"},
     {id :"1-2", sQ:"Ok, your equation is equivalent to 3.25 + 7.50p = 85.75 Can you solve to find the value of p?"}
    ]

    const sQuestion2 = [ //두번째 선택지의 소문제 정보들
      {id :"2-1", sQ:"OK, let’s try that. Start from $3.25. How many times do you have to add $7.50 to get to $85.75?"},
    ]

    const sQuestion3 = [ //세번째 선택지의 소문제 정보들
      {id :"3-1", sQ:"OK. Start with $85.50. Subtract the shipping fee, then count how many times you have to subtract $7.50 to get to 0."},
    ]

    const onChangeInput = (event) => { //문제에 대한 생각을 입력받는 순간 바로 적용
      setQuestionTextInput(event)
    
    }

    

    const updateDB = async ()=>{ //문제에 대한 생각을 쓴 내용을 DB에 넣기 위한 함수

      let docId = "" //매 순간 업데이트를 위해 지역변수 let사용

      try{
        
        const q = query(collection(db, "student1"), where('studentName',"==", studentName)) //학생이름 비교하여 입력하고 있는 사람을 동일시 하게 함
        

        const singleDoc = await getDocs(q); //해당 쿼리문을 기반으로 하여 문서들로 뽑아옴

        singleDoc.forEach((doc)=>{ //해당 문서들을 반복문을 통해 하나씩 표시 -> 학생이름은 중복이 없으므로 한번만 수행하는 것을 이용 (같은 학생명의 경우 학생1, 학생2로 사전에 통지)
          console.log(doc.id)
          docId = doc.id //불러온 id값을 docId에 저장
        })
        
        const docRef = doc(db, "student1", docId); //수정할때 문서reference를 입력하기 위해 (db, 컬렉션명, 해당 문서의id값) 로 적용
        await updateDoc(docRef, { //수정부분
          q1Text:questionTextInput //첫번째 문제의 생각 값 DB에 적용
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
  
      {/* 학생이름을 등록하기 위한 Modal이며 학생명을 사용하기 위해 props로 학생명과 set함수를 넘겨 사용*/}
      <EnrollModal studentName = {studentName} setStudentName={setStudentName}></EnrollModal>
      
        {/*질문부분이며 메인 질문에 대한 값들을 props를 통해 넘겨줌*/}
        <Question contents = {qData.question.q}></Question> 
        
        {/*TouchableOpacity를 안감싼 이유는 select.js에 부여함으로서 app.js에서 코드를 깔끔하게 하기 위함*/}
        {/* name = 선택지의 텍스트, alarm = 어떤 선택지인지 확인*/}
        

       {state === false ?  //state(문제에 대한 생각을 받았는지)가 false면 문제에대한 생각을 받는 text 창 뜨게 하기
          <>
          <Text style={{fontWeight: 'bold',fontSize: 20, paddingLeft:20, paddingRight:20}}>What do you think the problem is asking you to do?</Text>
          <TextInput
           style = {styles.input}
           value={questionTextInput}
           onChangeText = {onChangeInput}
           multiline = {true}   
         ></TextInput> 

         <Button title="제출"
            onPress={()=>{
                updateDB(), //총 문제에대한 생각 값 DB저장
                setState(true) // 클릭과 동시에 다음 셀렉문 나오게 state 상태를 전환하기
            }} />
         </>

         : // 텍스트 문구를 받았을 경우 state를 true로 변경 하여 밑에 셀렉문이 뜨게한다.
         <>
         {/* name = 선택지의 텍스트, sQuestion = 소문제의 정보들, sNumber = 해당 소문제가 몇번째인지, qNumber = 몇번째 메인 Question인지 표시, studentName = DB에 어떤 학생인지 넣기위해 학생명 넘겨줌*/}
         <Select name = {qData.question.s1} sQuestion={sQuestion1} sNumber="1" qNumber={1} studentName = {studentName}></Select>   
         <Select name={qData.question.s2} sQuestion={sQuestion2} sNumber="2" qNumber={1} studentName = {studentName}></Select>
         <Select name={qData.question.s3} sQuestion={sQuestion3} sNumber="3" qNumber={1} studentName = {studentName}></Select>

         

         <Button title="다음 문제" color="black" width="50%"
            onPress={()=>{
                props.navigation.navigate("MainQuestion2", //두번째 문제로 넘기기
                {
                    
                  studentName: studentName //학생이름 다음 페이지로 넘겨주기 (DB저장을 위해)
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

export default MainQuestion1;