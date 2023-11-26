import React, { useState } from 'react';
import IExpenseItem from '../models/expense';

interface ExpenseFormProps {
  initialExpense: IExpenseItem;
  onSubmit: (updatedExpense: IExpenseItem) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialExpense,
  onSubmit,
}) => {
  const [expense, setExpense] = useState<IExpenseItem>(initialExpense);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(expense);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary">
      <input
        type="text"
        name="name"
        value={expense.expenseDescription}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        value={expense.price}
        onChange={handleInputChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export { ExpenseForm };
