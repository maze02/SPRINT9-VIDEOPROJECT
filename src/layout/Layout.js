import { Fragment, useContext, useState, useEffect } from "react";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import Menu from "./Menu";
import MenuBurger1 from "./MenuBurger1";
import SearchBar from "../components/SearchBar";

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
      <div className="layout">
        {windowSize > 768 && <Menu />}
        {windowSize < 768 && <MenuBurger1 />}
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
