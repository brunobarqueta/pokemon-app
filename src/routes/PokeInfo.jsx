import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import PokeStats from "../components/PokeInfo/PokeStats";
import PokeInfoDetails from "../components/PokeInfo/PokeInfoDetails";
import FavoriteButton from "../components/FavoriteButton";

const PokeInfo = (props) => {
  // State hooks to manage favorites, Pokemon info, and loading status
  const [favorites, setFavorites] = useState([]);
  const [pokeInfo, setPokeInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // Get the name of the Pokemon from the URL parameters
  const { pokemon } = useParams();

  // Fetch the Pokemon data from the PokeAPI when the component mounts
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((data) => {
        setPokeInfo(data);
        setIsLoading(false);
      });
  }, [])

  // Load any saved favorites from local storage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Add a Pokemon to the favorites list and save to local storage
  const addFavorite = (pokemonId) => {
    if (!favorites.includes(pokemonId)) {
      const newFavorites = [...favorites, pokemonId];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  // Remove a Pokemon from the favorites list and save to local storage
  const removeFavorite = (pokemonId) => {
    const newFavorites = favorites.filter((id) => id !== pokemonId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Add or remove a Pokemon from the favorites list depending on whether it's already in the list
  const handleAddRemoveFavorite = (pokemonId) => {
    favorites.includes(pokemonId) ? removeFavorite(pokemonId) : addFavorite(pokemonId)
  }

  // Show a loading message while the Pokemon data is being fetched
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render the Pokemon information page
  return (
    <>
      {/* Back button to return to home page */}
      <Link to="/" className="float-left bg-white py-2 px-4 rounded shadow hover:scale-110 transition-all duration-300">
        <ArrowLeftIcon className="w-5 h-5 transform" />
      </Link>
      {/* Favorite button and add/remove button */}
      <div className="flex flex-col sm:flex-row float-right">
        <Link to="/favorites">
          <p onClick={() => handleAddRemoveFavorite(pokeInfo.id)} className="float-right text-1xl font-bold mr-5 hover:scale-110 transition-all duration-300">
            Add/Remove from favorites
          </p>
        </Link>
        <Link to="/favorites">
          <FavoriteButton />
        </Link>
      </div>
      <div className="text-gray-700">
        {/* Pokemon information */}
        <div className="px-4 py-16 mt-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 shadow-lg rounded-lg">
          <div className="grid gap-24 row-gap-8 lg:grid-cols-5">
            <PokeInfoDetails pokeInfo={pokeInfo} />
            <PokeStats pokeInfo={pokeInfo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeInfo