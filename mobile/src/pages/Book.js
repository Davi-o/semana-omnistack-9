import React, {useState} from 'react';
import { Alert, StatusBar, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import api from '../services/api';

export default function Book({navigation}){
 const id = navigation.getParam('id');
 const [date, setDate] = useState('');

 async function handleSubmit(){
  const user_id = await AsyncStorage.getItem('user');
  await api.post(`/spots/${id}/bookings`,{
   date
  },{
   headers: { user_id }
  })
  Alert.alert('Solicitação de Reserva Enviada.');
  navigation.navigate('List');
 }
 
 function handleCancel(){
  Alert.alert('Solicitação de Reserva Cancelada.');
  navigation.navigate('List');
 }
 return (
  <SafeAreaView style={styles.container}>
   <StatusBar hidden />
   <Text style={styles.label}>Data de interesse*</Text>
   <TextInput
    style={styles.input}
    placeholder="Indique a data que deseja reservar"
    placeholderTextColor="#999"
    autoCapitalize="words"
    autoCorrect={false}
    value={date}
    onChangeText={setDate}
   />
   <TouchableOpacity onPress={handleSubmit} style={styles.button}>
    <Text style={styles.buttonText}>Solicitar Reserva</Text>
   </TouchableOpacity>

   <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
    <Text style={styles.buttonText}>Cancelar</Text>
   </TouchableOpacity>
  </SafeAreaView>
 )
}
const styles = StyleSheet.create({
 container:{
  margin: 30,
 },
 label:{
  fontWeight: 'bold',
  color: '#444',
  marginBottom: 8,
  marginTop: 30,
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
 cancelButton:{
  backgroundColor: '#ccc',
  marginTop: 10
 },
 buttonText:{
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
 }
})