import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import PokeStats from "../components/PokeStats";
import PokeInfoDetails from "../components/PokeInfoDetails";
import FavoriteButton from "../components/FavoriteButton";

const PokeInfo = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [pokeInfo, setPokeInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { pokemon } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((data) => {
        setPokeInfo(data);
        setIsLoading(false);
      });
  }, [])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (pokemonId) => {
    if (!favorites.includes(pokemonId)) {
      const newFavorites = [...favorites, pokemonId];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (pokemonId) => {
    const newFavorites = favorites.filter((id) => id !== pokemonId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleAddRemoveFavorite = (pokemonId) => {
    favorites.includes(pokemonId) ? removeFavorite(pokemonId) : addFavorite(pokemonId)
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Link to="/" className="float-left bg-white py-2 px-4 rounded shadow hover:scale-110 transition-all duration-300">
        <ArrowLeftIcon className="w-5 h-5 transform" />
      </Link>
      <Link to="/favorites" className="float-right">
        <FavoriteButton />
        <p onClick={() => handleAddRemoveFavorite(pokeInfo.id)} className="float-right text-1xl font-bold mr-5 hover:scale-110 transition-all duration-300">
          Add/Remove from favorites
          </p>
      </Link>
      <div className="px-4 py-16 mt-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 shadow-lg rounded-lg">
      
        <div className="grid gap-24 row-gap-8 lg:grid-cols-5">
          <PokeInfoDetails pokeInfo={pokeInfo}/>
          <PokeStats pokeInfo={pokeInfo}/>
        </div>
      </div>
    </>
  );
}

export default PokeInfo