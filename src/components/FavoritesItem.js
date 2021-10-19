import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from './store/FavoritesCtx';
import { FavoritesItemStyled } from './FavoritesItem.style';

const FavoritesItem = ({
  id,
  title,
  handleVideoSelect,
  videoListState,
  videoListType,
  url,
}) => {
  const { toggleFavorite } = useContext(FavoritesContext);
  return (
    <FavoritesItemStyled>
      <div className='container'>
        <img src={url} alt={title} />
        <div className='heart'>
          <FontAwesomeIcon className='heart-icon' icon={faHeart} />
        </div>
        <div className='links-wrapper'>
          <div
            className='link play'
            onClick={() => {
              handleVideoSelect(id, videoListType);
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div
            className='link trash'
            onClick={() => {
              toggleFavorite(id, videoListType, videoListState);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </FavoritesItemStyled>
  );
};

export default FavoritesItem;
