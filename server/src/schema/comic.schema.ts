import z from "zod";
import _ from "lodash";

const payload = {
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    type: z.string({ required_error: "Type is required" }),
    status: z.string({ required_error: "Status is required" }),
    synopsis_id: z.string({ required_error: "Eng Synopsis is required" }),
    synopsis_en: z.string({ required_error: "Id Synopsis is required" }),
    description: z.string({ required_error: "Description is required" }),
    thumbnail: z.string({ required_error: "Thumbnail is required" }),
    tags: z.array(z.string()),
    sources: z
      .array(
        z
          .object({
            name: z.string(),
            type: z.string(),
            url: z.string().optional(),
            rating: z.string().optional(),
            lang: z.array(z.string()).optional(),
          })
          .passthrough()
      )
      .optional(),
  }),
};

const payloadUpdate = {
  body: payload.body.omit({ sources: true }),
};

const params = {
  params: z.object({
    comicId: z.string({
      required_error: "Comic Id is required",
    }),
  }),
};

const payloadComicSource = {
  body: z
    .object({
      name: z.string({ required_error: "Source name is required" }),
      type: z.string({ required_error: "Source type is required" }),
      url: z.string().optional(),
      rating: z.string().optional(),
      lang: z.array(z.string()),
    })
    .passthrough(),
};

const paramsComicSources = {
  params: params.params.extend({
    sourceId: z.string({
      required_error: "Source Id is required",
    }),
  }),
};

export const createComicSchema = z.object({ ...payload });

export const updateComicSchema = z.object({ ...payloadUpdate, ...params });

export const deleteComicSchema = z.object({ ...params });

export const getComicSchema = z.object({ ...params });

export const updateComicSourceSchema = z.object({
  ...paramsComicSources,
  ...payloadComicSource,
});

export const deleteComicSourceSchema = z.object({
  ...paramsComicSources,
});

export const createComicSourceSchema = z.object({
  ...params,
  ...payloadComicSource,
});

export type CreateComicInput = z.TypeOf<typeof createComicSchema>;
export type UpdateComicInput = z.TypeOf<typeof updateComicSchema>;
export type ReadComicInput = z.TypeOf<typeof getComicSchema>;
export type DeleteComic = z.TypeOf<typeof deleteComicSchema>;

export type UpdateComicSourceInput = z.TypeOf<typeof updateComicSourceSchema>;
export type CreateComicSourceInput = z.TypeOf<typeof createComicSourceSchema>;
export type DeleteComicSourceInput = z.TypeOf<typeof deleteComicSourceSchema>;
