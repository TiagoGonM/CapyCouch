import { RequestHandler } from "express";
import prisma from "../db/prisma";

export const getGroups: RequestHandler = async (req, res) => {
  const [groups, total] = await Promise.all([
    prisma.group.findMany({
      include: { _count: { select: { users: true } }, users: true },
    }),
    prisma.group.count(),
  ]);

  res.json({ total, groups });
};

export const getGroup: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const group = await prisma.group.findUnique({
    where: { id },
    include: { _count: { select: { users: true } }, users: true },
  });

  res.json({ group });
};

export const createGroup: RequestHandler = async (req, res) => {
  const { users, minAge, maxAge, name, likes, dislikes, image } = req.body;

  users.map((id: string) => {
    console.log({ id });
  });

  const group = await prisma.group.create({
    data: {
      name,
      minAge,
      maxAge,
      image,
      likes,
      dislikes,
      users: {
        connect: users.map((id: string) => ({ id })),
      },
    },
  });

  return res.json({ group });
};
