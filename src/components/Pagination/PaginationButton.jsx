import { ChevronRightIcon } from "@heroicons/react/solid";
import { ChevronLeftIcon } from "@heroicons/react/solid";

const PaginationButton = ({handlePaginationClick, disabled, type, offset}) => {

    return (
        <button
          className="mx-1 px-3 py-1 text-black rounded-r-md focus:outline-none disabled:opacity-50 hover:scale-110 transition-all duration-100"
          // Disable button if disabled prop is true
          disabled={disabled}
          // When button is clicked, call handlePaginationClick function with offset parameter based on button type
          onClick={() => type === "left" ? handlePaginationClick(offset - 10) : handlePaginationClick(offset + 10)}>
          {
            // Conditional rendering of icon based on button type
            type === "left" ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />
          }
        </button>
    )
}

export default PaginationButton;
