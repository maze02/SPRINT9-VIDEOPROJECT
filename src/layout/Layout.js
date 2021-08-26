import { Fragment } from "react";
import Menu from "./Menu";

const Layout = (props) => {
  return (
    <Fragment>
      <div className="layout">
        <Menu />
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
