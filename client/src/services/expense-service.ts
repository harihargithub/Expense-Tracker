
import axios from 'axios';


const getAllExpenseItems = async () => { 
    const response = await axios.get('http://localhost:4000/expenses');
    return response.data;
}
 
export { getAllExpenseItems };

const createNewExpenseItem = async (expenseItem: any) => {
    const response = await axios.post('http://localhost:4000/expenses', expenseItem);
    return response.data;
}

export { createNewExpenseItem };