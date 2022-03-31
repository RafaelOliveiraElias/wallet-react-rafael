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
    const { email, currencies } = this.props;
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
        <main>
          <label htmlFor="value-input">
            Valor:
            <input type="number" id="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select name="currencie" id="currencies">
              {currencies.map((each) => (
                <option
                  value={ each }
                  key={ each }
                >
                  { each }
                </option>)) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select name="method" id="method" data-testid="method-input">
              <option
                value="cash"
              >
                Dinheiro
              </option>
              <option
                value="credit"
              >
                Cartão de crédito
              </option>
              <option
                value="debit"
              >
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria
            <select name="category" id="category" data-testid="tag-input">
              <option
                value="alimentação"
              >
                Alimentação
              </option>
              <option
                value="lazer"
              >
                Lazer
              </option>
              <option
                value="trabalho"
              >
                Trabalho
              </option>
              <option
                value="transporte"
              >
                Transporte
              </option>
              <option
                value="saude"
              >
                Saúde
              </option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input id="description-input" data-testid="description-input" />
          </label>
        </main>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
