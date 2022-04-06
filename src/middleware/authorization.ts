import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export const authorizationToken = (
  request: Request,
  respose: Response,
  next: NextFunction
) => {
  try {
    const bearerHead: string | undefined = request.headers.authorization;
    const token: string = bearerHead ? bearerHead.split(" ")[1] : "";

    const decodedUser: string | object = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    respose.locals.userData = decodedUser;
    next();
  } catch (err) {
    next(err);
  }
};
