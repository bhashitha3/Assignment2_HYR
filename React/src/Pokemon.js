import React from 'react';

const Pokemon = ({ name, imageUrl }) => {
  return (
    <div className="pokemon-card">
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} />
    </div>
  );
};

export default Pokemon;
