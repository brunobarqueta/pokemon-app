const PokeInfoDetails = ({ pokeInfo }) => {
    return (
        <div className="grid gap-8 lg:col-span-2">
            <div>
                <p className="mb-2 text-lg font-bold capitalize">{pokeInfo.name}</p>
                <img className="mb-2 mx-auto" src={pokeInfo.sprites.front_default} alt={pokeInfo.name} />
            </div>
            <div>
                <p className="mb-2 text-lg font-bold">About:</p>
                <p className="text-gray-700">
                    <a className="capitalize">{pokeInfo.name}</a> is a pokemon type {pokeInfo.types[0].type.name} and some of his abilites are: {pokeInfo.abilities[0].ability.name}, {pokeInfo.abilities[1].ability.name}.
                </p>
            </div>
        </div>
    )
}

export default PokeInfoDetails;