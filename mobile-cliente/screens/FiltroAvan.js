import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

export default function FiltroAvan({navigation}) {

  const [localizacaoAtiva, setLocalizacaoAtiva] = useState(false);
  const [distancia, setDistancia] = useState(5);
  const [tipoEvento, setTipoEvento] = useState('Shows');
  const [restricaoIdadeAtiva, setRestricaoIdadeAtiva] = useState(false);
  const [idade, setIdade] = useState('18');
  const [pago, setPago] = useState(false);
  const [preco, setPreco] = useState('0,01');
  const [vip, setVip] = useState(false);
  const [combos, setCombos] = useState(false);
  const [comida, setComida] = useState(false);
  const [horario, setHorario] = useState('10:00');
  const [duracao, setDuracao] = useState('1h30');


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
        <View style={styles.avatar} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Distância de você</Text>
        <View style={styles.row}>
          <Switch value={localizacaoAtiva} onValueChange={setLocalizacaoAtiva} />
          <Text style={styles.checkboxLabel}>Utilizar localização</Text>
        </View>
        <Text style={styles.value}>Até {distancia}Km</Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={1}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="#3B00FF"
          maximumTrackTintColor="#CCC"
          thumbTintColor="#3B00FF"
          value={distancia}
          onValueChange={setDistancia}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tipo de evento</Text>
        <Picker
          selectedValue={tipoEvento}
          onValueChange={setTipoEvento}
          style={styles.picker}
        >
          <Picker.Item label="Shows" value="Shows" />
          <Picker.Item label="Cultural" value="Cultural" />
          <Picker.Item label="Cultural" value="Festas" />
        </Picker>

        <View style={styles.row}>
          <Switch value={restricaoIdadeAtiva} onValueChange={setRestricaoIdadeAtiva} />
          <Text style={styles.checkboxLabel}>Restrição de idade</Text>
          {restricaoIdadeAtiva && (
            <TextInput
              value={idade}
              onChangeText={setIdade}
              style={styles.inputMini}
              keyboardType="numeric"
            />
          )}
        </View>

        <View style={styles.row}>
          <Switch value={pago} onValueChange={setPago} />
          <Text style={styles.checkboxLabel}>Ingresso pago</Text>
          {pago && (
            <TextInput
              value={preco}
              onChangeText={setPreco}
              style={styles.inputMini}
              keyboardType="decimal-pad"
            />
          )}
        </View>

        <View style={styles.row}>
          <Switch value={vip} onValueChange={setVip} />
          <Text style={styles.checkboxLabel}>Opção VIP disponível</Text>
        </View>

        <View style={styles.row}>
          <Switch value={combos} onValueChange={setCombos} />
          <Text style={styles.checkboxLabel}>Combos disponíveis</Text>
        </View>

        <View style={styles.row}>
          <Switch value={comida} onValueChange={setComida} />
          <Text style={styles.checkboxLabel}>Comida/Bebida à venda</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Horário</Text>
          <TextInput value={horario} onChangeText={setHorario} style={styles.inputMini} />
          <Text style={styles.label}>Duração</Text>
          <TextInput value={duracao} onChangeText={setDuracao} style={styles.inputMini} />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Aplicar filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontFamily: 'Montserrat',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    marginTop: 30,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  avatar: {
    marginTop: 50,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3B00FF',
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  picker: {
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  inputMini: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    width: 60,
    height: 35,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  buttonPrimary: {
    backgroundColor: '#3B00FF',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#AAA',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
