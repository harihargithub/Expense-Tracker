import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import IExpenseItem from '../../src/models/expense'; // Import the IExpenseItem type
// import expenses from '../../../server/expenses.json';
import { getAllPayeeNames } from '../services/expense-utils';

interface ExpenseCreatorProps {
  onNewExpense: (expense: IExpenseItem) => void;
  expenseItems: IExpenseItem[];
}

const ExpenseCreator: React.FC<ExpenseCreatorProps> = ({
  onNewExpense,
  expenseItems,
}) => {
  const payeeNameRef = React.useRef<HTMLSelectElement>(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<IExpenseItem>({
    expenseDescription: '',
    payeeName: '',
    price: 0,
    date: new Date(),
    expenseDate: '', // Add this line
    id: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedPayeeName = payeeNameRef.current?.value || ''; // provide a default value

    const { payeeName, ...restFormData } = formData; // remove payeeName from formData
    onNewExpense({
      ...restFormData,
      payeeName: selectedPayeeName,
      date: new Date(formData.expenseDate), // update with the date from the form
      id: Math.random(), // update with a random number
    });
    handleClose();
  };

  const createExpenseModalBody = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="expenseDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expense description"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="payeeName">
          <Form.Label>Payee Name</Form.Label>
          <Form.Select
            aria-label="Default select example"
            ref={payeeNameRef}
            onChange={handleSelectChange}
          >
            <option>SELECT A PAYEE</option>
            {getAllPayeeNames(expenseItems).map((payeeName, index) => {
              return (
                <option key={index} value={payeeName}>
                  {payeeName}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter expense price"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseDate">
          <Form.Label>Expense Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter expense date"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          New Expense
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Form>
    );
  };

  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="success" onClick={handleShow}>
            Add Expense Item
          </Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>{createExpenseModalBody()}</Modal.Body>
      </Modal>
    </div>
  );
};

export { ExpenseCreator };
