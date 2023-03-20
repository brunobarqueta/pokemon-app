const PokeCard = ({ data }) => {
    return (
      <div className="max-w-xs h-60 w-60 rounded-lg overflow-hidden shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer justify-items-center">
        <img className="mx-auto mt-10" src={data.sprites.front_default} alt={data.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 capitalize overflow-hidden" style={{ maxWidth: '200px' }}>{data.name}</div>
        </div>
      </div>
    )
  }
  
  export default PokeCard;