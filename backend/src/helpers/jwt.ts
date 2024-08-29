import jwt from "jsonwebtoken";
import prisma from "../db/prisma";

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
      const payload = { uid };
  
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
          } else {
            console.log(token);
            console.log(typeof token);
            
            resolve(token);
          }
        }
      );
    });
  };
  
export const checkJWT = async (token: string) => {
    try {
      if (token.length < 10) {
        return null;
      }
  
      const jw = jwt.verify(token, process.env.SECRET_KEY as string);
      console.log(jw);
      
    //   const user = await prisma.user.findById(uid);
      
    //   if (user) {
    //     if (!user.status) {
    //       return null;
    //     }
    //     return user;
    //   }
      return null;
    } catch (err) {
      return null;
    }
  };
  