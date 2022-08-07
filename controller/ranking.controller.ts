import { Request, Response } from "express";

const registerResult = (req: Request, res: Response) => {
  res.json({ ok: true });
};

export { registerResult };
