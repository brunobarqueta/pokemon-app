const PokeStatsText = ({ pokeStats }) => {

    return (
        <>
            {
                pokeStats.map((item) => {
                    return (
                        <div key={item.stat.name}>
                            <p className="text-lg font-semibold text-gray-800 sm:text-base capitalize">
                                {item.stat.name}
                            </p>
                            <p className="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">
                                {item.base_stat}
                            </p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default PokeStatsText;