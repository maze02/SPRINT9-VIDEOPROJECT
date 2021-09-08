import { Fragment, useContext, useState, useEffect } from "react";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import Menu from "./Menu";
import MenuBurger1 from "./MenuBurger1";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";

const Layout = (props) => {
  const { handleSubmit, searchRef } = useContext(VideoSearchContext);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const checkSize = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  });

  return (
    <Fragment>
      <Wrapper>
        {windowSize > 768 && <Menu />}
        {windowSize < 768 && <MenuBurger1 />}
        <main>{props.children}</main>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 17% 83%;
  }
`;
export default Layout;
