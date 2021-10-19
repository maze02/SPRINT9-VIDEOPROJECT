import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faClock,
  faThLarge,
  faCog,
  faCheckCircle,
  faChartBar,
  faBookmark,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <>
      <h2>MENU</h2>
      <ul>
        <li>
          <NavLink to='/home' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faThLarge} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/history' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faClock} /> History
          </NavLink>
        </li>
        <li>
          <NavLink to='/favorites' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faHeart} /> Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to='/saved' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faBookmark} /> Saved Videos
          </NavLink>
        </li>
      </ul>
      <div className='sub-menu-separator'></div>
      <h2>TOOLS</h2>
      <ul>
        <li>
          <NavLink to='/apitester' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faCog} /> API tester
          </NavLink>
        </li>
        <li>
          <NavLink to='/analytics' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faChartBar} /> Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to='/unittests' className='navLink' activeClassName='active'>
            <FontAwesomeIcon icon={faCheckCircle} /> Unit tests
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
