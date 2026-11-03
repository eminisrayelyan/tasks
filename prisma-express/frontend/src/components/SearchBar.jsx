function SearchBar({ search, setSearch }) {
    return (
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  }
  
  export default SearchBar;