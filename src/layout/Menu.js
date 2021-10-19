import { MenuStyled } from './Menu.style';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <MenuStyled>
      <h1 className='logo-header'>
        <FontAwesomeIcon icon={faVideo} />
        <span> VidEdu</span>
      </h1>
      <nav>
        <Nav />
      </nav>
    </MenuStyled>
  );
};

export default Menu;
