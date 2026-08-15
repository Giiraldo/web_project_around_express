import type { Request, Response, NextFunction } from "express";

export function logError(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  console.error(err);
  _res.status(500).send("An error has ocurred on the server");
  next(err);
}
