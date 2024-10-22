import { Pokemon } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon-by-id";




export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {


    try {

        const pokemonsPromises: Promise<Pokemon>[] = ids.map(id => getPokemonById(id));
        return await Promise.all(pokemonsPromises);

        
    } catch (error) {
        throw new Error('Error al obtener los pokemones por ids')
    }



}