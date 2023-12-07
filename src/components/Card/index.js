import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import { AppContext } from '../../App';

function Card(props) {
  const {
    id,
    title,
    price,
    imageUrl,
    onPlus,
    onFavorite,
    favorited = false,
    added = false,
    loading,
  } = props;

  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  console.log(title, isItemAdded(id));
  const onClickPlus = () => {
    onPlus({ id, title, price, imageUrl });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}>
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="106" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="125" rx="5" ry="5" width="90" height="15" />
          <rect x="0" y="162" rx="9" ry="9" width="80" height="25" />
          <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              onClick={onClickFavorite}
              src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
              alt="Unliked"
            />
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className={styles.cardPrice}>
            <div className={styles.price}>
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            <img
              onClick={onClickPlus}
              className={styles.plus}
              src={isItemAdded(id) ? './img/btn-checked.svg' : './img/btn-plus.svg'}
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
