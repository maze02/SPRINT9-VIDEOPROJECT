import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faClock,
  faThLarge,
  faCog,
  faCheckCircle,
  faChartBar,
  faBookmark,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <Wrapper>
      <h1>
        <FontAwesomeIcon icon={faVideo} /> ReactTube
      </h1>
      <nav>
        <h2>MENU</h2>
        <ul>
          <li>
            <NavLink to="/" className="navLink">
              <FontAwesomeIcon icon={faThLarge} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className="navLink">
              <FontAwesomeIcon icon={faClock} /> History
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="navLink">
              <FontAwesomeIcon icon={faHeart} /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved" className="navLink">
              <FontAwesomeIcon icon={faBookmark} /> Saved Videos
            </NavLink>
          </li>
        </ul>
        <h2>TOOLS</h2>
        <ul>
          <li>
            <NavLink to="/apitester" className="navLink">
              <FontAwesomeIcon icon={faCog} /> API tester
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className="navLink">
              <FontAwesomeIcon icon={faChartBar} /> Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/unittests" className="navLink">
              <FontAwesomeIcon icon={faCheckCircle} /> Unit tests
            </NavLink>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: var(--background-primary-1);
  color: var(--font-white-1);
  li {
    margin-bottom: 1rem;
  }
  .navLink {
    color: var(--font-white-1);
  }
`;
export default Menu;
