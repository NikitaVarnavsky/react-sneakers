import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  // https://66c7de82d329f1e8.mokky.dev/

  React.useEffect(() => {
    async function fetchData() {
      // fetch('https://65648724ceac41c0761e5c77.mockapi.io/items')
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((json) => {
      //     setItems(json);
      //   });
      // Отображение корзины
      setIsLoading(true);
      const cartResponse = await axios.get('https://65648724ceac41c0761e5c77.mockapi.io/Drawer');
      const favoritesResponse = await axios.get(
        'https://6581b52f3dfdd1b11c43fcc7.mockapi.io/Favorites',
      );
      const itemsResponse = await axios.get('https://65648724ceac41c0761e5c77.mockapi.io/items');
      setIsLoading(false);

      // setFavorites(JSON.parse(localStorage.getItem('Favor')) ?? []);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://65648724ceac41c0761e5c77.mockapi.io/Drawer/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      // axios.delete();
    } else {
      axios.post('https://65648724ceac41c0761e5c77.mockapi.io/Drawer/', obj);
      setCartItems((prev) => [...prev, obj]);
      // prev = предыдущие данные
    }
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://65648724ceac41c0761e5c77.mockapi.io/Drawer/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onFavorite = async (obj) => {
    // axios.post('https://65648724ceac41c0761e5c77.mockapi.io/Favorite', obj);
    if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      axios.delete(`https://6581b52f3dfdd1b11c43fcc7.mockapi.io/Favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      // localStorage.setItem(`${obj.id}`, JSON.stringify(obj));
      // setFavorites((prev) => [...prev, obj]);
      const resp = await axios.post('https://6581b52f3dfdd1b11c43fcc7.mockapi.io/Favorites/', obj);

      setFavorites((prev) => [...prev, resp.data]);
      // localStorage.setItem('Favor', JSON.stringify([...favorites, obj]));
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onFavorite,
        onAddCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className='wrapper'>
        {cartOpened ? (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
        ) : null}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                onAddCart={onAddCart}
                onFavorite={onFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route path='/favorites' exact element={<Favorites />} />
          <Route path='/orders' exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
