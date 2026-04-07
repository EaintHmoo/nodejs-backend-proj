import { prisma } from "../config/db.js";
import { AppError } from "../utils/appError.js";

const addToWatchList = async (req, res, next) => {
    try {
        const { movieId, status, rating, notes } = req.body;
        
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return next(new AppError("Movie not found", 404));
        }

        const existingWatchList = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },
        });

        if (existingWatchList) {
            return next(new AppError("Movie already exists in the watchlist", 403));
        }

        const watchListItem = await prisma.watchlistItem.create({
            data: {
                userId: req.user.id,
                movieId,
                status,
                rating,
                notes,
            },
        });

        res.status(200).json({
            status: "success",
            data: {
                watchListItem,
            },
        });
    } catch (err) {
        next(err);
    }
};

const updateWatchList = async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const { status, rating, notes } = req.body;

        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return next(new AppError("Movie not found", 404));
        }

        const existingWatchList = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },
        });

        if (!existingWatchList) {
            return next(new AppError("Movie is not in the watchlist", 404));
        }

        const watchListItem = await prisma.watchlistItem.update({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },
            data: {
                status,
                rating,
                notes,
            },
        });

        res.status(200).json({
            status: "success",
            data: {
                watchListItem,
            },
        });
    } catch (err) {
        next(err);
    }
};

const removeFromWatchList = async (req, res, next) => {
    try {
        const movieId = req.params.id; 
        
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return next(new AppError("Movie not found", 404));
        }

        const existingWatchList = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },
        });

        if (!existingWatchList) {
            return next(new AppError("Movie is not in the watchlist", 404));
        }

        await prisma.watchlistItem.delete({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId,
                },
            },
        });

        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        next(err);
    }
};

export { addToWatchList, removeFromWatchList, updateWatchList };
