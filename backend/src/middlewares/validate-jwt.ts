import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';

export const validateJWT: RequestHandler = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_KEY as string) as { uid: string, name: string } ;

    req.body.uid = uid;
    req.body.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};