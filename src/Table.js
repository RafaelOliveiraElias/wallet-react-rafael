import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses as expensesAction } from './actions';

class Table extends React.Component {
  render() {
    const { expensesState } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expensesState.map((each) => (
          <thead key={ each.id }>
            <tr>
              <td>{each.description}</td>
              <td>{each.tag}</td>
              <td>{each.method}</td>
              <td>
                {Number(each.value).toFixed(2)}
              </td>
              <td>{each.exchangeRates[each.currency].name.split('/')[0]}</td>
              <td>{Number(each.exchangeRates[each.currency].ask).toFixed(2)}</td>
              <td>
                {
                  Number(each.value) * Number(each.exchangeRates[each.currency].ask)
                }

              </td>
              <td>Real</td>
              <td>
                <button type="button">editar</button>
                <button type="button">excluir</button>
              </td>
            </tr>
          </thead>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  expensesState: PropTypes.arrayOf(
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

export default connect(mapStateToProps, mapDispatchToProps)(Table);
