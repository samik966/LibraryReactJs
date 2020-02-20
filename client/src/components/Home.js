import React from 'react';
import Header from './Header/Header';
import Search from './Header/Search';
import Products from './Products/Products';
import ProductDetail from './ProductDetail/ProductDetail';
import Login from './Authenticate/Login';
import Signup from './Authenticate/Signup';
import {Route, withRouter} from 'react-router-dom';

class Home extends React.Component {
  state = {
    search: '',
    loggedIn: true,
  };

  onchangeHandler = e => {
    this.setState({search: e.target.value});
  };

  render() {
    let comp = '';
    if (
      this.props.history.location.pathname !== '/users/login' &&
      this.props.history.location.pathname !== '/users/signup'
    ) {
      comp = (
        <React.Fragment>
          <Header />{' '}
          <Search
            changed={this.onchangeHandler}
            searchValue={this.state.search}
          />
          <Route path="/" exact component={Products} />
          <Route path="/ebook/:prodId" exact component={ProductDetail} />
        </React.Fragment>
      );
    } else {
      comp = (
        <React.Fragment>
          <Route path="/users/login" component={Login} />
          <Route path="/users/signup" component={Signup} />
        </React.Fragment>
      );
    }
    return <div> {comp} </div>;
  }
}

export default withRouter(Home);
