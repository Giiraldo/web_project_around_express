import express from "express";
import fs from "node:fs/promises";
import path from "node:path";

const usersPath = path.join(import.meta.dirname, "../data/users.json");
const cardsPath = path.join(import.meta.dirname, "../data/cards.json");

const app = express();

app.get("/users", async (req, res) => {
  const data = await fs.readFile(usersPath, "utf8");
  res.status(200).send(JSON.parse(data));
});

app.get("/users/:id", async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, "utf8");
    const users = JSON.parse(data);
    const user = users.find((u: { _id: string }) => u._id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: "ID de usuario no encontrado" });
    }
    res.status(200).send(user);
  } catch {
    res.status(500).send({ message: "An error has occurred on the server" });
  }
});

app.get("/cards", async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, "utf8");
    res.status(200).send(JSON.parse(data));
  } catch {
    res.status(500).send({ message: "An error has occurred on the server" });
  }
});

app.get("/cards/:id", async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, "utf8");
    const cards = JSON.parse(data);
    const card = cards.find((c: { _id: string }) => c._id === req.params.id);
    if (!card) {
      return res.status(404).send({ message: "ID de tarjeta no encontrado" });
    }
    res.status(200).send(card);
  } catch {
    res.status(500).send({ message: "An error has occurred on the server" });
  }
});

app.use("", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

const port = 3000;
app.listen(port, () => {});
