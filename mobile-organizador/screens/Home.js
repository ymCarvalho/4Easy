import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchEventos = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get("http://192.168.30.147:3000/eventos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEventos(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DetalhesEvento", { eventoId: item.eventoId })
      }
    >
      {item.Midia && item.Midia.length > 0 && (
        <Image
          source={{ uri: item.Midia[0].url }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.NomeEvento}</Text>
        <Text style={styles.cardDate}>
          {new Date(item.DataInicio).toLocaleDateString()} -{" "}
          {new Date(item.DataFim).toLocaleDateString()}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.DescEvento}
        </Text>
        {item.Localizacao && (
          <Text style={styles.cardLocation}>
            {item.Localizacao.cidade}, {item.Localizacao.estado}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1400B4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Eventos</Text>

      {eventos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não criou nenhum evento
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("Etapa1")}
          >
            <Text style={styles.createButtonText}>Criar primeiro evento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={eventos}
          renderItem={renderItem}
          keyExtractor={(item) => item.eventoId.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const TelaChat = () => (
  <View style={styles.tela}>
    <Text style={styles.texto}>Chat</Text>
  </View>
);

const TelaEventos = () => (
  <View style={styles.tela}>
    <Text style={styles.texto}>Eventos</Text>
  </View>
);

const TelaGrafico = () => (
  <View style={styles.tela}>
    <Text style={styles.texto}>Gráfico</Text>
  </View>
);

const TelaPerfil = () => (
  <View style={styles.tela}>
    <Text style={styles.texto}>Perfil</Text>
  </View>
);

const Tabs = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#1400B4",
        tabBarInactiveTintColor: "#777",
        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <MaterialIcons name="home" color={color} size={24} />;
          }
          if (route.name === "Chat") {
            return <MaterialIcons name="chat" color={color} size={24} />;
          }
          if (route.name === "Eventos") {
            return (
              <TouchableOpacity
                style={styles.botaoCriar}
                onPress={() => navigation.navigate("Etapa1")}
              >
                <Feather name="plus" color="white" size={28} />
              </TouchableOpacity>
            );
          }
          if (route.name === "Gráfico") {
            return <AntDesign name="barschart" color={color} size={24} />;
          }
          if (route.name === "Perfil") {
            return <MaterialIcons name="person" color={color} size={24} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={TelaChat} />
      <Tab.Screen name="Eventos" component={TelaEventos} />
      <Tab.Screen name="Gráfico" component={TelaGrafico} />
      <Tab.Screen name="Perfil" component={TelaPerfil} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#03001E",
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "white",
    fontSize: 20,
  },
  botaoCriar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1400B4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 6,
  },

  container: {
    flex: 1,
    backgroundColor: "#03001E",
    padding: 16,
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat_700Bold",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#03001E",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#1400B4",
    padding: 15,
    borderRadius: 8,
  },
  createButtonText: {
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Montserrat_600SemiBold",
  },
  cardDate: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Montserrat_400Regular",
  },
  cardDescription: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Montserrat_400Regular",
  },
  cardLocation: {
    color: "#1400B4",
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Tabs;
