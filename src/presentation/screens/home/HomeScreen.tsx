import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, StyleSheet, View} from 'react-native';
import {FAB, Text, useTheme} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemos/get-pokemons';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalStyles } from '../../../config/theme/global-styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/pokemon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/stack/StackNavigation';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen' >{}

export const HomeScreen = ({ navigation }: Props) => {

  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const theme = useTheme();

  //! forma tradicional de usar react-query
  // const {data: pokemons, isLoading} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60,
  // });

  const {isLoading, data, fetchNextPage } = useInfiniteQuery<Pokemon[]>({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage, pages) => pages.length,
    queryFn: async( {pageParam} ) => {

      const pokemons = await getPokemons(Number(pageParam))
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
      });

      return pokemons;
    },
  });



  return (
    <View style={globalStyles.globalMargin}>

      <PokeballBg style={styles.imgPosition}/>

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={pokemon => String(pokemon.id)}
        numColumns={2}
        ListHeaderComponent={()=>(
          <Text variant='displayMedium' style={{marginBottom: 10}}>Pokédex</Text>
        )}
        style={{paddingTop: top + 20}}
        renderItem={({item})=>(
          <PokemonCard pokemon={item}/>
        )}
        onEndReachedThreshold={0.6}
        onEndReached={()=> fetchNextPage ()}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={[globalStyles.fab, {backgroundColor: theme.colors.primary}]}
        label='Buscar'
        color= { theme.dark ? 'black' : 'white'}
        onPress={() => navigation.navigate('SearchSreen')}
      />

    </View>
  );
};


const styles = StyleSheet.create({
  imgPosition:{
    position: 'absolute',
    top: -100,
    right: -100,
  }
})
