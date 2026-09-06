import type { RequestHandler } from "express";
import Card from "../models/card.js";

const getCards: RequestHandler = async (_req, res, next) => {
  try {
    const cards = await Card.find({});
    const userId = _req.user?._id;

    const cardsWithLikeInfo = cards.map((card) => ({
      ...card.toObject(),
      isliked: card.likes.some((id) => id.toString() === userId),
    }));

    res.status(200).send(cardsWithLikeInfo);
  } catch (err) {
    next(err);
  }
};

const getCardById: RequestHandler = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }
    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};

const postCard: RequestHandler = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({
      name,
      link,
      owner: req.user!._id,
    });
    res.status(201).send(newCard);
  } catch (err) {
    next(err);
  }
};

const deleteCard: RequestHandler = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }
    res.status(200).send({ message: "Tarjeta eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};

const likeCard: RequestHandler = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user!._id } },
      { new: true },
    );
    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }
    const userId = req.user?._id;
    res.send({
      ...card.toObject(),
      isliked: card.likes.some((id) => id.toString() === userId),
    });
  } catch (err) {
    next(err);
  }
};

const dislikeCard: RequestHandler = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user!._id } },
      { new: true },
    );
    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }
    const userId = req.user?._id;
    res.send({
      ...card.toObject(),
      isliked: card.likes.some((id) => id.toString() === userId),
    });
  } catch (err) {
    next(err);
  }
};

export { getCards, getCardById, postCard, deleteCard, likeCard, dislikeCard };
