import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Ativos");

  const eventos = [
    {
      id: "1",
      titulo: "Festa Junina 2025",
      subtitulo: "Organizado por Jorge Junior",
      data: "20 JUN",
      imagem: require("../assets/evento.jpg"),
      categoria: "Ativos",
    },
    {
      id: "2",
      titulo: "Festival de Música",
      subtitulo: "Organizado por Ana Souza",
      data: "05 JUL",
      imagem: require("../assets/evento.jpg"),
      categoria: "Ativos",
    },
    {
      id: "3",
      titulo: "Conferência de Tecnologia",
      subtitulo: "Organizado por TechEvents",
      data: "12 AGO",
      imagem: require("../assets/evento.jpg"),
      categoria: "Concluídos",
    },
    {
      id: "4",
      titulo: "Workshop de Design",
      subtitulo: "Organizado por Studio X",
      data: "15 JUN",
      imagem: require("../assets/evento.jpg"),
      categoria: "Concluídos",
    },
    {
      id: "5",
      titulo: "Webinar sobre Startups",
      subtitulo: "Organizado por StartUp Brazil",
      data: "25 JUL",
      imagem: require("../assets/evento.jpg"),
      categoria: "Rascunhos",
    },
    {
      id: "6",
      titulo: "Seminário de Inovação",
      subtitulo: "Organizado por Innovators",
      data: "30 JUN",
      imagem: require("../assets/evento.jpg"),
      categoria: "Rascunhos",
    },
  ];

  const renderEvento = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EventDetails", { evento: item })}
    >
      <Image source={item.imagem} style={styles.imagem} />
      <View style={styles.cardInfo}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.subtitulo}>{item.subtitulo}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataTexto}>{item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  const eventosFiltrados = eventos.filter((evento) => evento.categoria === selectedTab);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/branca.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.tabs}>
        {["Ativos", "Concluídos", "Rascunhos"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderEvento}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.tabBar}>
        <MaterialIcons
          name="home"
          size={24}
          color="#1400B4"
          onPress={() => navigation.navigate("Home")} // Home
        />
        <Feather
          name="message-circle"
          size={24}
          color="#fff"
          onPress={() => navigation.navigate("Chat")} // Chat
        />
        <TouchableOpacity
          style={styles.centralButton}
          onPress={() => navigation.navigate("Etapa1")} // Etapa1
        >
          <Feather name="plus" size={28} color="#fff" />
        </TouchableOpacity>
        <AntDesign
          name="barschart"
          size={24}
          color="#fff"
        />
        <MaterialIcons
          name="person"
          size={24}
          color="#fff"
          onPress={() => navigation.navigate("Perfil")} // Perfil
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e0033", paddingTop: 50 },

  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 200, // 2x tamanho anterior
    height: 80,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#1E1E1E",
    marginHorizontal: 5,
  },
  tabButtonActive: {
    backgroundColor: "#1400B4",
  },
  tabText: {
    color: "#aaa",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    margin: 10,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitulo: {
    color: "#aaa",
    fontSize: 13,
  },
  dataContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dataTexto: {
    color: "#fff",
    fontSize: 12,
    backgroundColor: "#1400B4",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    overflow: "hidden",
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    height: 70,
    paddingBottom: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  centralButton: {
    width: 60,
    height: 60,
    backgroundColor: "#1400B4",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default HomeScreen;
