import express from 'express';
import movieRouter from './routers/movieRoutes.js';
import authRouter from './routers/authRoutes.js';
import watchlistRouter from './routers/watchListRoutes.js';
import dotenv from 'dotenv';
import { connectDB, disConnectDB } from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();


dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/movies',movieRouter);
app.use('/auth',authRouter);
app.use('/watchlist',watchlistRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = 5001;

const server = app.listen(PORT, ()=>{
    console.log(`Server running in port ${PORT}`)
})


process.on("unhandledRejection", (err)=>{
    console.error("Unhandled Rjection",err);
    server.close(async()=>{
        await disConnectDB();
        process.exit(1);
    })
});


process.on("uncaughtException", async (err)=>{
    console.error("Uncaught Exception",err);
    await disConnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async ()=>{
    console.error("SIGTERM received, shutting down gracefully");
    server.close(async()=>{
        await disConnectDB();
        process.exit(1);
    })
});
