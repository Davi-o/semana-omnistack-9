import React, { useState, useEffect } from 'react';
import socket_io from 'socket.io-client';
import { Alert, StatusBar, ScrollView,SafeAreaView, Image, StyleSheet,AsyncStorage } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import LogoutButton from '../components/LogoutBtn';

export default function List(){
 const [techs, setTechs] = useState([]);
 useEffect(()=> {
  AsyncStorage.getItem('user').then(user_id => {
    const socket = socket_io('http://192.168.100.9:3337', {
      query: {user_id}
    })
    socket.on('booking_response', booking => {
      Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`);
    })
  })
 },[]);

 useEffect(()=>{
  AsyncStorage.getItem('techs').then(storagedTechs=>{
   const techsArr = storagedTechs.split(',').map(tech => tech.trim());
   setTechs(techsArr);
  })
 },[]);

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar hidden />
   <Image source={logo} style={styles.logo}/>
   <ScrollView>
    {techs.map(tech => <SpotList key={tech} tech={tech} />)}
   </ScrollView>
   {/*<LogoutButton />*/}
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
 container:{
  flex:1,
 },
 logo:{
  height: 32,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginTop: 10
 }
})