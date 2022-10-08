import { get } from "lodash";
import { RequestHandler } from "express";
import config from "config";
import { verifyJwt } from "../utils/jwt.utils";
import logger from "../utils/logger.utils";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser: RequestHandler = async (req, res, next) => {
  try {
    const accessToken =
      get(req, "cookies.accessToken") ||
      get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    const refreshToken =
      get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

    if (!accessToken) {
      const { decoded: decodedRefresh } = verifyJwt(refreshToken);

      if (!decodedRefresh) {
        logger.info("Refresh token not found or expired!");
        return next();
      }

      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
        res.cookie("accessToken", newAccessToken, {
          maxAge: 900000, // 15 mins
          httpOnly: true,
          domain: config.get("domain"),
          path: "/",
          sameSite: "strict",
          secure: false,
        });
      }

      logger.info("No access found and generate new access token");
      const result = verifyJwt(newAccessToken || "");

      res.locals.user = result!.decoded;
      return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
        res.cookie("accessToken", newAccessToken, {
          maxAge: 900000, // 15 mins
          httpOnly: true,
          domain: config.get("domain"),
          path: "/",
          sameSite: "strict",
          secure: false,
        });
      }
      logger.info("Expired access token and generate new access token");
      const result = verifyJwt(newAccessToken || "");

      res.locals.user = result!.decoded;
      return next();
    }

    return next();
  } catch (error) {
    logger.error(error);
    next();
  }
};
export default deserializeUser;
