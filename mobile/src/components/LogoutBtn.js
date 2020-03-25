import React, { useState, useEffect } from 'react';
import {AsyncStorage, Alert, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';

export default function Logout({ navigation }){
 useEffect(()=>{
  AsyncStorage.getItem('user').then(user=>{
   if(!user){
   navigation.navigate('List');
  }
  });
 },[])

 async function handleCancel(){
  //Alert.alert('Logout efetuado com sucesso.');
  
  await AsyncStorage.removeItem('user');
 }
 return(
  <View>
   <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
    <Text style={styles.buttonText}>Sair</Text>
   </TouchableOpacity>
  </View>
 )
}
const styles = StyleSheet.create({
 button:{
  height: 42,
  backgroundColor: '#2c918b',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2
 },
 buttonText:{
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
 }
})