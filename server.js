import express, { json } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.nome,
      age: req.body.idade,
      email: req.body.email,
    },
  });
  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  let usuario = [];

  if (req.query) {
    usuario = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      },
    });
  } else {
    usuario = await prisma.user.findMany();
  }
  res.status(200).json(usuario);
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.nome,
      age: req.body.idade,
      email: req.body.email,
    },
  });
  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(201).json("Usuario deletado com sucesso:)");
});

app.listen(3000);
