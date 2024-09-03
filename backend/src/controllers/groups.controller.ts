import { RequestHandler } from 'express';
import prisma from '../db/prisma';

export const getGroups: RequestHandler = async (req, res) => {
    const [groups, total] = await Promise.all([
        prisma.group.findMany(),
        prisma.group.count(),
    ]);

    res.json({total, groups});
};

export const getGroup: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const group = await prisma.group.findUnique({ where: { id } });

    res.json(group);
};