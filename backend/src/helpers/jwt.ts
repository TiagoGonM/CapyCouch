import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";

export const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_KEY || "default",
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el token");
        }
        console.log(token);
        console.log(typeof token);

        resolve(token);
      }
    );
  });
};

export const checkJWT = async (token: any) => {
  try {
    if (token.length < 10) {
      return null;
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY as string);

    console.log(payload);
    // const user = await prisma.user.findUnique({where: {id: jw.}});

    // if (user) {
    //   if (!user.status) {
    //     return null;
    //   }
    //   return user;
    // }
    return null;
  } catch (err) {
    console.log("Error");

    return null;
  }
};
