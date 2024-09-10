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
  let { users, minAge, maxAge, name, likes, dislikes, image } = req.body;

  users = users.split(",");

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

export const updateGroup: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { users, minAge, maxAge, name, likes, dislikes, image } = req.body;

  const group = await prisma.group.update({
    where: { id },
    data: {
      name,
      minAge,
      maxAge,
      image,
      likes,
      dislikes,
      users: {
        update: users,
      },
    },
  });

  return res.json({ group });
}

export const deleteGroup: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.group.delete({ where: { id } });

  res.json(user);
};