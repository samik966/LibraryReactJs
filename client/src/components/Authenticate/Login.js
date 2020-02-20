import React, {Component} from 'react';
import classes from './Login.module.css';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import Inputs from '../Inputs/Inputs';
import axios from 'axios';
class Login extends Component {
  state = {
    LoginForm: {
      email: {
        inputType: 'input',
        type: 'email',
        label: 'Email',
        value: '',
        active: false,
      },
      password: {
        inputType: 'input',
        type: 'password',
        label: 'Password',
        value: '',
        active: false,
      },
    },
      message : '',
  };
  activeField = (e, id) => {
    const updateForm = {
      ...this.state.LoginForm,
    };
    const field = {...updateForm[id]};
    field.active = true;
    updateForm[id] = field;
    this.setState({LoginForm: updateForm});
  };

  disableField = (e, id) => {
    if (e.target.value === '') {
      const updateForm = {
        ...this.state.SignupForm,
      };
      const field = {...updateForm[id]};
      field.active = false;
      updateForm[id] = field;
      this.setState({SignupForm: updateForm});
    }
  };

  updateField = (e, id) => {
    const updateForm = {
      ...this.state.LoginForm,
    };
    const field = {
      ...updateForm[id],
    };
    field.value = e.target.value;
    updateForm[id] = field;
    this.setState({LoginForm: updateForm});
  };

  submitHandler = e => {
    e.preventDefault();
    let userData = {};
    for (let field in this.state.LoginForm) {
      userData[field] = this.state.LoginForm[field].value;
    }
    axios
      .post('/api/users/login', userData)
      .then(res => {
        this.setState({message : res.data.message});
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    let formArray = [];
    for (let key in this.state.LoginForm) {
      formArray.push({
        id: key,
        config: this.state.LoginForm[key],
      });
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        <h3>sign in</h3>
        <p> {this.state.message}</p>
        {formArray.map(formEl => (
          <Inputs
            ElType={formEl.config.inputType}
            type={formEl.config.type}
            value={formEl.config.value}
            key={formEl.id}
            active={formEl.config.active}
            Label={formEl.config.label}
            focused={e => this.activeField(e, formEl.id)}
            blurred={e => this.disableField(e, formEl.d)}
            changed={e => this.updateField(e, formEl.id)}
          />
        ))}
        <button>Log In</button>
      </form>
    );

    return (
      <div className={classes.Login}>
        <div className={classes.LogoContainer}>
          <img src={logo} alt="logo" />
        </div>
        {form}
        <div className={classes.signupContainer}>
          <Link to="/users/signup">
            <button>Signup</button>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
