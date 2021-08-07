const SearchBar = ({ searchRef, handleSubmit }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="What would you like to search today?"
        ref={searchRef}
      />

      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
//won't use onChange until the end because it maximises quota
