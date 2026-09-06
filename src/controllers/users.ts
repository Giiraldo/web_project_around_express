import type { RequestHandler } from "express";
import User from "../models/user.js";

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

const infoUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user!._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const updateAvatar: RequestHandler = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user!._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  infoUser,
  updateProfile,
  updateAvatar,
};
