import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Fomulary = ({ search, setSearch, setConsult, setLogoView }) => {

  const { city, country } = search

  const [ animationBtn ] = useState( new Animated.Value(1, true) );

  const showAlert = () =>{
    Alert.alert(
      'There are empty spaces',
      'Check that every field is filled'
    )
  }

  const consultWeather = () =>{
    if( country.trim() === '' || city.trim() === '' ){
      showAlert();
      return;
    }else{
      setConsult( true )
      setLogoView( false )
    }
  }

  const animationIn = () =>{
    Animated.spring( animationBtn, {
      toValue: .95,
      useNativeDriver: true
    })
    .start();
  }

  const animationOut = () =>{
    Animated.spring( animationBtn, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    })
    .start();
  }

  const animationStyle = {
    transform:[{ scale: animationBtn}]
  }

  return (
    <View>
      {/* <Text style={styles.text}>City</Text> */}
      <TextInput   
          value={city}
          placeholder='Enter your city'
          placeholderTextColor='#8a8a8a'
          style={styles.input}
          onChangeText = { city => setSearch ({ ...search, city })} //Its an object, so we take a copy of the state, and we pass the new city
      />

      <View>
        <Picker 
        style={styles.picker}
        selectedValue={country}
        onValueChange={ country => setSearch ({ ...search , country } )}
        >
          <Picker.Item label='--Select--' value=""/>
          <Picker.Item label="Mexico" value="MX"/>
          <Picker.Item label="United States" value="US"/>
          <Picker.Item label="Spain" value="ES"/>
          <Picker.Item label="Argentina" value="AR"/>
          <Picker.Item label="Colombia" value="CO"/>
        </Picker>
      </View>

      <TouchableWithoutFeedback
        onPressIn={animationIn}
        onPressOut={animationOut}
        onPress = { () => consultWeather() }
      >
        <Animated.View style={[styles.touchable , animationStyle]}>
          <Text style={styles.textBtn}>Search Weather</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

  </View>
  )
}

const styles = StyleSheet.create({
    text:{
      fontSize:40,
      color:'#fff',
      textAlign:'center',
      marginBottom: 20
    },
    input:{
      backgroundColor:'#fff',
      marginHorizontal:30,
      textAlign:'center',
      color:'#454545'
    },
    picker:{
      backgroundColor:'#FFF',
      marginHorizontal:30,
      marginTop: 30,
      color:'#8a8a8a'
    },
    touchable:{
      backgroundColor: '#636363',
      marginHorizontal: 30,
      padding: 20,
      marginTop: 30,
      borderRadius: 20
    },
    textBtn:{
      color:'#fff',
      fontSize: 17,
      textAlign: 'center',
      fontWeight: '700'
    }
  });

export default Fomulary