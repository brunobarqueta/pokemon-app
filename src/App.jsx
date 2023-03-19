import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import PokeCard from './components/PokeCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import FavoriteButton from './components/FavoriteButton';
import Pagination from './components/Pagination/Pagination';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(5);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
      })
  }, [offset]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        pokemons.map((item) =>
          fetch(item.url)
            .then((response) => response.json())
        )
      );
      setPokemonData(data);
    };

    fetchData();
  }, [pokemons]);

  const handlePaginationClick = (newOffset) => {
    setOffset(newOffset);
    setCurrentPage(Math.ceil(newOffset / 10) + 1);
  };

  const pageNumbers = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2].filter(
      (pageNumber) => pageNumber > 0
    );

  return (
    <div className="App">
      <p className="text-4xl font-bold">Pokemón App</p>
      <Link to="/favorites" className="float-right">
        <FavoriteButton />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-20">
        {pokemonData.map((data) => (
          <Link to={`/pokeinfo/${data.name}`} key={data.id}>
            <PokeCard data={data} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="mx-1 px-3 py-1 text-black rounded-r-md focus:outline-none disabled:opacity-50 hover:scale-110 transition-all duration-100"
          disabled={offset === 0}
          onClick={() => handlePaginationClick(offset - 10)}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-3 py-1 rounded-md ${offset === (pageNumber - 1) * 10 ? 'border border-gray' : null} hover:scale-110 transition-all duration-100`}
            onClick={() => handlePaginationClick((pageNumber - 1) * 10)}>
            {pageNumber}
          </button>
        ))}
        <button
          className="mx-1 px-3 py-1 text-black rounded-r-md focus:outline-none disabled:opacity-50 hover:scale-110 transition-all duration-100"
          disabled={pokemons.length < 10}
          onClick={() => handlePaginationClick(offset + 10)}>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <Pagination
          handlePrevClick={() => handlePaginationClick(offset - 10)}
          handleNextClick={() => handlePaginationClick(offset + 10)}
        />
      </div>
    </div>
  )
}

export default App
