import React,{useState} from 'react';
import {Keyboard, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

export default function App() {
    [url,setUrl]=useState(null);
    [ganhador,setGanhador]=useState(null);
    [text, setText]=useState(null);

    async function procuraGanhador()
    {
        let reqs = await fetch('https://app-api-instagram.herokuapp.com/api?url='+url,
            {
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            });
        let ress = await reqs.json();
        setGanhador(ress.owner.username);
        setText(ress.text);
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>

                <View style={styles.busca}>
                    <TextInput
                            style={styles.input}
                            onChangeText={text=>setUrl(text)}
                        value={url}
                        placeholder='Digite a URL para buscar o ganhador...'
                    />

                    <TouchableOpacity onPress={procuraGanhador} style={styles.button}>
                        <Text style={styles.button__text}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                    <View>
                        <Text>{ganhador}</Text>
                        <Text>{text}</Text>
                    </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
});