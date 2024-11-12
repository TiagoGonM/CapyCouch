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

export const getGroupsByUser: RequestHandler = async (req, res) => {
  const { uid: id } = req.body;

  const [groups, total] = await Promise.all([
    prisma.group.findMany({
      where: { OR: [{ users: { some: { id } } }, { ownedBy: { id } }] },
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
  let {
    groupName: name,
    uid: id,
    users,
    genres,
    minAge,
    maxAge,
    likes,
    dislikes,
    image,
  } = req.body;

  const group = await prisma.group.create({
    data: {
      ownedBy: {
        connect: { id },
      },
      name,
      minAge,
      maxAge,
      genres,
      image,
      likes,
      dislikes,
      users: {
        connect: (users as string[]).map((id) => ({ id })),
      },
    },
  });

  return res.json({ group });
};

// FIXME: Fix these for editing users
export const updateGroup: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { users, minAge, maxAge, name, genres, likes, dislikes, image } = req.body;

  const group = await prisma.group.update({
    where: { id },
    data: {
      name,
      minAge,
      maxAge,
      image,
      genres,
      likes,
      dislikes,
      users: {
        connect: (users as string[])?.map((id) => ({ id })),
      },
    },
  });

  return res.json({ group });
};

export const deleteGroup: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.group.delete({ where: { id } });

  res.json(user);
};
