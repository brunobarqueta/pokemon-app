import { StarIcon } from '@heroicons/react/solid';

const FavoriteButton = () => {

    return (
        <>
            <div className="flex float-right items-center hover:scale-110 transition-all duration-100">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <p className="text-1xl font-bold mr-2">
                    Favorites
                </p>
            </div>
        </>
    )
}

export default FavoriteButton;