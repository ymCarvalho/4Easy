import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function TelaAutenticacao() {
  const navigation = useNavigation();
  const [modo, setModo] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    const endpoint =
      modo === "login"
        ? "http://192.168.83.147:3000/login/organizador"
        : "http://192.168.83.147:3000/cadastro/organizador";

    const dados = modo === "login" ? { email, senha } : { nome, email, senha };

    try {
      const resposta = await axios.post(endpoint, dados);
      const mensagem =
        resposta.data.message ||
        (modo === "login"
          ? "Login realizado com sucesso!"
          : "Usuário cadastrado com sucesso!");

      navigation.navigate("Home");
    } catch (erro) {
      const mensagemErro =
        erro?.response?.data?.message || "Erro na requisição";
      Alert.alert("Erro", mensagemErro);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            modo === "login" && styles.activeSwitchButton,
          ]}
          onPress={() => setModo("login")}
        >
          <Text
            style={[
              styles.switchText,
              modo === "login" && styles.activeSwitchText,
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.switchButton,
            modo === "cadastro" && styles.activeSwitchButton,
          ]}
          onPress={() => setModo("cadastro")}
        >
          <Text
            style={[
              styles.switchText,
              modo === "cadastro" && styles.activeSwitchText,
            ]}
          >
            Cadastro
          </Text>
        </TouchableOpacity>
      </View>

      {modo === "cadastro" && (
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        secureTextEntry
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
        <Text style={styles.botaoTexto}>
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#03001E",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 30,
    justifyContent: "space-around",
  },
  switchButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeSwitchButton: {
    borderBottomColor: "rgb(65, 105, 225)",
  },
  switchText: {
    fontSize: 23,
    color: "rgb(211, 211, 211)",
    fontFamily: "Montserrat_400Regular",
  },
  activeSwitchText: {
    color: "rgb(65, 105, 225)",
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "rgb(211, 211, 211)",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#F1F8FB",
    fontFamily: "Montserrat_400Regular",
  },
  botao: {
    backgroundColor: "rgb(65, 105, 225)",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Montserrat_700Bold",
  },
});
