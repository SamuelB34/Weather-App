import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Fomulary from './Components/Fomulary';
import Clima from './Components/Clima';

const App = () =>{

  const [ search, setSearch ] = useState ({
    city: '',
    country: ''
  })

  const [ consult, setConsult ] = useState(false)
  const [ result, setResult ] = useState({})
  const [bgcolor, setBgcolor] = useState('#36868a');


  const { city, country } = search ;



  useEffect(() => {
    const consultWeather = async () => {
      if( consult ){
        const appId = 'e063b86785641350f13a95dad58594e6';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        console.log(url)
  
        try {
           const answer = await fetch(url);
           const result = await answer.json();
           console.log(url)
           setResult(result)
           setConsult( false )

           const kelvin = 273.15;
           const { main } = result;
           const actual = main.temp - kelvin;


          if(actual < 15) {
            setBgcolor('#a6d2ff');
          } else if(actual >= 15 && actual < 35) {
            setBgcolor('#c98a00');
          } else {
            setBgcolor('#7a000c');
          }
        } catch (error) {
          showAlert();
        }
      }
  
    }
    consultWeather();
  }, [consult]);

  const showAlert = () =>{
    Alert.alert(
      'City not found',
      'the city you entered was not found, try another one'
    )
  }

  const ocultarTeclado = () =>{
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }


  return (
    <TouchableWithoutFeedback onPress={ () => ocultarTeclado()}>
      <View style={[styles.bg, bgColorApp]}>
        <Clima 
          result={result}
        />
        <Fomulary 
          search={search}
          setSearch={setSearch}
          setConsult = {setConsult}
          showAlert = { showAlert }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bg:{
    flex:1,
    justifyContent:'center',
  },

});

export default App;
