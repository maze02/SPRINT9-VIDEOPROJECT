import styled from "styled-components";
import { useState } from "react";
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
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const MenuBurger1 = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };
  let collapsedMenu = (
    <div className="menu-header" onClick={toggleMenu}>
      <h1>
        <FontAwesomeIcon icon={faVideo} />
        <span className="logo-header"> ReactTube</span>
      </h1>
      {!showMenu && <FontAwesomeIcon icon={faBars} />}
      {showMenu && <FontAwesomeIcon icon={faTimes} />}
    </div>
  );
  return (
    <header>
      <MenuHeader>{collapsedMenu}</MenuHeader>
      <NavWrapper showMenu={showMenu}>
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
      </NavWrapper>
    </header>
  );
};

const MenuHeader = styled.div`
  .menu-header {
    background-color: var(--background-primary-1);
    color: var(--font-white-1);

    display: flex;
    align-items: baseline;
    justify-content: space-around;

    svg {
      width: 3rem;
      height: 2rem;
      align-self: center;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

const NavWrapper = styled.nav`
  display: ${({ showMenu }) => (showMenu ? "visible" : "none")};
  margin-left: 4rem;

  h2 {
    font-size: 1rem;
  }
  li {
    margin-bottom: 1rem;
  }
  .navLink {
    color: var(--font-white-1);
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

export default MenuBurger1;
