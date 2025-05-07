import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Etapa5({ navigation, route }) {
 const { dadosEvento } = route.params;

  const enviarEvento = async () => {
    try {
      const dadosParaEnviar = {
        nome: dadosEvento.nome,
        descricao: dadosEvento.descricao,
        tipo: dadosEvento.tipo,
        privacidade: dadosEvento.privacidade,
        data: dadosEvento.dataInicio,
        localizacao: dadosEvento.localizacao,
        fotos: dadosEvento.fotos,
        ingressos: dadosEvento.ingressos,
      };

      const response = await axios.post(
        "http://192.168.167.147/eventos",
        dadosParaEnviar
      );

      Alert.alert("Sucesso!", "Evento criado com sucesso!", [
        { text: "OK", onPress: () => navigation.popToTop() },
      ]);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      Alert.alert("Erro", "Não foi possível criar o evento");
    }
  };

  // Formata a data para exibição
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Confirmação do Evento</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Informações Básicas</Text>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Nome:</Text>
          <Text style={styles.itemValue}>{dadosEvento.nome}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Descrição:</Text>
          <Text style={styles.itemValue}>{dadosEvento.descricao}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Tipo:</Text>
          <Text style={styles.itemValue}>{dadosEvento.tipo}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLabel}>Data:</Text>
          <Text style={styles.itemValue}>
            {formatarData(dadosEvento.dataInicio)}
          </Text>
        </View>
      </View>

      {dadosEvento.localizacao && (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Localização</Text>
          <Text style={styles.itemValue}>
            {dadosEvento.localizacao.endereco}
          </Text>
        </View>
      )}

      {dadosEvento.ingressos?.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Ingressos</Text>
          {dadosEvento.ingressos.map((ingresso, index) => (
            <View key={index} style={styles.ingressoItem}>
              <Text style={styles.ingressoNome}>{ingresso.nome}</Text>
              <Text style={styles.ingressoDetalhes}>
                R$ {ingresso.preco} • {ingresso.quantidade} vagas
              </Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.botaoConfirmar} onPress={enviarEvento}>
        <Text style={styles.botaoTexto}>Confirmar e Criar Evento</Text>
        <MaterialIcons name="check-circle" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.botaoTextoVoltar}>Voltar para editar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3F51B5",
  },
  item: {
    flexDirection: "row",
    marginBottom: 8,
  },
  itemLabel: {
    fontWeight: "bold",
    width: 100,
    color: "#555",
  },
  itemValue: {
    flex: 1,
    color: "#333",
  },
  ingressoItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ingressoNome: {
    fontWeight: "bold",
    color: "#333",
  },
  ingressoDetalhes: {
    color: "#666",
  },
  botaoConfirmar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
  },
  botaoVoltar: {
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  botaoTextoVoltar: {
    color: "#3F51B5",
    fontWeight: "bold",
  },
});
