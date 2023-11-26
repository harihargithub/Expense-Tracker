import IExpenseItem from "../models/expense";

const getAllPayeeNames = (expenseItems : IExpenseItem[]) : string[] => {
  const uniquePayeeNames : string[] = [];
  expenseItems.forEach( (expenseItem) => {
    let payeeName = expenseItem.payeeName;
    if (!uniquePayeeNames.includes(payeeName)){
      uniquePayeeNames.push(payeeName);
    }
  })
  return uniquePayeeNames;
} 

const getTotalContributedAmount = (payeeName : string, expenseItems: IExpenseItem[]) => {
  let totalExpense = 0;
  expenseItems.forEach((expenseItem) => {
    if (expenseItem.payeeName === payeeName){
      totalExpense += Number(expenseItem.price); // Ensure the price is treated as a number
    }
  })
  return totalExpense;
}

const getGrandTotalExpenses = (expenseItems : IExpenseItem[]) => {
  let totalExpense = 0;
  expenseItems.forEach((expenseItem) => {
    totalExpense += Number(expenseItem.price); // Ensure the price is treated as a number
  })
  return totalExpense;   
}

export {getAllPayeeNames, getGrandTotalExpenses, getTotalContributedAmount}