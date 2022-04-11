import { Request, Response } from "express";
export default function handler(req: Request, res: Response) {
  return res.status(200).send(`200 from the dunegon ${req.query.name}!`);
}
