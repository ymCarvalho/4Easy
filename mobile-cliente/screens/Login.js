import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoginCliente() {
  const [modo, setModo] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = () => {
    if (!email || !senha || (modo === "cadastro" && !nome)) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    alert(
      modo === "login"
        ? "Login simulado para clientes"
        : "Cadastro simulado para clientes"
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.backgroundPattern} />
          <Image source={require("../assets/branca.png")} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              {modo === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {modo === "login"
                ? "Acesse sua conta para continuar"
                : "Junte-se a nós e comece sua jornada"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                modo === "login" && styles.tabButtonActive,
              ]}
              onPress={() => setModo("login")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  modo === "login" && styles.tabButtonTextActive,
                ]}
              >
                Login
              </Text>
              {modo === "login" && <View style={styles.tabIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                modo === "cadastro" && styles.tabButtonActive,
              ]}
              onPress={() => setModo("cadastro")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  modo === "cadastro" && styles.tabButtonTextActive,
                ]}
              >
                Cadastro
              </Text>
              {modo === "cadastro" && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>

          {modo === "cadastro" && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#8E8E93"
                value={nome}
                onChangeText={setNome}
              />
              <View style={styles.inputLine} />
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8E8E93"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.inputLine} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#8E8E93"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <View style={styles.inputLine} />
          </View>

          {modo === "login" && (
            <TouchableOpacity style={styles.forgotLink}>
              <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>
              {modo === "login" ? "Entrar" : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.35,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
    position: "relative",
    overflow: "hidden",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1400b4",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 15,
    tintColor: "white",
  },
  headerTextContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: "white",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: -30,
    padding: 30,
    shadowColor: "#1400b4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E3FF",
  },
  tabButton: {
    flex: 1,
    paddingBottom: 15,
    alignItems: "center",
    position: "relative",
  },
  tabButtonActive: {},
  tabButtonText: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#8E8E93",
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: "#1400b4",
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    height: 3,
    width: "50%",
    backgroundColor: "#1400b4",
    borderRadius: 3,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    paddingVertical: 12,
    fontFamily: "Montserrat_500Medium",
    color: "#1400b4",
    fontSize: 16,
  },
  inputLine: {
    height: 1,
    backgroundColor: "#E0E3FF",
    marginTop: 5,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: -15,
    marginBottom: 25,
  },
  forgotText: {
    color: "#1400b4",
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
  },
  mainButton: {
    backgroundColor: "#1400b4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#1400b4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  mainButtonText: {
    color: "white",
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E3FF",
    padding: 14,
    borderRadius: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    color: "#1400b4",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },
});
