import { ArrowLeftIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokeCard from '../components/PokeCard';

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true); // useState hook to set the loading state
    const [favorites, setFavorites] = useState([]); // useState hook to store the list of favorite Pokemon
    const [pokemonData, setPokemonData] = useState([]); // useState hook to store the data of favorite Pokemon

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // retrieve the stored list of favorite Pokemon from local storage or set an empty array
        setFavorites(storedFavorites); // set the favorites state to the retrieved list
    }, []);

    useEffect(() => {
        const fetchData = async () => { // define an async function to fetch the data of each favorite Pokemon
            const data = await Promise.all( // execute all the fetch requests simultaneously and wait for them to complete
                favorites.map((item) => {
                    return fetch(`https://pokeapi.co/api/v2/pokemon/${item}/`)
                        .then((response) => response.json())
                })
            );
            setIsLoading(false); // set the loading state to false
            setPokemonData(data); // set the Pokemon data state to the fetched data
        };

        fetchData(); // execute the fetchData function
    }, [favorites]); // run the effect only when the favorites state changes

    if (isLoading) {
        return <p>Loading...</p>; // render a loading message while the data is being fetched
    }
    
    return (
        <div className="text-gray-700">
            <div>
                <Link to="/" className="float-left bg-white py-2 px-4 rounded shadow hover:scale-110 transition-all duration-300">
                    <ArrowLeftIcon className="w-5 h-5 transform" />
                </Link>
                <p className="text-4xl font-bold">Favorites</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-20">
                {pokemonData.map((data) => (
                    <Link to={`/pokeinfo/${data.name}`} key={data.id} className="flex flex-col items-center justify-center">
                        {/*  render a PokeCard component with the data of each favorite Pokemon */}
                        <PokeCard data={data} favorite={true} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
