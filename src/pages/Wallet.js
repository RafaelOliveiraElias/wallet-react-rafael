import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses as expensesAction } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      ask: 0,
    };
  }

  componentDidMount() {
    // requisicao da api
    // console.log('PROPS', this.props);
    const { getCurrencies, expensesState } = this.props;
    getCurrencies();
    if (expensesState.length !== 0) {
      let valor = 0;
      expensesState.forEach(({ value }) => {
        valor += Number(value);
      });
      this.setState({
        ask: Number(valor),
      });
    }
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
    const { value, description, currency, method, tag, ask } = this.state;
    const { expenses, expensesState, data, getCurrencies } = this.props;

    await getCurrencies();
    const med = Number(data[currency].ask);
    const newValor = Number(value) * med;
    await expenses({
      id: expensesState.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    });

    let valor = 0;
    expensesState.forEach((each) => {
      valor += each.value;
    });
    valor = ask + newValor;
    this.setState({
      ask: Math.floor(valor * 100) / 100,
    });

    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { email, currencies } = this.props;
    const { ask, value } = this.state;
    return (
      <div>
        <header>
          <h2>
            Usuário:
            <span data-testid="email-field">{email}</span>
          </h2>
          <p>
            Total:
            <span data-testid="total-field">{ ask }</span>
          </p>
          <p>
            Câmbio:
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <main>
          <label htmlFor="value-input">
            Valor:
            <input
              name="value"
              type="text"
              id="value-input"
              data-testid="value-input"
              value={ value }
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
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  expenses: (e) => dispatch(expensesAction(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
