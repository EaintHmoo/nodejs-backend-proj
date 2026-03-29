import { prisma } from "../src/config/db.js";

const creatorId = "ad7151cb-302d-4c01-ab2a-4e2360199ede"

const movies = [
    {
        title: "Inception",
        overivew: "A skilled thief enters dreams to steal secrets and gets one last job that could change his life.",
        releaseYear: 2010,
        genres: ["Sci-Fi", "Action", "Thriller"],
        runtime: 148,
        posterUrl: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
        createdBy: creatorId,
    },
    {
        title: "Interstellar",
        overivew: "A team of explorers travels through a wormhole in space in an attempt to save humanity.",
        releaseYear: 2014,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        runtime: 169,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        createdBy: creatorId,
    },
    {
        title: "The Dark Knight",
        overivew: "Batman faces the Joker, a criminal mastermind who throws Gotham into chaos.",
        releaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        createdBy: creatorId,
    },
    {
        title: "Parasite",
        overivew: "A poor family gradually infiltrates a wealthy household in this sharp social thriller.",
        releaseYear: 2019,
        genres: ["Thriller", "Drama"],
        runtime: 132,
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        createdBy: creatorId,
    },
    {
        title: "Avengers: Endgame",
        overivew: "The Avengers assemble for a final mission to reverse the damage caused by Thanos.",
        releaseYear: 2019,
        genres: ["Action", "Adventure", "Sci-Fi"],
        runtime: 181,
        posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        createdBy: creatorId,
    },
    {
        title: "The Shawshank Redemption",
        overivew: "Two imprisoned men build a lasting friendship while hoping for freedom and redemption.",
        releaseYear: 1994,
        genres: ["Drama"],
        runtime: 142,
        posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        createdBy: creatorId,
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        overivew: "Miles Morales becomes Spider-Man and joins other Spider-heroes from across dimensions.",
        releaseYear: 2018,
        genres: ["Animation", "Action", "Adventure"],
        runtime: 117,
        posterUrl: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        createdBy: creatorId,
    },
    {
        title: "Dune",
        overivew: "Paul Atreides arrives on Arrakis and is drawn into a struggle over its powerful resource.",
        releaseYear: 2021,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        runtime: 155,
        posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        createdBy: creatorId,
    },
    {
        title: "Whiplash",
        overivew: "A young drummer pushes himself to the limit under the brutal training of an intense instructor.",
        releaseYear: 2014,
        genres: ["Drama", "Music"],
        runtime: 107,
        posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        createdBy: creatorId,
    },
    {
        title: "Everything Everywhere All at Once",
        overivew: "An overwhelmed woman is pulled into a multiverse adventure that reshapes her family and future.",
        releaseYear: 2022,
        genres: ["Sci-Fi", "Comedy", "Adventure"],
        runtime: 139,
        posterUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
        createdBy: creatorId,
    },
];

const main = async () => {
    console.log("Seeding movies...");

    for (const movie of movies)
    {
        await prisma.movie.create({
            data: movie
        });
    }

    console.log("Seeding completed...");
}


main().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
})
