const PaginationButton = ({handleClick}) => {

    return (
        <button
          className="mx-1 px-3 py-1 text-black rounded-r-md focus:outline-none disabled:opacity-50 hover:scale-110 transition-all duration-100"
          disabled={pokemons.length < 10}
          onClick={() => handleClick}>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
    )
}

export default PaginationButton;