import fs from "node:fs/promises";
import path from "node:path";
import type { RequestHandler } from "express";

const usersPath = path.join(import.meta.dirname, "../../data/users.json");

const getUsers: RequestHandler = async (_req, res, next) => {
  try {
    const data = await fs.readFile(usersPath, "utf8");
    res.status(200).send(JSON.parse(data));
  } catch (err) {
    next(err);
  }
};

const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const data = await fs.readFile(usersPath, "utf8");
    const users = JSON.parse(data);
    const user = users.find((u: { _id: string }) => u._id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: "ID de usuario no encontrado" });
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export { getUsers, getUserById };
