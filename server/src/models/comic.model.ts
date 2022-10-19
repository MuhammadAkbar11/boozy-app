import mongoose from "mongoose";
import * as nanoid from "nanoid";

const setNanoId = nanoid.customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  10
);

export interface ILinkSource {
  website: string;
  url: string;
  rating: string;
  lang: string;
}

export interface IComicInput {
  comicId: string;
  title: string;
  type: string;
  status: string;
  synopsis: {
    en: string;
    id: string;
  };
  sources: Array<ILinkSource>;
  description: string;
  thumbnail: string;
}

export interface ComicDocument extends IComicInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const comicSchema = new mongoose.Schema(
  {
    comicId: {
      type: String,
      required: true,
      unique: true,
      default: () => `COMIC_${setNanoId(10)}`,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    synopsis: {
      en: {
        type: String,
        required: true,
      },
      id: String,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    sources: [
      {
        website: String,
        url: String,
        rating: String,
        lang: String,
      },
    ],
    description: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const ComicModel = mongoose.model<ComicDocument>(
  "Comic",
  comicSchema,
  "comics"
);

export default ComicModel;
