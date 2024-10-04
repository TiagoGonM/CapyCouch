import { RequestHandler } from "express";
import prisma from "../db/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const getUsers: RequestHandler = async (req, res) => {
  const [users, total] = await Promise.all([
    prisma.user.findMany(), // SELECT * FROM users
    prisma.user.count({ where: { status: true } }), // SELECT COUNT * FROM users WHERE status = true
  ]);

  return res.json({ total, users });
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = (await prisma.user.findUnique({
    where: { id, status: true },
  })) as User;

  if (!user)
    return res.json({ message: "Usuario no encontrado" });

  const { password, ...rest } = user;

  return res.json(rest);
};

export const createUser: RequestHandler = async (req, res) => {
  const { username, email, password, age, image, role } = req.body as User;

  const userFound = await prisma.user.findUnique({ where: { email } });

  if (userFound)
    return (
      userFound && res.status(400).json({ message: "User already exists" })
    );

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      age,
      image,
      role,
    },
  });

  const { password: _, ...user } = newUser;

  return res.json({ user });
};

export const updateUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const {
    username,
    email,
    createdAt,
    status,
    id: mongoId,
    ...rest
  } = req.body as User;

  if (rest.password) {
    rest.password = bcrypt.hashSync(rest.password, 10);
  }

  const user = (await prisma.user.update({
    where: { id },
    data: rest,
  })) as User;

  return res.json(user);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = (await prisma.user.update({
    where: { id },
    data: { status: false },
  })) as User;

  return res.json(user);
};
