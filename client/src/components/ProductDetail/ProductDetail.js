import React from 'react';
import classes from './ProductDetail.module.css';
import axios from 'axios';
class ProductDetail extends React.Component {
  state = {
    prodItemDetail: null,
    randomColor: [
      '#6293f5',
      '#d97575',
      '#a9d975',
      '#d975b8',
      '#30c999',
      '#b062f5',
    ],
  };

  componentDidMount() {
    axios.get('/api/products/' + this.props.match.params.prodId).then(res => {
      this.setState({prodItemDetail: res.data.productDetail});
    });
  }

  render() {
    const bgColor = this.state.randomColor[
      Math.floor(Math.random() * this.state.randomColor.length)
    ];
    let item = '';
    if (this.props.match.params.prodId) {
      item = <p> Loading...</p>;
    }
    if (this.state.prodItemDetail) {
      const {name, author, price, desc, productImg} = this.state.prodItemDetail;

      item = (
        <React.Fragment>
          <div
            style={{backgroundColor: `${bgColor}`}}
            className={classes.heading}>
            <h4> {name.toLowerCase()}</h4>
            <h5> {author} </h5>
          </div>
          <div className={classes.bookContainer}>
            <img src={'../' + productImg} alt="" />
          </div>
          <hr className={classes.seperator} />
          <div className={classes.desc}>
            <h4>Description</h4>
            <h6>
              Price : <span style={{color: `${bgColor}`}}> ${price} </span>
            </h6>
            <p>{desc}</p>
          </div>
        </React.Fragment>
      );
    }
    return <div>{item}</div>;
  }
}

export default ProductDetail;
