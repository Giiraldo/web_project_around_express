import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Registramos el error en el servidor para poder depurarlo
  console.error(err);

  let { statusCode = 500 } = err;

  // Los errores de validación y de casteo de Mongoose son culpa del cliente (400)
  if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
  }

  // Ocultamos el mensaje real de los errores 500 por seguridad
  const message =
    statusCode === 500 ? "Ha ocurrido un error en el servidor" : err.message;

  res.status(statusCode).send({ message });
};
