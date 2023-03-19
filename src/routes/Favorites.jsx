import { ArrowLeftIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokeCard from '../components/PokeCard';

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        console.log("entrei no useeffect")
        const fetchData = async () => {
            const data = await Promise.all(
                favorites.map((item) => {
                    console.log(item)
                    return fetch(`https://pokeapi.co/api/v2/pokemon/${item}/`)
                        .then((response) => response.json())
                })
            );
            setIsLoading(false);
            setPokemonData(data);
        };

        fetchData();
    }, [favorites]);

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

    if (isLoading) {
        return <p>Loading...</p>;
    }
    console.log(pokemonData)
    return (
        <div>
            <Link to="/" className="float-left bg-white py-2 px-4 rounded shadow hover:scale-110 transition-all duration-300">
                <ArrowLeftIcon className="w-5 h-5 transform" />
            </Link>
            <p className="text-4xl font-bold">Favorites</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-20">
                {pokemonData.map((data) => (
                    <Link to={`/pokeinfo/${data.name}`} key={data.id}>
                        <PokeCard data={data} favorite={true}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Favorites;