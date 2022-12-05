import { StyleSheet, Text, View, Dimensions, ImageBackground  } from 'react-native';
import { useState } from 'react';
import question1 from '../assets/question2.png' //문제창의 이미지 불러오기


const windowWidth = Dimensions.get('window').width; //핸드폰 크기에 맞춰 넓이 및 높이 알맞게 설정
const windowHeight = Dimensions.get('window').height;

const Question = (props) => { //질문은 하단의 text에 입력함으로 props는 사용안함 -> 추후에 문제 또한 사용가능성 높음(8문제이므로)
    return(
      <View style={{paddingBottom: 30}}>
          {/* paddingBottom을 통해 아래 선택지 창과의 거리를 떨어뜨리기*/}
            
          {/* ImageBackground를 사용하여 이미지를 배경으로 사용*/}
        <ImageBackground 
        style={styles.box}
        source = {question1}
        resizeMode = "contain" 
        >
        
        {/* padding의 경우 양 옆으로 떨어뜨림으로써 문제 창에 약간의 여백을 두어 답답하게 안보이게 하기 위함*/}
        
        <Text style={{fontWeight:"bold" ,fontSize: 12, paddingLeft:20, paddingRight:20}} >
          {/* props를 통해 넘어온 문제를 적용*/}
          {props.contents} 
        </Text>
        
      
      </ImageBackground>
      </View>
    );
}
const styles = StyleSheet.create({
   
    box:{
        width:windowWidth*0.85,
        height:windowHeight*0.25,
        
        justifyContent: 'center',
        alignItems: 'center',
        
    }
  });
  


export default Question;