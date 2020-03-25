import React, { useState, useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView, AsyncStorage, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }){
 const [email, setEmail] = useState('');
 const [techs, setTechs] = useState('');

 useEffect(()=>{
  AsyncStorage.getItem('user').then(user =>{
   if(user){
    navigation.navigate('List');
   }
  })
 },[])

 async function handleSubmit(){
  const response = await api.post('/sessions',{ email });
  const { _id } = response.data;
  
  await AsyncStorage.setItem('user', _id);
  await AsyncStorage.setItem('techs', techs);

  navigation.navigate('List');
 }
 return(
  <KeyboardAvoidingView enabled={Platform.OS === 'ios' || (Platform.OS=='android' && Platform.Version<28) ? true : false} behavior="padding" style={styles.container} >
   
   <Image source={logo}/>
   <SafeAreaView style={styles.form}>
    <Text style={styles.label}>Seu E-mail*</Text>
    <TextInput
     style={styles.input}
     placeholder="email@email.com"
     placeholderTextColor="#999"
     keyboardType="email-address"
     autoCapitalize="none"
     autoCorrect={false}
     value={email}
     onChangeText={setEmail}
    />
    <Text style={styles.label}>Tecnologias*</Text>
    <TextInput
     style={styles.input}
     placeholder="Tecnologias de interesse"
     placeholderTextColor="#999"
     autoCapitalize="words"
     autoCorrect={false}
     onChangeText={setTechs}
    />
    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
     <Text style={styles.buttonText}>Encontrar Spots</Text>
    </TouchableOpacity>
   </SafeAreaView>
  </KeyboardAvoidingView> /*Essa tag serve pro teclado nao sobrepor os inputs da view*/
 )
}

const styles = StyleSheet.create({
 container:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 },
 form:{
  alignSelf: 'stretch',
  paddingHorizontal: 30,
  marginTop: 30
 },
 label:{
  fontWeight: 'bold',
  color: '#444',
  marginBottom: 8
 },
 input:{
  borderWidth: 1,
  borderColor: '#ddd',
  paddingHorizontal: 20,
  fontSize: 16,
  color: '#444',
  height: 44,
  marginBottom: 20,
  borderRadius: 2
 },
 button:{
  height: 42,
  backgroundColor: '#f05a5b',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2
 },
 buttonText:{
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
 }
});