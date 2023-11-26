import React, { useState, useEffect } from 'react';
import {
  getAllExpenseItems,
  createNewExpenseItem,
  updateExpenseItem,
  deleteExpenseItem,
} from '../services/expense-service';
import { ExpenseItemsLister } from './ExpenseItemsLister';
import { Container, Row, Col } from 'react-bootstrap';
import IExpenseItem from '../models/expense';
import { ExpensesByPayees } from './ExpensesByPayees';
import { PendingExpensesByPayees } from './PendingExpensesByPayees';
import { ExpenseCreator } from './ExpenseCreator';
import { ExpenseForm } from './ExpenseForm';
import backgroundImage from './finexp.jpg';

const ExpenseTrackerHome = () => {
  const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);
  const [editingExpense, setEditingExpense] = useState<IExpenseItem | null>(
    null,
  );

  const handleNewExpense = async (expense: IExpenseItem) => {
    const newExpense = await createNewExpenseItem(expense);
    setExpenseItems((prevExpenses) => [...prevExpenses, newExpense]);
    const response = await getAllExpenseItems();
    setExpenseItems(response);
  };

  const handleEditExpense = (expense: IExpenseItem) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (updatedExpense: IExpenseItem) => {
    const updatedExpenseFromServer = await updateExpenseItem(updatedExpense);
    setExpenseItems((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpenseFromServer.id
          ? updatedExpenseFromServer
          : expense,
      ),
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (expenseId: number) => {
    await deleteExpenseItem(expenseId);
    setExpenseItems((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId),
    );
  };

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenseItems));
  }, [expenseItems]);

  useEffect(() => {
    const getAllExpenseItemsInvoker = async () => {
      const response = await getAllExpenseItems();
      setExpenseItems(response);
    };

    getAllExpenseItemsInvoker();
  }, []);

  return (
    <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2 className="text-center mt-4 mb-4">Expense Application</h2>
        </Col>
      </Row>

      {editingExpense ? (
        <ExpenseForm
          initialExpense={editingExpense}
          onSubmit={handleUpdateExpense}
        />
      ) : (
        <>
          <ExpenseCreator
            onNewExpense={handleNewExpense}
            expenseItems={expenseItems}
          />
          <ExpenseItemsLister
            expenseItems={expenseItems}
            handleUpdateExpense={handleEditExpense}
            handleDeleteExpense={handleDeleteExpense}
          />
        </>
      )}

      <Row>
        <Col>
          <ExpensesByPayees expenseItems={expenseItems}></ExpensesByPayees>
        </Col>
        <Col>
          <PendingExpensesByPayees
            expenseItems={expenseItems}
          ></PendingExpensesByPayees>
        </Col>
      </Row>
    </Container>
  );
};

export { ExpenseTrackerHome };
