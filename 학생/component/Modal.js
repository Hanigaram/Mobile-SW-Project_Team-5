import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
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

const EnrollModal = (props) => {  //학생등록
  const [modalVisible, setModalVisible] = useState(true); //true 로 시작하자마자 보이게 함 (학생이름을 저장하기 위함)
  const [enrollTextInput, setEnrollTextInput] = useState("") //학생명을 받은 것
  
  
 

  const addtoDB = async ()=>{ //학생명 DB에 저장
    try{
      await addDoc(collection(db, "student1" ), {
        studentName: props.studentName,
        
        
      });
      alert("Added!!")
      
    }catch(error){
      console.log(error.message)
    }
  }

  const onChangeInput = (event) => {
    setEnrollTextInput(event)
    props.setStudentName(event)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}> 
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enroll your name!!!</Text>

            <TextInput 
            value={enrollTextInput}
            style = {styles.input}
            onChangeText = {onChangeInput}
            />

            <Pressable // 저장을 위한 버튼 부분
              style={[styles.button, styles.buttonClose]}
              onPress={() => { addtoDB(), setModalVisible(!modalVisible)} //학생이름을 입력후 저장, 입력할 받기 위한 모달 안보이게 변경
            }
              
            >
              <Text style={styles.textStyle}>Sign up</Text> 
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style = {{fontWeight: 'bold', fontSize: 20, paddingBottom:20}}>
        {/*적용한 학생이름을 페이지에 보이게 함 (첫페이지에서 확인하기 위함) */}
        학생이름: {props.studentName} 
        </Text>  
      
      
    </View>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////////////// 셀렉 모달
const SelectModal = (props) => {  //선택지의 문제에 대한 모달
 
  const [answerTextInput, setAnswerTextInput] = useState("") //각 소문제에 대한 입력값
 
  

  const onChangeInput = (event) => {
    setAnswerTextInput(event)
  }

  

  // 제출(DB저장)
  const updateDB = async ()=>{
    let docId = ""

    try{
      
      const q = query(collection(db, "student1"), where('studentName',"==", props.studentName))
      

      const singleDoc = await getDocs(q);

      singleDoc.forEach((doc)=>{
        console.log(doc.id)
        docId = doc.id //불러온 id값을 docId에 저장
      })
      
      let answer = "q"+ props.qNum + "_s" + props.sNum + "_" + `${props.flag+1}` //db 변수값 설정-> q문제번호_s소문제번호_소문제의문제번호 
      
      console.log(answer)

      const docRef = doc(db, "student1", docId);

      let tempData = {};
      
      tempData[answer] = answerTextInput //필드명 = 입력한 값 형태
      await updateDoc(docRef, tempData);

      
      alert("Updated!!")
      
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true} 
        visible={props.modalVisible} //모달이 보여지는지에 대한 상황을 받아서 보여짐
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.setModalVisible(!props.modalVisible);
          
        }}
      >
        <View style={styles.centeredView}> 
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.sQ}</Text>

            <TextInput 
            value={answerTextInput}
            style = {styles.input}
            onChangeText = {onChangeInput}
            />

            <Pressable // 소문제에 대한 입력 제출버튼 부분
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.flag+1 == props.endFlag  //삼항 연산자를 통해 현재 소문제의 번호가 마지막 번호인지 확인 +1한 이유는 첫번째문제는 사실 0번으로 해놓았기에 적용
                ? 
                ( //마지막 번호면 해당 소문제에 대한 모달을 제거하고 입력값 저장, 해당 선택지에 대한 모든 문제가 다 풀린것에 대한 신호를 보냄
                  props.setModalVisible(!props.modalVisible),
                  updateDB(),
                  props.setFinishQuestion(true)
                  
                ) 
                 :
                ( //마지막 번호가 아닐시 입력값 저장, 다음 문제를 위한 flag 증가
                  updateDB(),
                  props.setFlag(props.flag+1)
                )
                 }
            >
              <Text style={styles.textStyle}>제출</Text> 
            </Pressable>
          </View>
        </View>
      </Modal>

      
      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    
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
    textAlign: "center",
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
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

//export default EnrollModal;
export {EnrollModal, SelectModal}
