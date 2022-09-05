import React,{useState} from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Dimensions } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, Title, Paragraph, Text, TextInput } from 'react-native-paper';
import api from './src/services/api';
import { styles } from './src/styles/styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width: ScreenWidth } = Dimensions.get("screen");

export default function App() {
    [url, setUrl] = useState(null);
    [ganhador, setGanhador] = useState(null);
    [text, setText] = useState(null);
    [erro, setErro] = useState(null);
    [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!url) return;
        setLoading(true);
        try {
            const response = await api.get(`/api?url=${url}`);
            setGanhador(response.data);
            setLoading(false);
            setErro(null);
        } catch (erro) {
            setErro('Nenhum comentario encontrado !!!');
            setLoading(false);
            setGanhador(null);
        }
    };

    const renderHeader = () => (
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: "#2a41cb", fontWeight: "bold", fontSize: 32 }}>
            Bem Vindo(a) 👋
          </Text>
          <Text style={{ color: "#8e9496", letterSpacing: 1, marginTop: 8 }}>
            Aplicativo criado no intuito de ajudar no sorteio do insta sem muita burocracia.
          </Text>
        </View>
    );
    
    const renderInput = () => (
        <View style={{ marginTop: 52 }}>
            <View style={{
                marginTop: 24,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>setUrl(text)}
                    value={url}
                    mode="outlined"
                    label="Link do Post"
                    hasError={!!erro}
                />

                <Button color="#2a41cb" style={styles.button} mode="contained" onPress={handleSubmit}> 
                    {loading ? ( <ActivityIndicator animating={true} color={'#fff'} size={20}/> ) : ( <Ionicons name="search-sharp" size={20}/> )}
                </Button>
            </View>
        </View>
      );

      const renderContent = () => (
        <View>
            {erro && <Text>{erro}</Text> }
                {ganhador && (
                    <Card
                    style={{
                      height: 100,
                      width: ScreenWidth * 0.88,
                      backgroundColor: "#2a41cb",
                      marginTop: ScreenWidth * 0.1,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      shadowRadius: 8,
                      shadowOpacity: 0.3,
                      shadowColor: "#2a41cb",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                    }}
                  >
                        {loading ? (
                            <ActivityIndicator/> 
                        ) : (
                                <>
                                    <Avatar.Image
                                        style={{ marginLeft: 20, marginTop: ScreenWidth * 0.07}}
                                        size={70}
                                        source={{uri: ganhador.owner.profile_pic_url}} 
                                    />
                                    <View style={{marginLeft: 120, marginRight: 0 , top: -50}}>
                                        <Text style={{ fontWeight: "bold", color: "#fff" }}>Usuario: {ganhador.owner.username}</Text>
                                        <Text style={{ fontWeight: "bold", color: "#fff" }}>Comentario: {ganhador.text}</Text>
                                    </View>
                                </>
                        )}
                        </Card>
                )}    
        </View>
      );

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View
                style={{
                    flex: 1,
                    marginLeft: 24,
                    marginRight: 24,
                }}
            >
                {renderHeader()}
                {renderInput()}
                {renderContent()}
            </View>
        </TouchableWithoutFeedback>
    )
}