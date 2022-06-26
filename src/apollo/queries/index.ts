import { gql } from '@apollo/client';

export const PokemonsGrapQL = gql`
query Pokemons($limit: Int, $offset: Int) {
  pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
    id
    name
    order
    height
    weight
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
        id
      }
    }
    abilities: pokemon_v2_pokemonabilities {
      id
      ability: pokemon_v2_ability {
        id
        name
      }
    }
    stats: pokemon_v2_pokemonstats {
      id
      base_stat
      stat: pokemon_v2_stat {
        id
        name
      }
    }
  }
  aggregate: pokemon_v2_pokemon_aggregate {
    aggregate {
      count
    }
  }
}`;

export const PokemonQueryGrapQLFilter = gql`
query PokemonFilter($filterName: [String], $limit: Int, $offset: Int) {
  pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}, where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: $filterName}}}}) {
    id
    name
    order
    height
    weight
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
        id
      }
    }
    abilities: pokemon_v2_pokemonabilities {
      id
      ability: pokemon_v2_ability {
        id
        name
      }
    }
    stats: pokemon_v2_pokemonstats {
      id
      base_stat
      stat: pokemon_v2_stat {
        id
        name
      }
    }
  }
  aggregate: pokemon_v2_pokemon_aggregate(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: $filterName}}}}) {
    aggregate {
      count
    }
  }
}`;

export const PokemonQueryGrapQL = gql`
query Pokemon($name: String) {
  pokemons: pokemon_v2_pokemonspecies(where: {name: {_eq: $name}}) {
    id
    gender_rate
    hatch_counter
    pokemon: pokemon_v2_pokemons(where: {name: {_eq: $name}}) {
      id
      name
      height
      weight
      abilities: pokemon_v2_pokemonabilities {
        id
        ability: pokemon_v2_ability {
          id
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        id
        base_stat
        stat: pokemon_v2_stat {
          id
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        id
        type: pokemon_v2_type {
          id
          name
        }
      }
    }
    egg_groups: pokemon_v2_pokemonegggroups {
      group: pokemon_v2_egggroup {
        name
      }
    }
  	description: pokemon_v2_pokemonspeciesflavortexts(limit: 1) {
      id
      text: flavor_text
    }
    evolutions: pokemon_v2_evolutionchain {
      species: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
        id
        name
        evolves_from_species_id
        evolutions: pokemon_v2_pokemonevolutions {
          min_level
          min_affection
          min_beauty
          min_happiness
          gender_id
          time_of_day
          move: pokemon_v2_move {
            name
          }
          by_held_item: pokemonV2ItemByHeldItemId {
            name
          }
          item: pokemon_v2_item {
            name
          }
          evolution_trigger: pokemon_v2_evolutiontrigger {
            name
          }
          location: pokemon_v2_location {
            name
          }
        }
      }
    }
  }
}`;

