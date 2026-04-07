import * as z from "zod";

const watchListStatusValidator = z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
    error: () => ({
        message: "Status must be PLANNED, WATCHING, COMPLETED, DROPPED",
    }),
});

const ratingValidator = z.coerce
    .number()
    .int("Rating must be integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10");

export const addToWatchListValidator = z.object({
    movieId: z.uuid("movieId must be a valid UUID"),
    status: watchListStatusValidator.optional(),
    rating: ratingValidator.optional(),
    notes: z.string().optional(),
});

export const watchListParamsValidator = z.object({
    id: z.uuid("id must be a valid UUID"),
});

export const updateWatchListValidator = z.object({
    status: watchListStatusValidator.optional(),
    rating: ratingValidator.optional(),
    notes: z.string().optional(),
}).refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field is required to update the watchlist item",
});
