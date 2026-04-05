import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
    const {  movieId, status, rating, notes} = req.body;
    
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if(!movie)
    {
        return res.status(404).json({
            error: "Movie not found"
        });
    }

    const existingWatchList = await prisma.watchlistItem.findUnique({
        where: { userId_movieId: {
            userId: req.user.id,
            movieId, movieId
        }},
    });

    if(existingWatchList)
    {
        return res.status(400).json({
            error: "Movie in the watchlist already exist"
        });
    }

    const watchListItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId: movieId,
            status: status,
            rating: rating,
            notes: notes,
        },
    });

    res.status(200).json({
        status: 'success',
        data: {
            watchListItem
        }
    })
}

const updateWatchList = async (req, res) => {
    const movieId  = req.params.id;
    const {  status, rating, notes} = req.body;

    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if(!movie)
    {
        return res.status(404).json({
            error: "Movie not found"
        });
    }

    const existingWatchList = await prisma.watchlistItem.findUnique({
        where: { userId_movieId: {
            userId: req.user.id,
            movieId, movieId
        }},
    });

    if(!existingWatchList)
    {
        return res.status(400).json({
            error: "No Movie with this name in the watchlist"
        });
    }

    const watchListItem = await prisma.watchlistItem.update({
        where: { userId_movieId: {
            userId: req.user.id,
            movieId, movieId
        }},
        data: {
            status: status,
            rating: rating,
            notes: notes,
        },
    });

    res.status(200).json({
        status: 'success',
        data: {
            watchListItem
        }
    })
}

const removeFromWatchList = async (req, res) => {
    const movieId  = req.params.id; 
    
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if(!movie)
    {
        return res.status(404).json({
            error: "Movie not found"
        });
    }

    await prisma.watchlistItem.delete({
        where: { userId_movieId: {
            userId: req.user.id,
            movieId, movieId
        }},
    });

    res.status(200).json({
        status: 'success',
    })
}

export {addToWatchList, removeFromWatchList, updateWatchList};