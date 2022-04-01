import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, deleteStuff } from './actions';

class Table extends React.Component {
  render() {
    const { expensesState, deleteExp } = this.props;
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
                <button
                  type="button"
                >
                  editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => {
                    deleteExp(each.id);
                  } }
                >
                  excluir

                </button>
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
  deleteExp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  data: state.wallet.data,
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  deleteExp: (e) => dispatch(deleteStuff(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
