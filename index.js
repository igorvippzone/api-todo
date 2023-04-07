const express = require("express");
const formData = require("express-form-data");
const { Todo } = require("./models");

const api = "/api/todo/";

const store = {
  todo: [],
};

[1, 2, 3].map((el) => {
  const newTodo = new Todo(`title ${el}`, `desc ${el}`);
  store.todo.push(newTodo);
});

const app = express();

app.use(formData.parse());

app.get(api, (req, res) => {
  const { todo } = store;
  res.json(todo);
});

app.get(`${api}:id`, (req, res) => {
  const { todo } = store;
  const { id } = req.params;

  const idx = todo.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(todo[idx]);
  } else {
    res.status(404);
    res.json("todo not found");
  }
});

app.post(api, (req, res) => {
  const { todo } = store;
  const { title, desc } = req.body;

  const newTodo = new Todo(title, desc);
  todo.push(newTodo);

  res.status(201);
  res.json(newTodo);
});

app.put(`${api}:id`, (req, res) => {
  const { todo } = store;
  const { title, desc } = req.body;
  const { id } = req.params;
  const idx = todo.findIndex((el) => el.id === id);

  if (idx !== -1) {
    todo[idx] = {
      ...todo[idx],
      title,
      desc,
    };
    res.json(todo[idx]);
  } else {
    res.status(404);
    res.json("todo | not found");
  }
});

app.delete(`${api}:id`, (req, res) => {
  const { todo } = store;
  const { id } = req.params;
  const idx = todo.findIndex((el) => el.id === id);

  if (idx !== -1) {
    todo.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);

    res.json("todo | not found");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}/`);
});
