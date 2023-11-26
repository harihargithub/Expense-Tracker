import IExpenseItem from '../models/expense';
import {
  getGrandTotalExpenses,
  getTotalContributedAmount,
  getAllPayeeNames,
} from '../services/expense-utils';

import { Table } from 'react-bootstrap';

type PendingExpensesByPayeesModel = {
  expenseItems: IExpenseItem[];
};

const PendingExpensesByPayees = ({
  expenseItems,
}: PendingExpensesByPayeesModel) => {
  const grandTotal = getGrandTotalExpenses(expenseItems);
  const splitUpAmount = grandTotal / 3;

  const getPendingAmount = (payeeName: string) => {
    const totalContributionByPayee = getTotalContributedAmount(
      payeeName,
      expenseItems,
    );

    if (totalContributionByPayee >= splitUpAmount) {
      return 0;
    } else {
      return Math.round(splitUpAmount - totalContributionByPayee);
    }
  };

  const getExcessAmount = (payeeName: string) => {
    const totalContributionByPayee = getTotalContributedAmount(
      payeeName,
      expenseItems,
    );

    if (totalContributionByPayee > splitUpAmount) {
      return Math.round(totalContributionByPayee - splitUpAmount);
    } else {
      return 0;
    }
  };

  return (
    <div>
      <h3
        className="text-center text-primary"
        style={{ backgroundColor: 'orange' }}
      >
        Pending Amount - View
      </h3>

      <Table striped bordered hover className="table-warning">
        <thead>
          <tr>
            <th>#</th>
            <th>Payee Name</th>
            <th>Pending Amount</th>
            <th>Excess Amount</th>
          </tr>
        </thead>

        <tbody>
          {getAllPayeeNames(expenseItems).map((payeeName, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{payeeName}</td>
                <td>{getPendingAmount(payeeName)}</td>
                <td>{getExcessAmount(payeeName)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export { PendingExpensesByPayees };
