function UploadButton({ children, isDisabled, handleClick }) {
    return (
        <button
            disabled={isDisabled}
            onClick={handleClick}
            className={`px-8 py-2 text-md font-medium leading-5 text-center text-gray-800 bg-indigo-200 ${
                !isDisabled && 'hover:bg-indigo-300'
            } border border-gray-800 rounded-sm md:w-48 md:flex md:items-center w-full justify-center focus:shadow-outline-blue focus:border-blue-600 ${
                isDisabled && 'cursor-not-allowed'
            }`}
        >
            {children}
        </button>
    );
}

export default UploadButton;
