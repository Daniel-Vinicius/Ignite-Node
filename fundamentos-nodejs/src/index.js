const express = require('express');

const app = express();

app.use(express.json())

app.get('/courses', (request, response) => {
  const query = request.query;
  console.log(query)
  return response.json(["Curso 1", "Curso 2"])
});

app.post('/courses', (request, response) => {
  const body = request.body;
  console.log(body)
  return response.json(["Curso 1", "Curso 2", "Curso 3"])
});

app.put('/courses/:id', (request, response) => {
  const params = request.params;
  console.log(params);
  return response.json(["Curso 1", "Curso 2", "Curso 3 Modificado PUT"])
});

app.patch('/courses/:id', (request, response) => {
  return response.json(["Curso 1", "Curso 2", "Curso 3 Modificado PATCH"])
});

app.delete('/courses/:id', (request, response) => {
  return response.json(["Curso 2", "Curso 3 Modificado PATCH"])
});

app.listen(3333);
