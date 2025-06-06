import { RequestHandler } from "express";
import bcrypt from "bcryptjs";

import { generateJWT } from "../helpers/jwt";

import prisma from "../db/prisma";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(400).json({
        msg: "Credenciales inválidas",
      });
    }

    // Verify if user still active (status: true)
    if (!user.status) {
      return res.status(400).json({
        msg: "Credenciales inválidas",
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Credenciales inválidas",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.username);

    const { id, username, firstTime, age } = user;

    res.json({
      ok: true,
      id,
      username,
      email,
      token,
      firstTime,
      age,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Algo salió mal",
    });
  }
};

export const revalidateToken: RequestHandler = async (req, res) => {
  const { uid, username }: { uid: string; username: string } = req.body;

  const token = await generateJWT(uid, username);

  res.json({
    ok: true,
    token,
  });
};
