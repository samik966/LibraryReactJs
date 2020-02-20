import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Signup.module.css';
import logo from '../../assets/logo.png';
import Inputs from '../Inputs/Inputs';
import axios from 'axios';

class Signup extends Component {
  state = {
    SignupForm: {
      name: {
        inputType: 'input',
        type: 'text',
        value: '',
        label: 'Full Name',
        active: false,
      },
      phone: {
        inputType: 'input',
        type: 'number',
        value: '',
        label: 'Phone Number',
        active: false,
      },
      email: {
        inputType: 'input',
        type: 'email',
        value: '',
        label: 'Email',
        active: false,
      },
      password: {
        inputType: 'input',
        type: 'password',
        value: '',
        label: 'Password',
        active: false,
      },
    },
  };

  activeField = (e, id) => {
    const updateForm = {
      ...this.state.SignupForm,
    };
    const field = {...updateForm[id]};
    field.active = true;
    updateForm[id] = field;
    this.setState({SignupForm: updateForm});
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
      ...this.state.SignupForm,
    };
    const field = {
      ...updateForm[id],
    };
    field.value = e.target.value;
    updateForm[id] = field;
    this.setState({SignupForm: updateForm});
    //this.activeField(e, id);
  };

  submitHandler = e => {
    e.preventDefault();
    let userData = {};
    for (let field in this.state.SignupForm) {
      userData[field] = this.state.SignupForm[field].value;
    }
    axios
      .post('/api/users/signup', userData)
      .then(res => {
        JSON.stringify(res.data);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };
  render() {
    let formArray = [];
    for (let key in this.state.SignupForm) {
      formArray.push({
        id: key,
        config: this.state.SignupForm[key],
      });
    }

    let form = (
      <form onSubmit = {this.submitHandler} >
        <h3>sign up</h3>
        {formArray.map(formEl => (
          <Inputs
            ElType={formEl.config.inputType}
            type={formEl.config.type}
            value={formEl.config.value}
            key={formEl.id}
            active={formEl.config.active}
            Label={formEl.config.label}
            focused={e => this.activeField(e, formEl.id)}
            blurred={e => this.disableField(e, formEl.id)}
            changed={e => this.updateField(e, formEl.id)}
          />
        ))}
        <button>Sign Up</button>
      </form>
    );
    return (
      <div className={classes.Signup}>
        <div className={classes.LogoContainer}>
          <img src={logo} alt="logo" />
        </div>

        {form}

        <div className={classes.loginContainer}>
          <Link to="/users/login">
            <button> Login </button>
          </Link>
          <Link to="/"> Return to Home </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
