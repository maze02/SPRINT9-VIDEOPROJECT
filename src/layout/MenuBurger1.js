import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";
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
        <span className="logo-header"> VidEdu</span>
      </h1>
      {!showMenu && <FontAwesomeIcon icon={faBars} />}
      {showMenu && <FontAwesomeIcon icon={faTimes} />}
    </div>
  );
  return (
    <header>
      <MenuHeader>{collapsedMenu}</MenuHeader>
      <NavWrapper showMenu={showMenu}>
        <Nav />
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
    justify-content: space-between;
    margin: 0rem 2rem 0rem 2rem;

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
