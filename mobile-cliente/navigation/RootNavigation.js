import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import PagInicial from "../screens/PagInicial";
import EvAbertos from "../screens/EvAbertos"; 
import MeusEv from "../screens/MeusEv";
import Perfil from "../screens/Perfil";
import FiltroAvan from "../screens/FiltroAvan";
const Stack = createStackNavigator();

const RootNavigator = () => {


  return (


    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Cadastro" component={Cadastro}></Stack.Screen>
        <Stack.Screen name="FiltroAvan" component={FiltroAvan}></Stack.Screen>
        <Stack.Screen name="Perfil" component={Perfil}></Stack.Screen>        
        <Stack.Screen name="PagInicial" component={PagInicial}></Stack.Screen>
        <Stack.Screen name="EvAbertos" component={EvAbertos}></Stack.Screen>
        <Stack.Screen name="MeusEv" component={MeusEv}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
