import { RequestHandler } from "express";

export const getUsers: RequestHandler = (req, res) => {
    res.json("Hello world!");
};