import React from 'react';
import classes from './ProductItem.module.css';
import {Link} from 'react-router-dom';
const ProductItem = props => {
  return (
    <div className={classes.ProductItem}>
      {props.items.map(item => (
        <Link to={'/ebook/' + item._id} key={item._id}>
          <div className={classes.Card}>
            <img src={item.productImg} alt={item.name} />
            <p>{item.name}</p>
            <p style={{color: '#57b5b6', padding: '5px 0'}}>${item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductItem;
