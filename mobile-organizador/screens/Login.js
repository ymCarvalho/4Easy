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

export default function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSwitch = (selectedMode: "login" | "cadastro") => {
    setMode(selectedMode);
  };

  const handleSubmit = async () => {
    const endpoint =
      mode === "login"
        ? "http://192.168.15.13:3000/login/organizador"
        : "http://192.168.15.13:3000/cadastro/organizador";
    const payload =
      mode === "login" ? { email, senha } : { nome, email, senha };

    try {
      const response = await axios.post(endpoint, payload);
      const msg =
        response.data.message ||
        (mode === "login"
          ? "Login realizado com sucesso!"
          : "Usuário cadastrado com sucesso!");
      Alert.alert("Sucesso", msg);
    } catch (error) {
      const msg = "Erro na requisição";
      Alert.alert("Erro", msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => handleSwitch("login")}
        >
          <Text
            style={[styles.switchText, mode === "login" && styles.activeText]}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => handleSwitch("cadastro")}
        >
          <Text
            style={[
              styles.switchText,
              mode === "cadastro" && styles.activeText,
            ]}
          >
            Cadastro
          </Text>
        </TouchableOpacity>
      </View>

      {mode === "cadastro" && (
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {mode === "login" ? "Entrar" : "Cadastrar"}
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
    paddingVertical: 10,
    alignItems: "center",
  },
  switchText: {
    fontSize: 18,
    color: "#ccc",
  },
  activeText: {
    color: "#1400B4",
    fontWeight: "bold",
    fontFamily: "montserrat",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#1400B4",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
