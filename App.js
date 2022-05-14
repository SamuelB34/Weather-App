import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import Fomulary from './Components/Fomulary';
import Clima from './Components/Clima';

const App = () =>{

  const [ search, setSearch ] = useState ({
    city: '',
    country: ''
  })

  const [ consult, setConsult ] = useState(false)
  const [ result, setResult ] = useState({})
  const [ bgcolor, setBgcolor] = useState('#4a2d10');
  const [ logoView, setLogoView ] = useState(true)


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
        { logoView=== true  &&
          <View >
            <Image 
            source={require ('./Components/clima.png')}
            style={styles.imagen}
            />    
            <Text style={styles.weatherText}> Weather <Text style={styles.apiText}>API </Text> </Text>
          </View>
        }




        <Clima 
          result={result}
        />
        <Fomulary 
          search={search}
          setSearch={setSearch}
          setConsult = {setConsult}
          setLogoView = {setLogoView}
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
  imagen:{
    marginBottom:20,

    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  weatherText:{
    color:'#fff',
    marginBottom:20,
    textAlign:'center',
    fontSize: 30
  },
  apiText:{
    fontWeight:'bold'
  }

});

export default App;
