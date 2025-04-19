const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Person = require('./Models/Person');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/PersonDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  

// GET /person - Show all persons
app.get('/person', async (req, res) => {
  const people = await Person.find();
  res.render('index', { people });
});

// POST /person - Show create form
app.get('/person/create', (req, res) => {
  res.render('create');
});

// Handle form submission to add person
app.post('/person', async (req, res) => {
  await Person.create(req.body);
  res.redirect('/person');
});

// PUT /person/:id - Show edit form
app.get('/person/edit/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('edit', { person });
});

// Handle update
app.put('/person/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/person');
});

// DELETE /person/:id - Show delete confirmation
app.get('/person/delete/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('delete', { person });
});

// Handle delete
app.delete('/person/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
