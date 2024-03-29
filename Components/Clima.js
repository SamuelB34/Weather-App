import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Clima = ({result}) => {

    const { name, main } = result;

    if(!name) return null;

    // grados kelvin
    const kelvin = 273.15;

    return ( 
        <View style={styles.clima}>

            <Text style={styles.name}> {name} 
            <Image
                    style={{width: 66, height: 58}}
                    source={{ uri: `http://openweathermap.org/img/w/${result.weather[0].icon}.png` }}
                />  
            
            </Text>
            <Text style={[ styles.texto, styles.actual ]}> 
                { parseInt( main.temp - kelvin ) }
                <Text style={styles.temperatura}>
                    &#x2103;
                </Text>
            </Text>

            <View style={styles.temperaturas}>
                <Text style={styles.texto}>Min {' '}
                    <Text style={styles.temperatura}>
                        { parseInt(main.temp_min - kelvin ) } &#x2103;
                    </Text>
                </Text>

                <Text style={styles.texto}>Max {' '}
                    <Text style={styles.temperatura}>
                        { parseInt(main.temp_max - kelvin ) } &#x2103;
                    </Text>
                </Text>


            </View>
            <View style={styles.temperaturas}>
                    <Text style={styles.texto}> 
                        <Text style={styles.temperatura}>{ parseInt(main.humidity )}%</Text> 
                    {' '}Humidity
                    </Text>

                    <Text style={styles.texto}>  
                        <Text style={styles.temperatura}> { parseInt(main.feels_like - kelvin )}&#x2103;</Text>
                        {' '} Chill factor 
                    </Text>

            </View>
        </View>
     );
}

const styles = StyleSheet.create({

    name:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign:'center'
    },
    clima: {
        marginBottom: 20
    },
    texto: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: -10,
        fontWeight: 'bold'
    }, 
    temperatura: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    temperaturas: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
 
export default Clima;