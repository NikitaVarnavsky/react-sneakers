import React from 'react';
import Card from '../components/Card';
import { AppContext } from '../App';

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchValue,
  onAddCart,
  onFavorite,
  isLoading,
}) {

  const {isItemAdded} = React.useContext(AppContext)


  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading
      ? [...Array(8)]
      : filtredItems).map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onFavorite(obj)}
            onPlus={(obj) => onAddCart(obj)}
            added={isItemAdded(item && item.id)}
            loading={isLoading}
            {...item}
          />

        ));
  };
  
  return (
    <div className="content">
      <div className="content-block">
        <h1>Все кроссовки</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          <input onChange={onChangeSearchValue} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}
export default Home;