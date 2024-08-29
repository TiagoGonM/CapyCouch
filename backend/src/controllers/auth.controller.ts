import { RequestHandler } from "express";
// import prisma from "../db/prisma";
import bcrypt from "bcryptjs";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify if email exists
    // const user = await prisma.user.findFirst({ email: email });
    const user = {status: true, password: "asdsa"};

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no son correctos - email",
      });
    }

    // Verify if user still active (status: true)
    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no son correctos - status: false",
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no son correctos - password",
      });
    }

    // Generate JWT
    // const token = await generateJWT(user.id);

    // res.json({
    //   user,
    //   token,
    // });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};
