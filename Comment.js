import { db } from './firebaseConfig'
import { ScrollView,similarity,Alert, useEffect,StyleSheet, Text, Modal,View ,TextInput, Pressable, TouchableOpacity, ViewBase} from 'react-native'
import { useState } from 'react'
import { Button } from 'react-native'


const Comment = (props) =>{
    const [modal,setModalVisible] = useState(false)
    const [answer,setAnswer] = useState('')
    const [num,setNum] = useState(1)
    const [correct,setCorrect] = useState(false)
    var stringSimilarity = require("string-similarity");
    
    var arr =["85.75=3.25+7.5*p","11","11","11",
              "16 1/8 miles","5 7/8 miles","16 1/8 + m = 22","5 7/8 miles","5 7/8 miles",
              "64.8 yards","10.8 yards","6m+19.7 = 84.5","10.8 yards","19.7 yards","64.8 yards","10.8 yards",
              "100", " 100","100","Faye","4e + 30 = 114","21","42,51","Faye","84","21","42,51","Faye",
              "8.25m + 34.5 = 84","6 sections","84 inches","6 times","49.5 inches","6 times",
              "4x+24=104","20","100","100","[4w+24]","20","24 inches","20 inches",
              "115","42/7","4 days","25","100","4","25","4",
              "50 feet","100","100","80","80","15","15","50","30","15"]
    var similarity = stringSimilarity.compareTwoStrings(props.question_answer, arr[props.passNum]);
    //문자 비슷한 정도를 판단 
    //console.log(similarity)

    return( 
    <View>
   <View>
    <Pressable onPress={()=> Alert.alert(
        `학생이름 : ${props.Name}`,
        `문제번호 : ${props.question_num} \n정답여부 : ${similarity>0.8?'정답':'오답'}`,
        [
          { text: "Close"}
        ]
      )}>
    {/*alert(`문제번호 ${props.question_num} \n정답여부 : ${similarity>0.5?'정답':'오답'}`)*/}
    
    
    <Text style={{fontWeight: 'bold',fontSize: 15, paddingLeft:20, paddingRight:20, marginBottom:10}}>{props.question_num} : {props.question_answer}</Text>
    </Pressable>
   </View>

   <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModalVisible(!modal)
        }}
      >
        <View style={styles.centeredView}> 
          <View style={styles.modalView}>
            <Text>{props.question_num}</Text>
            <TextInput 
            style = {styles.input}
            value={answer}
            onChangeText = {setAnswer}
            /> 
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modal)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
          </View>
      </Modal>

    </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
    
      
        modalText: {
        marginBottom: 15,
        textAlign: "center"
        },
       
      modalView: {
        margin: 20,
        backgroundColor: '(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 2
        }
    },
    
    input: {
        width: '50%',
        height: '10%',
        backgroundColor: "#cecece",
        marginTop:20,
        fontSize: 10,
        padding:10,
        marginBottom: 10,
        
    
      },
    view1 : {

        backgroundColor : 'yellow',
        flexDirection : 'column',
        flex : 0.5,
        marginTop : 50,
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%'

    },

    view2 : {

        backgroundColor : 'white',
        marginTop : 50,
        width : '70%'

    },

    view3 : {

        backgroundColor : 'green',
        marginBottom : 10

    },

    view4 : {

        backgroundColor : 'white',
        flex : 2,
        marginTop : 0,
        alignItems : 'center'

    },

    view5 : {

        Witdth: '100%',
        marginTop : 50

    },

    text : {

        fontSize : 40,
        fontWeight : 'bold',
        color : "black",
        marginTop : -90
        
    },

    text2 : {

        fontSize : 30,
        fontWeight : 'bold',
        color : "black",
        marginTop : 0
    }
});
export default Comment;