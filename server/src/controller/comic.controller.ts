import { Request, Response } from "express";
import slug from "slug";
import { IComicInput } from "../models/comic.model";
import {
  CreateComicInput,
  DeleteComic,
  ReadComicInput,
  UpdateComicInput,
} from "../schema/comic.schema";
import {
  createComicService,
  deleteComicService,
  findAndUpdateComicService,
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
    genres,
  } = req.body;

  let comicSlug: string = slug(title);

  try {
    const existSlug = await findComicService({
      $or: [{ slug: { $regex: comicSlug, $options: "i" } }],
    });

    if (existSlug.length !== 0) {
      comicSlug = `${comicSlug}-${existSlug.length}`;
    }

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
      genres,
      slug: comicSlug,
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

export async function updateComicHandler(
  req: Request<UpdateComicInput["params"], {}, UpdateComicInput["body"]>,
  res: Response
) {
  const comicId = req.params.comicId;
  const {
    title,
    description,
    status,
    synopsis_en,
    synopsis_id,
    thumbnail,
    type,
    genres,
  } = req.body;

  try {
    const comic = await findOneComicService({ comicId });

    if (!comic) {
      return res.status(404).json({
        message: "Comic not found",
      });
    }

    let comicSlug: string = slug(title);

    const existSlug = await findComicService({
      $or: [{ slug: { $regex: comicSlug, $options: "i" } }],
    });

    if (existSlug.length !== 0) {
      const isCurrComic = existSlug.find(
        c => c.comicId.toString() === c.comicId.toString()
      );

      if (!isCurrComic) {
        comicSlug = `${comicSlug}-${existSlug.length}`;
      } else {
        logger.info("No changes for slug");
      }
    }

    const postUpdate: Omit<IComicInput, "comicId"> = {
      title,
      description,
      status,
      synopsis: {
        en: synopsis_en,
        id: synopsis_id,
      },
      thumbnail,
      type,
      genres,
      slug: comicSlug,
    };

    const updateComic = await findAndUpdateComicService(
      { comicId },
      postUpdate,
      { new: true }
    );

    return res.status(201).json({
      message: "Success update comic",
      comic: updateComic,
    });
  } catch (error: any) {
    logger.error(error);
    if (error.kind == "ObjectId") {
      return res.status(404).json({
        message: "Product not found",
      });
    }

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
        message: "Comic not found",
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
        message: "Comic not found",
      });
    }

    await deleteComicService({ comicId });

    return res.status(200).json({
      message: "Success delete Comic",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}
