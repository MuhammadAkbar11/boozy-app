import z from "zod";

const payload = {
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    type: z.string({ required_error: "Type is required" }),
    status: z.string({ required_error: "Status is required" }),
    synopsis_id: z.string({ required_error: "Eng Synopsis is required" }),
    synopsis_en: z.string({ required_error: "Id Synopsis is required" }),
    description: z.string({ required_error: "Description is required" }),
    thumbnail: z.string({ required_error: "Thumbnail is required" }),
    sources: z.array(
      z.object({
        website: z.string(),
        url: z.string(),
        rating: z.string(),
        lang: z.string(),
      })
    ),
  }),
};

const params = {
  params: z.object({
    comicId: z.string({
      required_error: "Comic Id is required",
    }),
  }),
};

export const createComicSchema = z.object({ ...payload });

export const updateComicSchema = z.object({ ...payload, ...params });

export const deleteComicSchema = z.object({ ...params });

export const getComicSchema = z.object({ ...params });

export type CreateComicInput = z.TypeOf<typeof createComicSchema>;
export type UpdateComicInput = z.TypeOf<typeof updateComicSchema>;
export type ReadComicInput = z.TypeOf<typeof getComicSchema>;
export type DeleteComic = z.TypeOf<typeof deleteComicSchema>;
