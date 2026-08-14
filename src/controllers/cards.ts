import fs from "node:fs/promises";
import path from "node:path";
import type { RequestHandler } from "express";

const cardsPath = path.join(import.meta.dirname, "../../data/cards.json");

const getCards: RequestHandler = async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, "utf8");
    res.status(200).send(JSON.parse(data));
  } catch {
    res.status(500).send({ message: "An error has occurred on the server" });
  }
};

const getCardById: RequestHandler = async (req, res) => {
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
};

export { getCards, getCardById };
