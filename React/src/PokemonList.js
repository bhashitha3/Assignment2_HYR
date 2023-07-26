import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=3&offset=${offset}`
      );
      const data = response.data.results;
      const pokemonData = await Promise.all(
        data.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            imageUrl: pokemonResponse.data.sprites.front_default,
          };
        })
      );
      setPokemons(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const handleNextClick = () => {
    setOffset((prevOffset) => prevOffset + 3);
  };

  const handlePrevClick = () => {
    if (offset >= 3) {
      setOffset((prevOffset) => prevOffset - 3);
    }
  };

  return (
    <div>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} name={pokemon.name} imageUrl={pokemon.imageUrl} />
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevClick} disabled={offset === 0}>
          PREV
        </button>
        <button onClick={handleNextClick}>NEXT</button>
      </div>
    </div>
  );
};

export default PokemonList;
