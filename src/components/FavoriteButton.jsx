import { StarIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const FavoriteButton = () => {

    return (
        <>
            <div className="flex items-center float-right hover:scale-110 transition-all duration-100">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <p className="text-1xl font-bold mr-2">
                    Favorites
                </p>
            </div>
        </>
    )
}

export default FavoriteButton;