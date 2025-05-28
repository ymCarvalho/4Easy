import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Login() {
  const navigation = useNavigation();
  const [modo, setModo] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    if (!email || !senha || (modo === "cadastro" && !nome)) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    const endpoint =
      modo === "login"
        ? "http://192.168.30.147:3000/login/organizador"
        : "http://192.168.30.147:3000/cadastro/organizador";

    const dados = modo === "login" ? { email, senha } : { nome, email, senha };

    try {
      const resposta = await axios.post(endpoint, dados);

      if (modo === "login") {
        await AsyncStorage.setItem("userToken", resposta.data.token);
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(resposta.data.organizador)
        );
      }

      Alert.alert(
        "Sucesso",
        modo === "login"
          ? "Login realizado com sucesso!"
          : "Cadastro realizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );

      const token = await AsyncStorage.getItem("userToken");
      console.log("Token armazenado:", token);
      const userData = await AsyncStorage.getItem("userData");
      console.log("Dados do usuário:", JSON.parse(userData));
    } catch (error) {
      let errorMessage = "Erro na requisição";

      if (error.response) {
        errorMessage = error.response.data.message || error.response.data.error;
      } else if (error.request) {
        errorMessage = "Sem resposta do servidor - verifique sua conexão";
      } else {
        errorMessage = error.message;
      }

      console.error("Erro completo:", error);
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {modo === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
          </Text>
          <Text style={styles.subtitle}>
            {modo === "login"
              ? "Faça login para continuar"
              : "Junte-se à nossa comunidade"}
          </Text>
        </View>

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

        <View style={styles.formContainer}>
          {modo === "cadastro" && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#999"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              value={senha}
              secureTextEntry
              onChangeText={setSenha}
            />
          </View>

          {modo === "login" && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>
              {modo === "login" ? "Entrar" : "Cadastrar"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {modo === "login" ? "Não tem uma conta? " : "Já tem uma conta? "}
          </Text>
          <TouchableOpacity
            onPress={() => setModo(modo === "login" ? "cadastro" : "login")}
          >
            <Text style={styles.footerLink}>
              {modo === "login" ? "Cadastre-se" : "Faça login"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#03001E",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Montserrat_400Regular",
  },
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 4,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeSwitchButton: {
    backgroundColor: "rgba(65, 105, 225, 0.2)",
  },
  switchText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Montserrat_600SemiBold",
  },
  activeSwitchText: {
    color: "rgb(65, 105, 225)",
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "rgb(65, 105, 225)",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },
  botao: {
    backgroundColor: "rgb(65, 105, 225)",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "rgb(65, 105, 225)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Montserrat_400Regular",
  },
  footerLink: {
    color: "rgb(65, 105, 225)",
    fontFamily: "Montserrat_600SemiBold",
  },
});
