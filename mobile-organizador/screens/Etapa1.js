import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from 'react-native-date-picker'

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDateTime = () => {
    return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  };

  const handleDateChange = (event, newDate) => {
    setShowDatePicker(false);
    if (newDate) {
      const updatedDate = new Date(newDate);
      updatedDate.setHours(date.getHours());
      updatedDate.setMinutes(date.getMinutes());
      onChangeDate(updatedDate);
    }
  };

  const handleTimeChange = (event, newTime) => {
    setShowTimePicker(false);
    if (newTime) {
      const updatedDate = new Date(date);
      updatedDate.setHours(newTime.getHours());
      updatedDate.setMinutes(newTime.getMinutes());
      onChangeDate(updatedDate);
    }
  };

  return (
    <View style={styles.dateTimeContainer}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.dateTimeRow}>
        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateTimeText}>{formatDateTime()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateTimeButton, styles.timeButton]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateTimeText}>Alterar Hora</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const CriarEvento = ({ navigation }) => {
  const dataInicio = new Date();
  const dataFim = new Date(dataInicio.getTime() + 60 * 60 * 1000);

  const [evento, setEvento] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    privacidade: "",
    dataInicio: dataInicio,
    dataFim: dataFim,
  });

  const tiposEvento = [
    "Festa",
    "Conferência",
    "Workshop",
    "Encontro",
    "Lançamento",
  ];
  const opcoesPrivacidade = ["Público", "Privado"];

  const avancar = () => {
    navigation.navigate("Etapa2", { dadosEvento: evento });
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
};

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
  // DateTimeInput styles (English names)
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
  // Main button (Portuguese)
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

export default CriarEvento;
