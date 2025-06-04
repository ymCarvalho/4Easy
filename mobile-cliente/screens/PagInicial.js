import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, PanResponder, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const screenWidth = Dimensions.get('window').width;

export default function PagInicial() {
  const [fontsLoaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf')
  });

  const scrollRef1 = useRef();
  const scrollRef2 = useRef();

  const [scroll1X, setScroll1X] = useState(0);
  const [scroll2X, setScroll2X] = useState(0);

  const scroll = (ref, currentX, setX, direction) => {
    const step = 200;
    const newX = direction === 'right' ? currentX + step : Math.max(0, currentX - step);
    if (ref.current) {
      ref.current.scrollTo({ x: newX, animated: true });
      setX(newX);
    }
  };

  const handleScroll = (setX) => (event) => {
    setX(event.nativeEvent.contentOffset.x);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>4e*</Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar eventos..."
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Eventos abertos</Text>
      <View style={styles.carouselControls}>
        <TouchableOpacity onPress={() => scroll(scrollRef1, scroll1X, setScroll1X, 'left')}><Text style={styles.arrow}>◀</Text></TouchableOpacity>
        <ScrollView
          horizontal
          ref={scrollRef1}
          onScroll={handleScroll(setScroll1X)}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.card} />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => scroll(scrollRef1, scroll1X, setScroll1X, 'right')}><Text style={styles.arrow}>▶</Text></TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Meus eventos</Text>
      <View style={styles.carouselControls}>
        <TouchableOpacity onPress={() => scroll(scrollRef2, scroll2X, setScroll2X, 'left')}><Text style={styles.arrow}>◀</Text></TouchableOpacity>
        <ScrollView
          horizontal
          ref={scrollRef2}
          onScroll={handleScroll(setScroll2X)}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.card} />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => scroll(scrollRef2, scroll2X, setScroll2X, 'right')}><Text style={styles.arrow}>▶</Text></TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Filtro</Text>
      <View style={styles.filterContainer}>
        {['Shows', 'Festas', 'Jogos', 'Esportivo', 'Cultural', 'Outros'].map((tag, i) => (
          <TouchableOpacity key={i} style={styles.filterButton}>
            <Text style={styles.filterText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 32,
    color: '#4000c7',
    fontFamily: 'Montserrat-Bold'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4000c7'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    fontFamily: 'Montserrat'
  },
  searchIcon: {
    fontSize: 20,
    fontFamily: 'Montserrat'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    fontFamily: 'Montserrat-Bold'
  },
  carouselControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrow: {
    fontSize: 24,
    paddingHorizontal: 8,
    fontFamily: 'Montserrat'
  },
  carousel: {
    flex: 1,
    flexDirection: 'row'
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
    borderRadius: 8
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8
  },
  filterButton: {
    backgroundColor: '#662d91',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat'
  }
});