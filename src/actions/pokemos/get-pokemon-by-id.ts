import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";



export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {

    try {
        const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${pokemonId}`);
        return PokemonMapper.pokemonApiPokemonToEntity(data);
        
    } catch (error) {
        console.log(error)
        throw new Error('Error to get pokemon by id')
        
    }
}