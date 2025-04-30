import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Home as Casa, MessageCircle, Plus, BarChart2, User } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TelaHome = () => (
  <View style={estilos.tela}>
    <Text style={estilos.texto}>Home</Text>
  </View>
);

const TelaChat = () => (
  <View style={estilos.tela}>
    <Text style={estilos.texto}>Chat</Text>
  </View>
);

const TelaEventos = () => (
  <View style={estilos.tela}>
    <Text style={estilos.texto}>Eventos</Text>
  </View>
);

const TelaGrafico = () => (
  <View style={estilos.tela}>
    <Text style={estilos.texto}>Gráfico</Text>
  </View>
);

const TelaPerfil = () => (
  <View style={estilos.tela}>
    <Text style={estilos.texto}>Perfil</Text>
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
            return <Casa color={color} size={24} />;
          }
          if (route.name === "Chat") {
            return <MessageCircle color={color} size={24} />;
          }
          if (route.name === "Eventos") {
            return (
              <TouchableOpacity
                style={estilos.botaoCriar}
                onPress={() => navigation.navigate("Etapa1")}
              >
                <Plus color="white" size={28} />
              </TouchableOpacity>
            );
          }
          if (route.name === "Gráfico") {
            return <BarChart2 color={color} size={24} />;
          }
          if (route.name === "Perfil") {
            return <User color={color} size={24} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={TelaHome} />
      <Tab.Screen name="Chat" component={TelaChat} />
      <Tab.Screen name="Eventos" component={TelaEventos} />
      <Tab.Screen name="Gráfico" component={TelaGrafico} />
      <Tab.Screen name="Perfil" component={TelaPerfil} />
    </Tab.Navigator>
  );
};

const estilos = StyleSheet.create({
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
});

export default Tabs;
