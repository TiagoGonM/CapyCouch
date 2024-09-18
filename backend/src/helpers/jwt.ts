import jwt from "jsonwebtoken";

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
