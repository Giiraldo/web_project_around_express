import { Router } from "express";
import { getCardById, getCards } from "../controllers/cards.js";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.get("/:id", getCardById);

export { cardsRouter };
