function SearchInput({ handleFilterChange }) {
    return (
        <input
            className="order-last px-2 py-2 border-2 border-gray-500 rounded-sm md:order-first md:w-1/2"
            placeholder="Search documents..."
            onChange={handleFilterChange}
        />
    );
}

export default SearchInput;
