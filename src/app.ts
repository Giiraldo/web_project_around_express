// ID usuario de prueba: 6a9cf771c21e0e815b0f9546

import express from "express";
import { router } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use((req, res, next) => {
  req.user = {
    _id: "6a9cf771c21e0e815b0f9546",
  };

  next();
});

app.use(router);

app.use((_req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {});
