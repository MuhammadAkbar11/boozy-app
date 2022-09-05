import { Request, Response } from "express";
// import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUserService, findUserService } from "../services/user.service";
import BaseError from "../utils/error.utils";
import logger from "../utils/logger.utils";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const existEmail = await findUserService({
      email: req.body.email,
    });

    if (existEmail) {
      throw new BaseError(
        "AUTH",
        409,
        "Email already registred, please login!"
      );
    }

    const user = await createUserService(req.body);

    return res.status(201).json({
      message: "Registration successfully",
      user: user,
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(error.statusCode || 409).json({
      message: error.message,
    });
  }
}
