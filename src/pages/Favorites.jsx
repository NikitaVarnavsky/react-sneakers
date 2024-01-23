import React from 'react';
import { AppContext } from '../App';
import Card from '../components/Card';

function Favorites() {
  const { favorites, onFavorite } = React.useContext(AppContext);

  return (
    <div className='content'>
      <div className='content-block'>
        <h1>Избранное</h1>
        <div className='search-block'>
          <img src='/img/search.svg' alt='Search' />
          <input placeholder='Поиск...' />
        </div>
      </div>
      <div className='sneakers'>
        {favorites.map((item) => (
          <Card key={item.id} onFavorite={onFavorite} favorited={true} {...item} />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
