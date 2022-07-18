import { randomNumbersFromRange } from '@utilities/random';
import config from '@config';

const fetchJSONResource = async (url) => {
  if (Array.isArray(url)) {
    const responses = await Promise.all(url.map((singleUrl) => fetch(singleUrl)));
    const data = await Promise.all(responses.map((response) => response.json()));
    return data;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const fetchPokemon = async () => {
  const fetchPokemonUrl = 'https://pokeapi.co/api/v2/pokemon'; // ToDo: Move to config
  const fetchPokeballUrl = 'https://pokeapi.co/api/v2/item/4/';

  const pokemonIds = randomNumbersFromRange({
    range: 905, // ToDo: Check the range using API request
    numberOfPicks: config.numberOfPairs,
  });

  const pokemonUrls = pokemonIds.map((pokemonId) => `${fetchPokemonUrl}/${pokemonId}`); // move templates to config as well

  const pokemon = await fetchJSONResource(pokemonUrls);
  const pokeball = await fetchJSONResource(fetchPokeballUrl);

  return {
    cardFaceImageUrls: pokemon.map((pokemonData) => pokemonData.sprites.front_default),
    cardBackImageUrl: pokeball.sprites.default,
  };
};

export default fetchPokemon;
