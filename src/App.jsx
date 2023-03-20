import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import PokeCard from './components/PokeCard';
import FavoriteButton from './components/FavoriteButton';
import Pagination from './components/Pagination/Pagination';

function App() {
  // Define state variables for the list of pokemons and their data, as well as the pagination offset and current page number
  const [pokemons, setPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch the list of pokemons from the API whenever the offset changes
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
      })
  }, [offset]);

  // Fetch the data for each pokemon in the list whenever the list of pokemons changes
  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        pokemons.map((item) =>
          fetch(item.url)
            .then((response) => response.json())
        )
      );
      setPokemonData(data)
    };

    fetchData();
  }, [pokemons]);

  // Update the offset and current page number when the pagination is clicked
  const handlePaginationClick = (newOffset) => {
    setOffset(newOffset);
    setCurrentPage(Math.ceil(newOffset / 10) + 1);
  };

  // Generate an array of page numbers to display in the pagination component
  const pageNumbers = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2].filter(
      (pageNumber) => pageNumber > 0
    );

  // Render the Pokemón App UI
  return (
    <div className="App text-gray-700">
      <p className="text-4xl font-bold">Pokemón App</p>
      <Link to="/favorites">
        <FavoriteButton />
      </Link>
      {
        // If pokemonData is available, display a grid of PokeCards for each pokemon, linked to their individual pages
        pokemonData.length > 0 ? (
          <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-20"}>
            {pokemonData.map((data) => (
              <Link to={`/pokeinfo/${data.name}`} key={data.id} className="flex flex-col items-center justify-center">
                <PokeCard data={data} />
              </Link>
            ))}
          </div>
        ) : // Otherwise, display a loading message
        <p className="text-center text-xl mt-20">Loading...</p>
      }
      <div className="flex justify-center mt-10">
        {/* Render the Pagination component with the generated page numbers and event handlers */}
        <Pagination
          pageNumbers={pageNumbers}
          offset={offset}
          handlePaginationClick={handlePaginationClick}
          disabledPrev={offset === 0}
          disabledNext={pokemons.length < 10}
        />
      </div>
    </div>
  )
}

export default App
