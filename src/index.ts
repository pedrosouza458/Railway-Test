import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/clients", async (req, res) => {
  const todos = await prisma.clients.findMany();

  res.json(todos);
});

app.post("/clients", async (req, res) => {
  const { name, email, password } = req.body
  const todo = await prisma.clients.create({
    data: {
      name,
      email,
      password
    },
  });

  return res.json(todo);
});

app.get("/clients/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.clients.findUnique({
    where: { id },
  });

  return res.json(todo);
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /todos
    GET, PUT, DELETE /todos/:id
  </pre>
  `.trim(),
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
