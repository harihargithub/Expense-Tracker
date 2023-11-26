import { Table } from 'react-bootstrap';
import IExpenseItem from '../models/expense';

type ExpenseItemsListerModel = {
  expenseItems: IExpenseItem[];
  handleUpdateExpense: (updatedExpense: IExpenseItem) => void;
  handleDeleteExpense: (expenseId: number) => void;
};

const ExpenseItemsLister = ({
  expenseItems,
  handleUpdateExpense,
  handleDeleteExpense,
}: ExpenseItemsListerModel) => {
  const formatDate = (dateObjFromServer: Date) => {
    const dateObj = new Date(dateObjFromServer);

    return (
      dateObj.getDate() +
      '-' +
      (dateObj.getMonth() + 1) +
      '-' +
      dateObj.getFullYear()
    );
  };

  return (
    <div>
      <Table striped bordered hover className="table-warning">
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Description</th>
            <th>Payee Name</th>
            <th>Expense Date</th>
            <th>Price</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseItems.map((expenseItem, index) => {
            return (
              <tr key={expenseItem.id}>
                <td>{index + 1}</td>
                <td>{expenseItem.expenseDescription}</td>
                <td>{expenseItem.payeeName}</td>
                <td>{formatDate(expenseItem.date)}</td>
                <td>{expenseItem.price}</td>
                <td className="text-center">
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateExpense(expenseItem)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this expense?',
                        )
                      ) {
                        handleDeleteExpense(expenseItem.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export { ExpenseItemsLister };
