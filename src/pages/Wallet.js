import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses as expensesAction } from '../actions';
import Table from '../Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    // requisicao da api
    // console.log('PROPS', this.props);
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { expenses, expensesState, data, getCurrencies } = this.props;

    await getCurrencies();
    const med = Number(data[currency].ask);
    const newValor = (Number(value) * med).toFixed(2);
    await expenses({
      id: expensesState.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
      valueConverted: newValor,
    });

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  getSum = (total, num) => Number(total) + Number(num)

  render() {
    const { email, currencies, expensesState } = this.props;
    return (
      <div>
        <header>
          <h2>
            Usuário:
            <span data-testid="email-field">{email}</span>
          </h2>
          <p>
            Total:
            <span data-testid="total-field">
              {
                expensesState.reduce((acc, { currency, value, exchangeRates }) => {
                  const calculado = value * exchangeRates[currency].ask;

                  return calculado + acc;
                }, 0)
              }

            </span>
          </p>
          <p>
            Câmbio:
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <div>
          <label htmlFor="value-input">
            Valor:
            <input
              name="value"
              type="text"
              id="value-input"
              data-testid="value-input"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              name="currency"
              id="currencies"
              onChange={ this.onInputChange }
            >
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
            <select
              name="method"
              id="method"
              value="method"
              data-testid="method-input"
              onChange={ this.onInputChange }
            >
              <option
                value="Dinheiro"
              >
                Dinheiro
              </option>
              <option
                value="Cartão de crédito"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
              >
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria
            <select
              name="tag"
              id="category"
              data-testid="tag-input"
              onChange={ this.onInputChange }
            >
              <option
                value="alimentação"
              >
                Alimentação
              </option>
              <option
                value="Lazer"
              >
                Lazer
              </option>
              <option
                value="Trabalho"
              >
                Trabalho
              </option>
              <option
                value="Transporte"
              >
                Transporte
              </option>
              <option
                value="Saúde"
              >
                Saúde
              </option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              name="description"
              data-testid="description-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            value="Submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
        <Table deleteFunc={ this.deleteFunc } />
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
  expensesState: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
  expenses: PropTypes.func.isRequired,
  data: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  data: state.wallet.data,
  expensesState: state.wallet.expenses,
  total: state.wallet.ask,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  expenses: (e) => dispatch(expensesAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
