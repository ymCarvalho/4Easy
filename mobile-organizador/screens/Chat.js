// MensagensScreen.js - Versão Modernizada
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  withTiming,
  interpolateColor
} from "react-native-reanimated";

// Importar tema
import { theme } from "../theme";

// Componentes customizados
import SearchBar from "../components/SearchBar";
import MessageCard from "../components/MessageCard";
import FilterTabs from "../components/FilterTabs";
import BottomTabBar from "../components/BottomTabBar";

const mensagensFake = Array.from({ length: 15 }).map((_, i) => ({
  id: i.toString(),
  nome: `Usuário ${i + 1}`,
  mensagem: i % 3 === 0 
    ? "Olá! Como está o evento?" 
    : i % 2 === 0 
    ? "Preciso de ajuda com a organização" 
    : "Obrigado pela resposta!",
  hora: `${10 + (i % 12)}:${30 + (i % 30)}`,
  avatar: require("../imagens/avatar-placeholder.png"),
  tipo: i % 4 === 0 ? "grupo" : "pessoa",
  novasmensagens: i % 3 === 0 ? Math.floor(Math.random() * 5) + 1 : 0,
  online: i % 2 === 0,
  ultimaVez: i % 2 === 0 ? null : "há 5 min"
}));

const MensagensScreen = ({ navigation }) => {
  const [filtro, setFiltro] = useState("Todas");
  const [searchText, setSearchText] = useState("");

  const filtrarMensagens = () => {
    let filtered = mensagensFake;
    
    if (filtro !== "Todas") {
      filtered = filtered.filter(msg => 
        filtro === "Pessoas" ? msg.tipo === "pessoa" : msg.tipo === "grupo"
      );
    }
    
    if (searchText.trim()) {
      filtered = filtered.filter(msg =>
        msg.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        msg.mensagem.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  };

  const renderItem = ({ item, index }) => (
    <MessageCard 
      message={item} 
      index={index}
      onPress={() => navigation.navigate("ChatDetail", { contact: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <LinearGradient
        colors={theme.colors.backgroundGradient}
        style={styles.container}
      >
        {/* Header com Logo */}
        <View style={styles.header}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={styles.logoContainer}
          >
            <MaterialIcons name="chat" size={32} color={theme.colors.primary} />
            <Text style={styles.logoText}>Mensagens</Text>
          </LinearGradient>
          
          {/* Notification Badge */}
          <TouchableOpacity style={styles.notificationButton}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.notificationContainer}
            >
              <Feather name="bell" size={20} color={theme.colors.white} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar conversas..."
        />

        {/* Filter Tabs */}
        <FilterTabs
          tabs={["Todas", "Pessoas", "Grupos"]}
          selectedTab={filtro}
          onTabPress={setFiltro}
        />

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={theme.colors.primaryGradient}
            style={styles.statCard}
          >
            <Feather name="message-circle" size={20} color={theme.colors.white} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Ativas</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.statCard}
          >
            <Feather name="users" size={20} color={theme.colors.white} />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Grupos</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            style={styles.statCard}
          >
            <Feather name="clock" size={20} color={theme.colors.white} />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </LinearGradient>
        </View>

        {/* Messages List */}
        <FlatList
          data={filtrarMensagens()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Feather name="message-square" size={48} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>Nenhuma conversa encontrada</Text>
              <Text style={styles.emptySubtext}>
                {searchText ? "Tente ajustar sua busca" : "Inicie uma nova conversa"}
              </Text>
            </View>
          )}
        />

        {/* Floating Action Button */}
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate("NewMessage")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={theme.colors.primaryGradient}
            style={styles.fabGradient}
          >
            <Feather name="edit-3" size={24} color={theme.colors.white} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Tab Bar */}
        <BottomTabBar navigation={navigation} activeTab="Messages" />
      </LinearGradient>
    </SafeAreaView>
  );
};

// ===== COMPONENTES CUSTOMIZADOS =====

// components/MessageCard.js
const MessageCard = ({ message, index, onPress }) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.messageCard}
        >
          {/* Avatar with Online Status */}
          <View style={styles.avatarContainer}>
            <Image source={message.avatar} style={styles.avatar} />
            {message.online && <View style={styles.onlineIndicator} />}
            {message.tipo === "grupo" && (
              <View style={styles.groupBadge}>
                <Feather name="users" size={10} color={theme.colors.white} />
              </View>
            )}
          </View>

          {/* Message Content */}
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName} numberOfLines={1}>
                {message.nome}
              </Text>
              <View style={styles.timeContainer}>
                <Text style={styles.messageTime}>{message.hora}</Text>
                {message.novasmensagens > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{message.novasmensagens}</Text>
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.messagePreview}>
              <Text style={styles.messageText} numberOfLines={1}>
                {message.mensagem}
              </Text>
              {!message.online && message.ultimaVez && (
                <Text style={styles.lastSeen}>{message.ultimaVez}</Text>
              )}
            </View>
          </View>

          {/* Action Indicator */}
          <View style={styles.actionIndicator}>
            <Feather name="chevron-right" size={16} color={theme.colors.textSecondary} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// components/FilterTabs.js (reutilizando do HomeScreen mas adaptado)
const FilterTabs = ({ tabs, selectedTab, onTabPress }) => {
  return (
    <View style={styles.filterContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabPress(tab)}
          style={styles.filterButton}
          activeOpacity={0.8}
        >
          {selectedTab === tab ? (
            <LinearGradient
              colors={theme.colors.primaryGradient}
              style={styles.activeFilter}
            >
              <Text style={styles.activeFilterText}>{tab}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.inactiveFilter}>
              <Text style={styles.inactiveFilterText}>{tab}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  
  logoText: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginLeft: theme.spacing.sm,
  },
  
  notificationButton: {
    position: 'relative',
  },
  
  notificationContainer: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  notificationText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  
  filterButton: {
    marginHorizontal: theme.spacing.xs,
  },
  
  activeFilter: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
  },
  
  inactiveFilter: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  
  activeFilterText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  inactiveFilterText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
  },
  
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  
  statNumber: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginVertical: theme.spacing.xs,
  },
  
  statLabel: {
    fontSize: theme.typography.sizes.xs,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 120, // Espaço para FAB e bottom tab
  },
  
  separator: {
    height: theme.spacing.sm,
  },
  
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.success,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  
  groupBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  
  messageContent: {
    flex: 1,
  },
  
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  
  messageName: {
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
    color: theme.colors.white,
    flex: 1,
  },
  
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  messageTime: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
  
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    marginLeft: theme.spacing.sm,
    minWidth: 20,
    alignItems: 'center',
  },
  
  unreadText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  messageText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  
  lastSeen: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  
  actionIndicator: {
    marginLeft: theme.spacing.sm,
  },
  
  fab: {
    position: 'absolute',
    bottom: 100,
    right: theme.spacing.lg,
  },
  
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  
  emptyText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.white,
    fontWeight: 'bold',
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  
  emptySubtext: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});

export default MensagensScreen;
