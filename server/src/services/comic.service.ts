import mongoose from "mongoose";
import ComicModel, {
  ComicDocument,
  IComicInput,
  ILinkSource,
} from "../models/comic.model";
import logger from "../utils/logger.utils";

export async function createComicService(input: Omit<IComicInput, "comicId">) {
  try {
    return await ComicModel.create(input);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
}

export async function findComicService(
  query: mongoose.FilterQuery<ComicDocument>,
  opts: mongoose.QueryOptions = { lean: true }
) {
  try {
    return await ComicModel.find(query, {}, opts);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
}

export async function findOneComicService(
  query: mongoose.FilterQuery<ComicDocument>,
  opts: mongoose.QueryOptions = {}
) {
  try {
    return await ComicModel.findOne(query, {}, opts);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
}

export async function findAndUpdateComicService(
  query: mongoose.FilterQuery<ComicDocument>,
  update: Omit<IComicInput, "comicId">,
  options: mongoose.QueryOptions = {}
) {
  try {
    return await ComicModel.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
}

export async function deleteComicService(
  query: mongoose.FilterQuery<ComicDocument>
) {
  try {
    return await ComicModel.deleteOne(query);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
}

export async function findAndUpdateComicSourceService(
  query: mongoose.FilterQuery<ComicDocument>,
  update: mongoose.UpdateQuery<Omit<ILinkSource, "comicId">>,
  options: mongoose.QueryOptions = {}
) {
  try {
    return await ComicModel.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
}
