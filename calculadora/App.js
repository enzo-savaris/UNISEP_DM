import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


function operacao(a, b, op) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case 'x':
      return a * b;
    case ':':
      return b === 0 ? 'Erro: divisão por zero' : a / b;
    default:
      return null;
  }
}

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState('');

  function calcular(op) {
    const a = parseFloat(num1.replace(',', '.'));
    const b = parseFloat(num2.replace(',', '.'));

    if (isNaN(a) || isNaN(b)) {
      setResultado('Digite dois números válidos');
      return;
    }
    S
    setResultado(String(operacao(a, b, op)));
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
      <View style={{ marginTop: 50, marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Digite um número"
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite outro número"
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.viewButton}>
            <Button title="+" onPress={() => calcular('+')} />
          </View>

          <View style={styles.viewButton}>
            <Button title="-" onPress={() => calcular('-')} />
          </View>

          <View style={styles.viewButton}>
            <Button title="x" onPress={() => calcular('x')} />
          </View>

          <View style={styles.viewButton}>
            <Button title=":" onPress={() => calcular(':')} />
          </View>
        </View>

        <Text style={styles.resultado}>Resultado: {resultado}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    top: 5
  },
  viewButton: {
    top: 10,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
    display: 'flex',
    margin: 7,
  },
  resultado: {
    top: 20,
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
