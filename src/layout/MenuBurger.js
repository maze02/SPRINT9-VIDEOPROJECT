import styled from "styled-components";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const MenuBurger = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const content = (
    <nav>
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
  );
  return (
    <Wrapper>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={expanded === "panel1" ? <CloseIcon /> : <MenuIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className="test">
            <h1>
              <FontAwesomeIcon icon={faVideo} /> ReactTube
            </h1>
            <h2>MENU</h2>
          </div>
        </AccordionSummary>
        <AccordionDetails
          className="test2"
          children={content}
        ></AccordionDetails>
      </Accordion>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: var(--background-primary-1);
  //color: var(--background-primary-1);
  //color: var(--font-white-1);
  ul {
    margin-left: 2rem;
  }
  li {
    margin-bottom: 1rem;
    color: var(--background-primary-1);
  }
  .navLink {
    color: var(--font-white-1);
  }
  .test {
    display: flex;
    width: auto;
    align-items: baseline;
    justify-content: space-around !important;
    color: var(--background-primary-1);

    h1 {
      margin-right: 1rem;
    }
    h2 {
      justify-self: end;
    }
  }

  .test2 {
    //color: var(--background-primary-1);
    background-color: red;

    nav ul li {
      margin-bottom: 1rem;
      color: black;
    }
  }
`;
export default MenuBurger;
