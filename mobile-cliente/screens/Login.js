import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';n

export default function Login() {


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "O e-mail é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "E-mail inválido.";
    if (!senha) newErrors.senha = "A senha é obrigatória.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Login bem-sucedido!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        4<Text style={styles.logoSpan}>easy</Text>
        <Text style={styles.logoSup}>*</Text>
      </Text>

      <View style={styles.tabs}>
        <Text style={styles.activeTab}>LOGIN</Text>
        <Text style={styles.inactiveTab}>CADASTRO</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="EMAIL"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="SENHA"
        placeholderTextColor="#555"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {errors.senha && <Text style={styles.error}>{errors.senha}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Esqueci a senha</Text>

      <Text style={styles.register}>
        não possui uma conta?
        <Text style={styles.registerLink}> cadastre-se</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#fff', flex: 1, justifyContent: 'center' },
  logo: { fontSize: 36, fontFamily: 'Montserrat-Bold', color: '#2e00a1', marginBottom: 20 },
  logoSpan: { color: '#2e00a1', fontFamily: 'Montserrat-Bold' },
  logoSup: { color: '#5b3fef', fontSize: 16, fontFamily: 'Montserrat-Regular' },
  tabs: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  activeTab: { color: '#5b3fef', borderBottomWidth: 2, borderBottomColor: '#5b3fef', paddingBottom: 4, fontFamily: 'Montserrat-SemiBold', marginHorizontal: 12 },
  inactiveTab: { color: '#888', fontFamily: 'Montserrat-SemiBold', marginHorizontal: 12 },
  input: { width: '100%', padding: 12, marginBottom: 8, backgroundColor: '#ddd', borderRadius: 6, fontSize: 14, fontFamily: 'Montserrat-Regular' },
  button: { width: '100%', padding: 12, marginTop: 8, backgroundColor: '#4b0082', borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: 16 },
  forgot: { fontSize: 12, color: '#1e90ff', marginTop: 10, fontFamily: 'Montserrat-Regular' },
  register: { fontSize: 12, marginTop: 40, color: '#444', fontFamily: 'Montserrat-Regular' },
  registerLink: { color: '#1e90ff', fontFamily: 'Montserrat-Bold' },
  error: { color: 'red', fontSize: 12, alignSelf: 'flex-start', marginBottom: 8, fontFamily: 'Montserrat-Regular' }
});