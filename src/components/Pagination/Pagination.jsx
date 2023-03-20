import PaginationButton from "./PaginationButton";

// Defining a functional component named Pagination with required props
const Pagination = ({ handlePaginationClick, disabledPrev, disabledNext, pageNumbers, offset }) => {

    return (
        <>
            {/* Rendering PaginationButton component with left type */}
            <PaginationButton
                handlePaginationClick={handlePaginationClick}
                offset={offset}
                disabled={disabledPrev}
                type="left" />

            {/* Iterating over pageNumbers and rendering buttons */}
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`mx-1 px-3 py-1 rounded-md ${offset === (pageNumber - 1) * 10 ? 'border border-gray' : null} hover:scale-110 transition-all duration-100`}
                    onClick={() => handlePaginationClick((pageNumber - 1) * 10)}>
                    {pageNumber}
                </button>
            ))}

            {/* Rendering PaginationButton component with right type */}
            <PaginationButton
                handlePaginationClick={handlePaginationClick}
                offset={offset}
                disabled={disabledNext}
                type="right" />
        </>
    )
}

export default Pagination;
