

import axios from "axios";
import IExpenseItem from '../models/expense';

const getAllExpenseItems = async () => {

  const response = await axios.get("http://localhost:4000/expenses")

  return response.data;
}

const createNewExpenseItem = async (expense: IExpenseItem) => {
  const response = await axios.post("http://localhost:4000/expenses", expense);
  return response.data;
}

const updateExpenseItem = async (updatedExpense: IExpenseItem) => {
  const response = await axios.put(`http://localhost:4000/expenses/${updatedExpense.id}`, updatedExpense);
  return response.data;
}

const deleteExpenseItem = async (expenseId: number) => {
  const response = await axios.delete(`http://localhost:4000/expenses/${expenseId}`);
  return response.data;
}

export {getAllExpenseItems, createNewExpenseItem, updateExpenseItem, deleteExpenseItem};
