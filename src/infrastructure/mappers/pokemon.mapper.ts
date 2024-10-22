import { getColorsFromImage } from "../../config/helpers/get-colors";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPokemon } from "../interfaces/pokeapi.interfaces";



export class PokemonMapper {

    static pokemonApiPokemonToEntity(pokemon: PokeAPIPokemon): Pokemon {

        const sprites = PokemonMapper.getSprites(pokemon);
        const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    
        const color =  getColorsFromImage();

        return {
            id: pokemon.id,
            name: pokemon.name,
            avatar: avatar,
            sprites: sprites,
            types: pokemon.types.map(({ type }) => type.name), 
            color: color!,

            games: pokemon.game_indices.map(({ version }) => version.name),
            stats: pokemon.stats.map(({ base_stat, stat }) => ({ name: stat.name, value: base_stat })),
            abilities: pokemon.abilities.map(({ ability }) => ability.name),
            moves: pokemon.moves
            .map(({ move, version_group_details }) => ({ name: move.name, level: version_group_details[0].level_learned_at }))
            .sort((a, b) => a.level - b.level),
        }


    }

    static getSprites(data: PokeAPIPokemon): string[] {
        const sprites: string[] = [
          data.sprites.front_default,
          data.sprites.back_default,
          data.sprites.front_shiny,
          data.sprites.back_shiny,
        ];
    
        if (data.sprites.other?.home.front_default)
          sprites.push(data.sprites.other?.home.front_default);
        if (data.sprites.other?.['official-artwork'].front_default)
          sprites.push(data.sprites.other?.['official-artwork'].front_default);
        if (data.sprites.other?.['official-artwork'].front_shiny)
          sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
        if (data.sprites.other?.showdown.front_default)
          sprites.push(data.sprites.other?.showdown.front_default);
        if (data.sprites.other?.showdown.back_default)
          sprites.push(data.sprites.other?.showdown.back_default);
    
        return sprites;
      }
}