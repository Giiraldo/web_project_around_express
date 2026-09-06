import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  infoUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users.js";

import { likeCard, dislikeCard } from "../controllers/cards.js";
import { cardsRouter } from "./cards.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.post("/", createUser);
usersRouter.get("/me", infoUser);
usersRouter.get("/:id", getUserById);
usersRouter.patch("/me", updateProfile);
usersRouter.patch("/me/avatar", updateAvatar);
cardsRouter.put("/:id/likes", likeCard);
cardsRouter.delete("/:id/likes", dislikeCard);

export { usersRouter };
