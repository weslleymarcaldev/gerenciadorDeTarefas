const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Rota para listar tarefas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Rota para adicionar uma tarefa
app.post("/tasks", (req, res) => {
  const task = { id: Date.now(), text: req.body.text, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// Rota para atualizar uma tarefa
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.done = req.body.done;
    res.json(task);
  } else {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
});

// Rota para deletar uma tarefa
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id, 10));
  res.status(204).end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor em execução em http://localhost:${PORT}`);
});

