import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView,  Image} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PerfilScreen({ navigation }) {


  const [notificacoes, setNotificacoes] = useState({
    chat: false,
    donoEvento: false,
    cancelamento: false,
    alteracoes: false,
  });


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
      <FontAwesome5 name="user-circle" size={80} color="#5b3fef" />
      <Text style={styles.userName}>Nome do usuário</Text>

      <View style={styles.inputRow}>
        <MaterialIcons name="email" size={20} color="#5b3fef" />
        <Text style={styles.inputText}>E-mail: usuario@gmail.com</Text>
        <TouchableOpacity><Text style={styles.link}>Alterar</Text></TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <MaterialIcons name="lock" size={20} color="#5b3fef" />
        <Text style={styles.inputText}>Senha: ********</Text>
        <TouchableOpacity><Text style={styles.link}>Alterar</Text></TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <MaterialIcons name="location-on" size={20} color="#5b3fef" />
        <Text style={styles.inputText}>Localização: Endereço do usuário</Text>
        <TouchableOpacity><Text style={styles.link}>Alterar</Text></TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <MaterialIcons name="language" size={20} color="#5b3fef" />
        <Text style={styles.inputText}>Idioma: Português</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Permitir notificações:</Text>

      {[
        { key: 'chat', label: 'Mensagens do chat' },
        { key: 'donoEvento', label: 'Mensagens do dono do evento' },
        { key: 'cancelamento', label: 'Cancelamento de eventos' },
        { key: 'alteracoes', label: 'Alterações em eventos' },
      ].map((item) => (
        <View style={styles.switchRow} key={item.key}>
          <Switch
            value={notificacoes[item.key]}
            onValueChange={() =>
              setNotificacoes({ ...notificacoes, [item.key]: !notificacoes[item.key] })
            }
            trackColor={{ false: '#aaa', true: '#5b3fef' }}
            thumbColor="#fff"
          />
          <Text style={styles.switchLabel}>{item.label}</Text>
        </View>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5ff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    width: '100%',
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#5b3fef',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
