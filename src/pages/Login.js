import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isInvalid: true,
      clicked: false,
    };
  }
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript validar email:

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  buttonCheck = () => {
    const { password, email } = this.state;
    const min = 6;
    if (password.length >= min && this.validateEmail(email)) {
      this.setState({
        isInvalid: false,
      });
    } else {
      this.setState({
        isInvalid: true,
      });
    }
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.buttonCheck());
  }

  loginFunction = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login({ email, password });
    this.setState({
      clicked: true,
    });
  }

  render() {
    const { isInvalid, clicked } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <label htmlFor="email">
          Enter your email:
          <input
            id="email"
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="submit"
          value="Submit"
          disabled={ isInvalid }
          onClick={ () => this.loginFunction() }
        >
          Entrar
        </button>
        {clicked ? <Redirect to="/carteira" /> : null }
      </div>);
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
