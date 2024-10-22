
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { PokemonScreen } from '../../screens/pokemon/PokemonsScreen';
import { SearchSreen } from '../../screens/search/SearchScreen';


export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemonId: number , color: string };
  SearchSreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () =>  {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchSreen" component={SearchSreen} />
    </Stack.Navigator>
  );
}