import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authorizationToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHead: string | undefined = req.headers.authorization;
    const token: string = authHead ? authHead.split(" ")[1] : "";

    const decoded: string | object = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    res.locals.userData = decoded;
    next();
  } catch (err: any) {
    err.code = 401;
    next(err);
  }
};
