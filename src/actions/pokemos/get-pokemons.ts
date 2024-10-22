import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/pokemon';
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from '../../infrastructure/interfaces/pokeapi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';


export const getPokemons = async ( page: number, limit: number = 20 ): Promise<Pokemon[]> => {

  try {
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(`/pokemon?limit=${limit}&offset=${page * limit}`);
    
    const pokemonPromises = data.results.map((pokemon) => {
      return pokeApi.get<PokeAPIPokemon>(pokemon.url);
    });

    const pokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokemons.map(({ data }) => {
      return PokemonMapper.pokemonApiPokemonToEntity(data);
    });

    return await Promise.all(pokemonsPromises);
  
  } catch (error) {
    console.log(error);
    throw new Error('Error to get pokemons');
  }
};
