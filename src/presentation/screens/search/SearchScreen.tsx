


import { FlatList, View } from "react-native"
import { globalStyles } from "../../../config/theme/global-styles"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Text, TextInput } from "react-native-paper";
import { Pokemon } from "../../../domain/entities/pokemon";
import { PokemonCard } from "../../components/pokemons/PokemonCard";
import { useQuery } from "@tanstack/react-query";
import { getPokemonNamesWithId } from "../../../actions/pokemos/get-pokemon-names-with-id";
import { useMemo, useState } from "react";
import { FullScreenLoaders } from "../../components/ui/FullScreenLoaders";
import { getPokemonsByIds } from "../../../actions/pokemos/get-pokemons-by-ids";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";


export const SearchSreen = () => {

  const { top } = useSafeAreaInsets();  
  const [ term, setTerm ] = useState('')
  const debouncedValue = useDebouncedValue(term)

  const { data: pokemonNameList = [], isLoading } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  })


  const pokemonNameIdList = useMemo(() => {

    if(!isNaN(Number(debouncedValue))){
      const pokemon =pokemonNameList.find(pokemon => pokemon.id === Number(debouncedValue));
      return pokemon ? [pokemon] : [];
    }

    if(debouncedValue.length === 0) return [];

    if(debouncedValue.length < 3) return [];

    return pokemonNameList.filter(
      pokemon => pokemon.name.includes(debouncedValue.toLocaleLowerCase())
    );

  }, [debouncedValue])


  const { isLoading: isloadingPokemons, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 60, // 1 hora
  })


  if(isLoading) (<FullScreenLoaders/>)



  return (
    <View style={[globalStyles.globalMargin, { marginTop: top + 20 }]}>
      
      <TextInput
        placeholder='min. 3 caracteres'
        label='Buscar Pokémon'
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
        
      />

      {
        isloadingPokemons && (
          <ActivityIndicator style={{ paddingTop: 20 }}/>
        )
      }


      <FlatList
        data={ pokemons as Pokemon[] }
        keyExtractor={pokemon => String(pokemon.id)}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item})=>( <PokemonCard pokemon={item}/> )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ <View style={{height: 150}}/> }
      />


    </View>
  )
}
