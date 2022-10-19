import { Request, Response } from "express";
import {
  CreateComicInput,
  DeleteComic,
  ReadComicInput,
} from "../schema/comic.schema";
import {
  createComicService,
  deleteComicService,
  findComicService,
  findOneComicService,
} from "../services/comic.service";
import logger from "../utils/logger.utils";

export async function createComicHandler(
  req: Request<{}, {}, CreateComicInput["body"]>,
  res: Response
) {
  const {
    title,
    description,
    status,
    synopsis_en,
    synopsis_id,
    thumbnail,
    type,
    sources,
  } = req.body;

  try {
    const post = await createComicService({
      title,
      description,
      status,
      synopsis: {
        en: synopsis_en,
        id: synopsis_id,
      },
      sources: sources,
      thumbnail,
      type,
    });

    return res.status(200).json({
      message: "Success create a comic",
      comic: post,
    });
  } catch (error: any) {
    logger.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}

export async function getListComicsHandler(req: Request, res: Response) {
  try {
    const comics = await findComicService({});

    return res.status(200).json({
      message: "Success get list comics",
      comics: comics,
    });
  } catch (error: any) {
    logger.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}

export async function getComicHandler(
  req: Request<ReadComicInput["params"]>,
  res: Response
) {
  const comicId = req.params.comicId;

  try {
    const comic = await findOneComicService({ comicId });

    if (!comic) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Success get comic",
      comic: comic,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}

export async function deleteComicHandler(
  req: Request<DeleteComic["params"]>,
  res: Response
) {
  const comicId = req.params.comicId;

  try {
    const comic = await findOneComicService({ comicId });

    if (!comic) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await deleteComicService({ comicId });

    return res.status(200).json({
      message: "Success delete product",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}
