import styles from "./pokemonCard.module.css";

const PokemonCrad = ({ pokemonData }) => {
  console.log("pokemonData:", pokemonData);
  return (
    <div className={styles.pokemonCard}>
      <h3>{pokemonData.name}</h3>
    </div>
  );
};

export default PokemonCrad;
