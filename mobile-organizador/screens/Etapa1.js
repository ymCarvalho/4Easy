import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Etapa1({ navigation }) {
  const [evento, setEvento] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    privacidade: "Público",
    dataInicio: new Date(),
    dataFim: new Date(Date.now() + 3600000), // +1 hora
  });

  const tiposEvento = [
    "Festa",
    "Conferência",
    "Workshop",
    "Encontro",
    "Lançamento",
  ];
  const opcoesPrivacidade = ["Público", "Privado"];

  const SelectInput = ({ title, value, options, onSelect, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <View style={styles.selectContainer}>
        <Text style={styles.label}>{title}</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text style={value ? styles.selectedText : styles.placeholderText}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.optionsList}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const DateTimeInput = ({ title, date, onChangeDate }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState("date");

    const showMode = (currentMode) => {
      setShowPicker(true);
      setMode(currentMode);
    };

    const onChange = (event, selectedDate) => {
      setShowPicker(false);
      if (selectedDate) {
        onChangeDate(selectedDate);
      }
    };

    const formatDate = (date) => {
      return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString(
        "pt-BR",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    };

    return (
      <View style={styles.dateTimeContainer}>
        <Text style={styles.label}>{title}</Text>
        <View style={styles.dateTimeRow}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => showMode("date")}
          >
            <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateTimeButton, styles.timeButton]}
            onPress={() => showMode("time")}
          >
            <Text style={styles.dateTimeText}>Alterar Hora</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
  };

  const avancar = async () => {
    console.log("Dados a serem salvos:", evento);

    if (
      !evento.nome ||
      !evento.descricao ||
      !evento.tipo ||
      !evento.privacidade
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
      return;
    }

    try {
      await AsyncStorage.setItem("@evento", JSON.stringify(evento));
      navigation.navigate("Etapa2");

      const dadosSalvos = await AsyncStorage.getItem("@evento");
      console.log("Dados salvos no AsyncStorage:", JSON.parse(dadosSalvos));
    
    } catch (error) {
      console.error("Erro ao salvar dados da Etapa 1:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Criar Evento</Text>

      <View style={styles.campo}>
        <Text style={styles.rotulo}>Nome do Evento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do evento"
          value={evento.nome}
          onChangeText={(texto) => setEvento({ ...evento, nome: texto })}
        />
      </View>

      <View style={styles.campo}>
        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.descricaoInput]}
          placeholder="Descreva seu evento..."
          value={evento.descricao}
          onChangeText={(texto) => setEvento({ ...evento, descricao: texto })}
          multiline
        />
      </View>

      <SelectInput
        title="Tipo de Evento"
        value={evento.tipo}
        options={tiposEvento}
        onSelect={(opcao) => setEvento({ ...evento, tipo: opcao })}
        placeholder="Selecione o tipo"
      />

      <SelectInput
        title="Privacidade"
        value={evento.privacidade}
        options={opcoesPrivacidade}
        onSelect={(opcao) => setEvento({ ...evento, privacidade: opcao })}
        placeholder="Selecione"
      />

      <DateTimeInput
        title="Data e Hora de Início"
        date={evento.dataInicio}
        onChangeDate={(novaData) =>
          setEvento({ ...evento, dataInicio: novaData })
        }
      />

      <DateTimeInput
        title="Data e Hora de Término"
        date={evento.dataFim}
        onChangeDate={(novaData) => setEvento({ ...evento, dataFim: novaData })}
      />

      <TouchableOpacity style={styles.botaoContinuar} onPress={avancar}>
        <Text style={styles.textoBotao}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#121212",
    padding: 24,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 32,
  },
  campo: {
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 16,
    color: "#AFCBFF",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  descricaoInput: {
    height: 120,
    textAlignVertical: "top",
  },
  selectContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#AFCBFF",
    marginBottom: 8,
    fontWeight: "500",
  },
  selectButton: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  selectedText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  placeholderText: {
    color: "#8E8E93",
    fontSize: 16,
  },
  optionsList: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  optionText: {
    color: "#AFCBFF",
    fontSize: 16,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeButton: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2E",
    flex: 1,
    marginRight: 8,
  },
  timeButton: {
    flex: 0.5,
    marginRight: 0,
  },
  dateTimeText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  botaoContinuar: {
    backgroundColor: "#3A86FF",
    padding: 18,
    borderRadius: 14,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
