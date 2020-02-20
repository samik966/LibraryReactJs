import React from 'react';
import axios from 'axios';
import classes from './Products.module.css';
import ProductItem from '../ProductItem/ProductItem';

class Products extends React.Component {
  state = {
    count: 0,
    products: [],
  };
  componentDidMount() {
    axios.get('/api/products').then(res => {
      this.setState({products: res.data.products, count: res.data.count});
    });
  }

  render() {
    return (
      <div className={classes.Products}>
        <div className={classes.Counts}>Total Books : {this.state.count}</div>
        <ProductItem items={this.state.products} />
      </div>
    );
  }
}

export default Products;
