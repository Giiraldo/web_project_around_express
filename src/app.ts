import express from "express";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(router);

app.use("", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

const port = 3000;
app.listen(port, () => {});
