import React from 'react';

import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function Header(props) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <header className='header'>
      <Link to='/'>
        <div className='headerLeft'>
          <img width={40} height={40} src='/img/logo.png' alt='logo' />
          <div>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className='headerRight'>
        <li onClick={props.onClickCart} className='itemList'>
          <img src='/img/cart.svg' alt='cart' />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to='/favorites'>
            <img className='headerHeart' width='18' height='18' src='./img/heart.svg' alt='heart' />
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <img
              className='headerHeart'
              width='18'
              height='18'
              src='./img/user.svg'
              alt='Пользователь'
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
