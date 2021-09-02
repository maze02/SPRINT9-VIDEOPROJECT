import { Fragment, useState, useEffect } from "react";
import Menu from "./Menu";
import MenuBurger1 from "./MenuBurger1";

const Layout = (props) => {
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
        {windowSize > 577 && <Menu />}
        {windowSize < 577 && <MenuBurger1 />}
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
