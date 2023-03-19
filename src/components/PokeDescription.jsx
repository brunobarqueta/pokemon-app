import React from "react";

const PokemonDescription = ({ abilities, types }) => {
  return (
    <div>
      <h3>Abilities:</h3>
      <ul>
        {abilities.map((ability) => (
          <li key={ability.ability.name}>
            {ability.ability.name} {ability.is_hidden && "(hidden)"}
          </li>
        ))}
      </ul>
      <h3>Types:</h3>
      <ul>
        {types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDescription;