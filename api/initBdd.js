const axios = require('axios');
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const apiKey = '711a5d7aca0842efa37ec4848aa2c962';

const basePath = 'https://api.spoonacular.com/';


axios.get(`${basePath}recipes/random?apiKey=${apiKey}&number=50`)
    .then(async (response) => {
        let recipes = [];
        response.data.recipes.forEach((value, i) => {
            recipes.push({
                detail: value.summary,
                author: value.sourceName,
                imgSrc: value.image,
                title: value.title,
            })
        })
        console.log(await prisma.recipe.createMany({
            data: recipes,
            skipDuplicates: true,
        }));
        console.log(response.data);
    }).catch((error) => {
        console.log(error)
});
