import React from 'react';

import Card from '../components/Card';
import axios from 'axios';
import { AppContext } from '../App';

const Orders = () => {
  const { onFavorite, onAddCart, isItemAdded } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://6581b52f3dfdd1b11c43fcc7.mockapi.io/Orders/');
        console.log(data);
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка');
      }
    })();
  }, []);

  return (
    <div className='content'>
      <div className='content-block'>
        <h1>Мои заказы</h1>
        <div className='search-block'>
          <img src='/img/search.svg' alt='Search' />
          <input placeholder='Поиск...' />
        </div>
      </div>
      <div className='sneakers'>
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onFavorite(obj)}
            onPlus={(obj) => onAddCart(obj)}
            added={isItemAdded(item && item.id)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
export default Orders;
