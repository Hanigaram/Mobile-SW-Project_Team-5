import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View ,TextInput,ImageBackground,Image,Dimensions,TouchableOpacity } from 'react-native'
import { useState, useSyncExternalStore } from 'react'
import { Button } from 'react-native'
import { Firestore, addDoc, collection, doc, getDocs, docs,query,where } from 'firebase/firestore'
import { db } from './firebaseConfig'
import React from 'react';

import Comment from './Comment';

export default function App() {

    const [Name, setName] = useState ('');
    const [users, setUsers] = useState([]);
    const [passNum,setPassnum] = useState(0)
    var pasNum = 0;
    const array=[];
    const array2=[];
    const readfromDB = async ()=>{

        try{
        const q = query(collection(db, "student1"), where('studentName',"==", Name)) //학생이름 비교하는 쿼리문 
       // console.log(q)
        const data = await getDocs(q)
      //  setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        var first=1,second=1,third=1;
        var search_q = `q${third}_s${second}_${first}`
        var textconut = `q${first}Text`
        const q_num_array=[3,2,2,
                           3,3,2,
                           3,3,4,
                           5,5,5,
                           3,3,3,
                           3,5,3,
                           4,4,3,
                           5,4,4]
        var q_num=0;
        var checker = true //문제번호양식 다른 q*Text값들을 찾기위해만듬
        var loop_q = q_num_array[q_num] //q_num_array[q_num]를 조건식에 넣어봤는데 안되서 변수하나 만듬
        data.docs.map(doc => {
            let tempDocData =doc.data()

            while(true){
            for (let temp in tempDocData){
                if(checker){
                    if(textconut == temp){
                    checker = false
                    //다음 대문제로 넘어갈때마다 입력되는 값은 형식이 다르기 때문에 구분하여 저장
                    array.push(<Text style={{fontWeight: 'bold',fontSize: 20, paddingLeft:20, paddingRight:20,marginTop:15}}> {temp} : {tempDocData[temp]}</Text>)
                    }
                }
                else{
                    if(search_q==temp){
                         array.push(<Comment question_num = {temp} question_answer ={tempDocData[temp]} passNum = {pasNum++} Name={Name}/>)
                        first += 1 //다음 문제찾기위해 번호증가
                        search_q = `q${third}_s${second}_${first}`
                        console.log(search_q)
                        break;
                        }

                        if(first == loop_q){ // 소문제가 더이상 없다면 값 초기화 
                        first = 1 //소문제 초기화
                        second += 1 //중문제 +1
                        q_num += 1 //소문제의 문제수 바꾸기
                        loop_q = q_num_array[q_num] //소문제의 문제수 바꾸기
                        console.log(loop_q)
                        search_q = `q${third}_s${second}_${first}`
                        }

                        if(second == 4){ //최대값에 도달하면 값 초기화 
                        first = 1 //소문제 초기화
                        second = 1 //중문제 초기화
                        third += 1 //다음 대문제로 넘어가기
                        checker = true //text를 찾기위해서 만듬
                        search_q = `q${third}_s${second}_${first}`
                        textconut = `q${third}Text`
                        }
                }

            }
            if(third == 9)
                break;
        }
           
        })
        //console.log(JSON.stringify(array))
        setUsers(array)
        
      
    }catch(error){
          console.log(error.message)
        }

    }

    return (
        <>
        <View
        
            style={styles.view1}>
            <Text
                style={styles.text}></Text>

                <Text>Guess What</Text>
            <Text
                style={styles.text2}>Please type student ID</Text>
            <TextInput
           style = {styles.input}
           value={Name}
           onChangeText = {(text) => setName(text)}
           multiline = {true}   
            ></TextInput> 


            <TouchableOpacity
            style = {{borderWidth : 0,
            borderColor : 'rgba(0,0,0,0,2)',
            alignItems : 'center',
            justifyContent : 'center',
            width : 88,
            height : 39,
            backgroundColor : '#DDDDFF',
            borderRadius : 15}}
            onPress={readfromDB}>
                <Text>Search</Text>
            </TouchableOpacity>

        </View>
        
               
        <View style={styles.view5}>

                <ScrollView> 
                   {users?users:null}
                </ScrollView>
                
            </View>
            
            <View style ={{flex:0.25,margintop:10}}/>
        </>
        

    );
    
   
}

const styles = StyleSheet.create({

    question:{
    marginLeft : 30,
    fontSize : 20

    },

    input: {
        width: '50%',
        height: '10%',
        backgroundColor: "#cecece",
        marginTop:10,
        fontSize: 10,
        padding:10,
        marginBottom: 10,
        
    
      },
    view1 : {

        backgroundColor : 'skyblue',
        flexDirection : 'column',
        //flex : 1,
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
        marginTop : 10,
        flex : 2

    },

    text : {

        fontSize : 40,
        fontWeight : 'bold',
        color : "black",
        marginTop : 0
        
    },

    text2 : {

        fontSize : 30,
        fontWeight : 'bold',
        color : "black",
        marginTop : 10

    }
})