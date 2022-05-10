import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import { fetchCurrencies, deleteStuff, editStuff } from './actions';

class TableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTr: '',
    };
  }

  render() {
    const { expensesState, deleteExp, edit } = this.props;
    const { selectedTr } = this.state;
    return (
      <Table className="table" bordered>
        <thead className="headtable">
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
          <tbody key={ each.id }>
            <tr className={ selectedTr === each.id ? 'selected' : null }>
              <td>{each.description}</td>
              <td>{each.tag}</td>
              <td>{each.method}</td>
              <td>
                {`${each.currency} ${Number(each.value).toFixed(2)}`}
              </td>
              <td>{each.exchangeRates[each.currency].name.split('/')[0]}</td>
              <td>{Number(each.exchangeRates[each.currency].ask).toFixed(2)}</td>
              <td>
                R$
                {' '}
                { (Number(each.value) * Number(each.exchangeRates[each.currency].ask))
                  .toFixed(2)}

              </td>
              <td>Real</td>
              <td className="btns">
                <Button
                  type="button"
                  data-testid="edit-btn"
                  color="success"
                  onClick={ () => {
                    edit(each.id);
                    this.setState({
                      selectedTr: selectedTr === each.id ? null : each.id,
                    });
                  } }
                >
                  editar
                </Button>
                <Button
                  color="danger"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => {
                    deleteExp(each.id);
                  } }
                >
                  excluir

                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    );
  }
}

TableComp.propTypes = {
  expensesState: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
  deleteExp: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
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
  edit: (e) => dispatch(editStuff(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);
