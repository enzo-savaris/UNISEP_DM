import { View,  Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";

export function Home() {
    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();

    function entrar() { 
        if (usuario == 'admin' && senha == 'admin') {
            alert('AOOOOOOOOOOOOOO BUCETAAAAAAAAAA!');
        }
    }

    return (
       <View style={styles.home}>
            <Text style={styles.text}>Tela Home</Text>    

            <Text style={styles.text}>Usuario: {usuario}</Text>
            <Text style={styles.text}>Senha: {senha}</Text>

            <TextInput style={styles.textInput} placeholder="usuário" value={usuario} onChangeText={setUsuario} />
            <TextInput style={styles.textInput} placeholder="senha" value={senha} onChangeText={setSenha} />

            <View style={styles.btnGatoMineiro}>
                <Button title="Entrar" onPress={entrar} />
            </View>
       </View>
    )
}

const styles = StyleSheet.create({  
    home: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },   
    btnGatoMineiro: {
        height: 40,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        color: 'black',
        fontSize: 20,
        borderColor: 'black',
        marginTop: 20
    },
    textInput: {
        height: 40,
        width: 300,
        backgroundColor: 'white',       
        marginTop: 20,
        borderRadius: 5,
        color: 'black',
        fontSize: 20,
        borderColor: 'black',
        textAlign: 'center'
        
    }
});