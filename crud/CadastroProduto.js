import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from './api';

export default function CadastroProduto({ onSalvo, onCancelar }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [qtde, setQtde] = useState('');
  const [salvando, setSalvando] = useState(false);

  const salvar = async () => {
    const precoNumero = Number(preco.replace(',', '.'));
    const qtdeNumero = Number(qtde);

    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe a descrição do produto.');
      return;
    }
    if (!preco.trim() || isNaN(precoNumero) || precoNumero < 0) {
      Alert.alert('Atenção', 'Informe um preço válido.');
      return;
    }
    if (!qtde.trim() || !Number.isInteger(qtdeNumero) || qtdeNumero < 0) {
      Alert.alert('Atenção', 'Informe uma quantidade válida.');
      return;
    }

    try {
      setSalvando(true);
      await api.post('/cadastrar', {
        nome: nome.trim(),
        preco: precoNumero,
        qtde: qtdeNumero,
      });
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      onSalvo();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar produto</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Arroz 5kg"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 25,90"
        keyboardType="decimal-pad"
        value={preco}
        onChangeText={setPreco}
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 10"
        keyboardType="number-pad"
        value={qtde}
        onChangeText={setQtde}
      />

      <View style={styles.botoes}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoCancelar]}
          onPress={onCancelar}
          disabled={salvando}
        >
          <Text style={styles.textoBotao}>CANCELAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoSalvar]}
          onPress={salvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>SALVAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 50,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 16,
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },

  botao: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    minWidth: 110,
    alignItems: 'center',
  },

  botaoCancelar: {
    backgroundColor: '#6B7280',
  },

  botaoSalvar: {
    backgroundColor: '#16A34A',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
