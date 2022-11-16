import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import User from './Screens/User';
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
import { async } from '@firebase/util';
import React from 'react';
import { Text } from 'react-native';
import  {db}  from './firebaseConfig';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, where, query } from "firebase/firestore";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = creatStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {
  const [addName, setAddName] = useState('');
  const [addAge, setAddAge] = useState('');
  const [id, setID] = useState('');
  const [users, setUsers] = useState();
  
  const deletefromDB = async ()=>{
    try{
      const docRef = doc(db, "User", id);
      await deleteDoc(docRef);
      alert("Deleted!!")
      readfromDB()
    }catch(error){
      console.log(error.message)
    }
  }

  const updateDB = async ()=>{
    try{
      const docRef = doc(db, "User", id);
      await updateDoc(docRef, {
        addName: addName,
        addAge: addAge
      });
      alert("Updated!!")
      readfromDB()
    }catch(error){
      console.log(error.message)
    }
  }

  const queryDB = async ()=>{
    try{
      const q = await query(collection(db, "User" ), where('addName',"==","test23"))
      const singleDoc = await getDocs(q);
      console.log(singleDoc)
    }catch(error){
      console.log(error.message)
    }
  }

  const readfromDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "User" ))
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }catch(error){
      console.log(error.message)
    }
  }

  const addtoDB = async ()=>{
    try{
      await addDoc(collection(db, "User" ), {
        addName: addName,
        addAge: addAge,
        createdAt: new Date(),
      });
      alert("Added!!")
      setAddName("")
      setAddAge("")
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <View>
      <TextInput
        placeholder="name"
        value={addName}
        onChangeText={setAddName}
      />
      <TextInput
        placeholder="age"
        value={addAge}
        onChangeText={setAddAge}
      />
      <Button title="Add Text" onPress={addtoDB} />
      <Button title="Read Text" onPress={readfromDB} />
      {users?.map((row, idx) => {
        return (
          <>
            <Text>User- {idx}</Text>
            <Text>{row.id}</Text>
            <Text>{row.addName}</Text>
            <Text>{row.addAge}</Text>
          </>
        );
      })}

      <Button title="Update Text" onPress={updateDB} />
      <TextInput
        placeholder="Updata ID"
        value={id}
        onChangeText={setID}
      />
      <TextInput
        placeholder="name"
        value={addName}
        onChangeText={setAddName}
      />
      <TextInput
        placeholder="age"
        value={addAge}
        onChangeText={setAddAge}
      />
      <Button title="Delete Text" onPress={deletefromDB} />
      <TextInput
        placeholder="Delete ID"
        value={id}
        onChangeText={setID}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});