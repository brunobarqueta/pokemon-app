import PaginationButton from "./PaginationButton";

const Pagination = ({ handlePrevClick, handleNextClick }) => {
    <>
        <PaginationButton handleClick={handlePrevClick} />

        <PaginationButton handleClick={handleNextClick} />
    </>
}

export default Pagination;