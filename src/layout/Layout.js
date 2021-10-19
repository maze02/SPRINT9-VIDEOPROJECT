import { useState, useEffect } from 'react';
import Menu from './Menu';
//TODO Rename MenuBurger1
import MenuBurger1 from './MenuBurger1';
import { LayoutStyled } from './Layout.style';

const Layout = (props) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const checkSize = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  });

  return (
    <>
      <LayoutStyled>
        {windowSize > 768 && <Menu />}
        {windowSize < 768 && <MenuBurger1 />}
        <main>{props.children}</main>
      </LayoutStyled>
    </>
  );
};

export default Layout;
