
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import api from './api';
import CadastroProduto from './CadastroProduto';

export default function App() {
  const [data, setdata] = useState([]);
  const [tela, setTela] = useState('lista');

  useEffect(() => {
    carregaDados();
  }, []);

  const carregaDados = async () => {
    const resposta = await api.get('/listar');
    setdata(resposta.data);
  };

  const adicionarProduto = () => {
    setTela('cadastro');
  };

  const aoSalvarProduto = async () => {
    setTela('lista');
    await carregaDados();
  };

  if (tela === 'cadastro') {
    return (
      <CadastroProduto
        onSalvo={aoSalvarProduto}
        onCancelar={() => setTela('lista')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de produtos</Text>

      {/* Botão Adicionar */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={adicionarProduto}
      >
        <Text style={styles.textoBotao}>+ ADICIONAR</Text>
      </TouchableOpacity>

      <ScrollView horizontal>
        <View style={styles.tabela}>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={[styles.coluna, styles.id]}>ID</Text>
            <Text style={[styles.coluna, styles.descricao]}>
              DESCRIÇÃO
            </Text>
            <Text style={[styles.coluna, styles.preco]}>
              PREÇO
            </Text>
          </View>

          {/* Dados */}
          {data.map((item) => (
            <View style={styles.linha} key={item.IDPRODUTO}>
              <Text style={[styles.celula, styles.id]}>
                {item.IDPRODUTO}
              </Text>

              <Text style={[styles.celula, styles.descricao]}>
                {item.NOME}
              </Text>

              <Text style={[styles.celula, styles.preco]}>
                {Number(item.PRECO).toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))}

        </View>
      </ScrollView>
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

  botaoAdicionar: {
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  tabela: {
    minWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 15,
  },

  linha: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 15,
  },

  coluna: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  celula: {
    fontSize: 14,
    color: '#374151',
  },

  id: {
    width: 60,
    textAlign: 'center',
  },

  descricao: {
    width: 180,
    paddingLeft: 10,
  },

  preco: {
    width: 110,
    textAlign: 'right',
    paddingRight: 10,
  },
});
