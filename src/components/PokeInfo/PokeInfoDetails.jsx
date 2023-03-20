const PokeInfoDetails = ({ pokeInfo }) => {
    return (
        <div className="grid gap-8 lg:col-span-2 text-gray-700">
            <div>
                {/* Display the Pokemon's name */}
                <p className="mb-2 text-lg font-bold capitalize">{pokeInfo.name}</p>
                {/* Display the Pokemon's front sprite */}
                <img className="mb-2 mx-auto" src={pokeInfo.sprites.front_default} alt={pokeInfo.name} />
            </div>
            <div>
                <p className="mb-2 text-lg font-bold">About:</p>
                {
                    /* If the Pokemon has two abilities, display them both */
                    pokeInfo.abilities[1] != undefined ? (
                        <p>
                            <a className="capitalize">{pokeInfo.name}</a> is a pokemon type {pokeInfo.types[0].type.name} and some of his abilites are: {pokeInfo.abilities[0].ability.name}, {pokeInfo.abilities[1].ability.name}.
                        </p>
                    ) : /* Otherwise, display only one ability */
                    (
                        <p>
                            <a className="capitalize">{pokeInfo.name}</a> is a pokemon type {pokeInfo.types[0].type.name} and has the {pokeInfo.abilities[0].ability.name} ability.
                        </p>
                    )

                }
            </div>
        </div>
    )
}

export default PokeInfoDetails;
