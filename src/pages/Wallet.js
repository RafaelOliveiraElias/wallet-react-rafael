import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    // requisicao da api
    // console.log('PROPS', this.props);
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h2>
            Usuário:
            <span data-testid="email-field">{email}</span>
          </h2>
          <p>
            Total:
            <span data-testid="total-field">0</span>
          </p>
          <p>
            Câmbio:
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
