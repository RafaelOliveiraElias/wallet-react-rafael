import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses as expensesAction, saveStuff } from '../actions';
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
    await expenses({
      id: expensesState.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    });

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  newClick = () => {
    const { expensesState, save, editIndex } = this.props;
    const data = expensesState[editIndex].exchangeRates;
    const next = { ...this.state, id: editIndex, exchangeRates: data };
    save(next);
  }

  render() {
    const { email, currencies, expensesState, editar } = this.props;
    const { value, currency, method, description, tag } = this.state;
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
                expensesState.reduce((accum, each) => {
                  const calculado = each.value * each.exchangeRates[each.currency].ask;
                  return calculado + accum;
                }, 0).toFixed(2)
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
              value={ value }
              data-testid="value-input"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              name="currency"
              id="currencies"
              value={ currency }
              onChange={ this.onInputChange }
              data-testid="currency-input"
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
              value={ method }
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
              value={ tag }
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
              value={ description }
              data-testid="description-input"
              onChange={ this.onInputChange }
            />
          </label>
          { editar
            ? (
              <button
                type="button"
                onClick={ this.newClick }
              >
                Editar despesa
              </button>)
            : (
              <button
                type="submit"
                value="Submit"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>)}
        </div>
        <Table />
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
  save: PropTypes.func.isRequired,
  editar: PropTypes.bool.isRequired,
  editIndex: PropTypes.number.isRequired,
  data: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  data: state.wallet.data,
  expensesState: state.wallet.expenses,
  editar: state.wallet.editStage,
  editIndex: state.wallet.editIndex,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  expenses: (e) => dispatch(expensesAction(e)),
  save: (e) => dispatch(saveStuff(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
