import React from 'react';
import Info from './Info';
import { AppContext } from '../App';
import axios from 'axios';

function Drawer({ onClose, onRemove, items = [] }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderID] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems, setCartItems } = React.useContext(AppContext);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/orders', { items: cartItems });
      setOrderID(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      cartItems.forEach(item => {
        await axios.delete(/cart/ item)        
      });

    } catch (error) {
      alert('Не удалось создать заказ!');
    }
    setIsLoading(false);
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => {
                return (
                  <div key={obj.id} className="cartItem">
                    <img src={`${obj.imageUrl}`} className="cartItemImg" alt="Sneakers" />
                    <div>
                      <p>{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      className="removeBtn"
                      onClick={() => onRemove(obj.id)}
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? './img/complete-order.png' : './img/empty-cart.svg'}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
