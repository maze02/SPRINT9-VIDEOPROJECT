import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchRef, handleSubmit }) => {
  return (
    <div className="searchComponent">
      <div className="searchBar">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Type something and press enter to search"
          ref={searchRef}
          onKeyDown={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SearchBar;
