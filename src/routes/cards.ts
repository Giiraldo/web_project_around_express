import { Router } from "express";
import {
  getCardById,
  getCards,
  postCard,
  deleteCard,
} from "../controllers/cards.js";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.get("/:id", getCardById);
cardsRouter.post("/", postCard);
cardsRouter.delete("/:id", deleteCard);

export { cardsRouter };
