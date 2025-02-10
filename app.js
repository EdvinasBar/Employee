const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let employees = [];
let idCounter = 1;

// Create an employee
app.post('/employees', (req, res) => {
    const { firstName, lastName, position } = req.body;
    if (!firstName || !lastName || !position) {
        return res.status(400).json({ error: 'First name, last name, and position are required' });
    }
    const newEmployee = { id: idCounter++, firstName, lastName, position };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Read all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Read a single employee by ID
app.get('/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    const { firstName, lastName, position } = req.body;
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (position) employee.position = position;
    res.json(employee);
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const employeeIndex = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (employeeIndex === -1) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    employees.splice(employeeIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
