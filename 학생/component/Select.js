import { StyleSheet, Text, View,  TouchableOpacity, Dimensions, ImageBackground  } from 'react-native';
import { useState } from 'react';
import select1 from '../assets/select1.png' //선택창의 이미지 불러오기
import select2 from '../assets/select2.jpg'
import { SelectModal } from './Modal';


const windowWidth = Dimensions.get('window').width; //핸드폰 크기에 맞춰 넓이 및 높이 알맞게 설정
const windowHeight = Dimensions.get('window').height;

const Select = (props)=> { //props를 통해 각 선택지에 대한 텍스트랑 클릭시 나올 문장 넘겨주기
   const [sQuestions, setQuestions] = useState(props.sQuestion); //선택지의 문제에 대한 배열
   const  [flag, setFlag] = useState(0); //현재 띄운 문제 번호
   const  [endFlag, setEndFlag] = useState(sQuestions.length); //마지막 flag를 위해 (flag와 비교하기 위해)
   const [modalVisible, setModalVisible] = useState(false); //false 로 생성시 안보이게
   const [finishQuestion, setFinishQuestion] = useState(false); //마지막 문제인지 확인하는
   const [qNum, setQNum] = useState(props.qNumber); //메인 문제번호
   const [sNum, setSNum] = useState(props.sNumber); //소(셀렉트 몇번째) 문제번호
   const [studentName, setStudentName] = useState(props.studentName); //학생이름
  
   
    

    return(
        
        <View>

            
            {/* 선택지마다 모달을 준비하고 해당 모달은 선택지를 클릭시 선택지에 대한 문제들이 보여지게 설정
            SelectModal의 경우 선택지에 대한 문제들의 모달임
            넘겨주는 정보 -> 위의 useState 정보를 모두 사용
            */}

            <SelectModal key= {sQuestions[flag].id} sQ={sQuestions[flag].sQ} 
            flag = {flag} setFlag = {setFlag} endFlag = {endFlag}
            setModalVisible= {setModalVisible} modalVisible = {modalVisible}
            finishQuestion = {finishQuestion} setFinishQuestion = {setFinishQuestion}
            qNum = {qNum} sNum={sNum}  studentName={studentName}
            ></SelectModal>
            {/* */} 
            


            {finishQuestion == false ? //문제를 다 안풀었을 경우
            <> 
            {/* 기존의 모달은 준비한 상태이며 누를 시 화면에 보이게 설계*/}
                <TouchableOpacity    onPress={()=>  setModalVisible(true)}> 
            
            <ImageBackground  
            style={styles.box}
            source = {select1}
            resizeMode = "contain" 
            >
                
                {/* 글씨 크기 및 볼드체로 글씨 잘보이게 설정*/}
                
                <Text style={{fontWeight: 'bold',fontSize: 12}}> 
                {props.name} {/*각 선택지의 문장(문구) 이미지 위에 나오게함*/}
                 </Text> 

      
            </ImageBackground>
            </TouchableOpacity>
            </>


            : //문제를 다풀었을 경우 -> 클릭 못하게 설정 (TouchableOpacity 제거)

                
            <>
                <ImageBackground  
            style={styles.box}
            source = {select2}
            resizeMode = "contain" 
            >
                
                {/* 글씨 크기 및 볼드체로 글씨 잘보이게 설정*/}
                
                <Text style={{fontWeight: 'bold',fontSize: 12}}> 
                {props.name} {/*각 선택지의 문장(문구) 이미지 위에 나오게함*/}
                 </Text> 

      
            </ImageBackground>
            </>
            }
            

            

        </View>
        
    );
}

const styles = StyleSheet.create({

    box:{
        width:windowWidth*0.9, //핸드폰 맞춤의 넓이의 90퍼의 크기로 이미지 설정
        height:windowHeight*0.1, //핸드폰 맞춤의 높이의 10퍼의 크기로 이미지 설정
        
        justifyContent: 'center',
        alignItems: 'center',
        
      
    }
  });

export default Select;