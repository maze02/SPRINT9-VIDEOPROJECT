import styled from "styled-components";
import { Button, Accordion } from "@material-ui/core";
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
      <h1 className="logo-header">
        <FontAwesomeIcon icon={faVideo} />
        <span> ReactTube</span>
      </h1>
      <nav>
        <h2>MENU</h2>
        <ul>
          <li>
            <NavLink to="/home" className="navLink" activeClassName="active">
              <FontAwesomeIcon icon={faThLarge} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className="navLink" activeClassName="active">
              <FontAwesomeIcon icon={faClock} /> History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className="navLink"
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faHeart} /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved" className="navLink" activeClassName="active">
              <FontAwesomeIcon icon={faBookmark} /> Saved Videos
            </NavLink>
          </li>
        </ul>
        <div className="sub-menu-separator"></div>
        <h2>TOOLS</h2>
        <ul>
          <li>
            <NavLink
              to="/apitester"
              className="navLink"
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faCog} /> API tester
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className="navLink"
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faChartBar} /> Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/unittests"
              className="navLink"
              activeClassName="active"
            >
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
  h2 {
    font-size: 1rem;
  }
  li {
    margin-bottom: 1rem;
  }
  .navLink {
    color: var(--font-white-1);
    transition: all 0.1s ease-out;

    &:hover {
      color: seagreen;
      font-size: 1.05rem;
    }
  }
  .active {
    color: seagreen;
  }
  .sub-menu-separator {
    width: auto;
    margin-right: 5rem;
    height: 0.05rem;
    background-color: var(--font-white-1);
  }
`;
export default Menu;
