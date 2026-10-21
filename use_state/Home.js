import { View,  Text, StyleSheet, Button } from "react-native";

export function Home() {
    return (
       <View style={styles.home}>
            <Text style={styles.text}>Tela Home</Text>    
            <View style={styles.btnGatoMineiro}>
                <Button  title="Tocar gato mineiro" onPress={() => alert('Miau!')}></Button>
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
    }

});