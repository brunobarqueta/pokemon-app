import PokeStatsText from "./PokeStatsText";

const PokeStats = ({ pokeInfo }) => {
    return (
        <div className="grid border divide-y rounded lg:col-span-3 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            <div className="flex flex-col justify-between p-10">
                <PokeStatsText pokeStats={pokeInfo.stats.slice(0, 3)} />
            </div>
            <div className="flex flex-col justify-between p-10">
                <PokeStatsText pokeStats={pokeInfo.stats.slice(3, 6)} />
            </div>
        </div>
    )
}

export default PokeStats;