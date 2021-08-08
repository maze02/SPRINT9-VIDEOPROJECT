import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

//import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchRef, handleSubmit }) => {
  return (
    <div className="searchComponent">
      <div className="searchBar">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="What would you like to search today?"
          ref={searchRef}
        />
      </div>
      <button onClick={handleSubmit}>Search</button>;
    </div>
  );
};

export default SearchBar;
//won't use onChange until the end because it maximises quota
/*x */
/*
<button onClick={handleSubmit}>Search</button>;
*/
/*             onChange={handleSubmit}*/
