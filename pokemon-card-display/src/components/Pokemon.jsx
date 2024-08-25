// import PokemonCrad from "./PokemonCrad";
import styles from "./pokemon.module.css";

import { useEffect, useState } from "react";
import PokemonCrad from "./PokemonCrad";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  async function fetchPokemon() {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPokemon(data?.results);
      //   console.log(data);
    } catch (error) {
      console.log("Error fetching pokemon :", error);
      setError(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  console.log(pokemon);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something Went wrong!!!</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Pokemon</h1>
      <input type="text" placeholder="Search Pokemon" />

      <div className={styles.card}>
        {pokemon.map((item, index) => (
          <PokemonCrad key={index} pokemonData={item} />
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
