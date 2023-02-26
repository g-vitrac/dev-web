var express = require('express');
const http = require("http");
const {PrismaClient} = require("@prisma/client");
var app = express();
const prisma = new PrismaClient();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  console.log(req.url)

  // Pass to next layer of middleware
  next();
});

/**
 * Get port from environment and store in Express.
 */

app.set('port', 3000);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000);

app.get('/recipe/:id?/:userId?', async (req, res) => {
  try {
    if(req.params.id != null) {
      let args = {where: {id: parseInt(req.params.id)}};
      if (req.params.userId) {
        args.include = {
          users: {
            where: {
              id: parseInt(req.params.userId),
            }
          }
        };
      }
      res.send(await prisma.recipe.findUnique(args));
    }
    else
      res.send(await prisma.recipe.findMany());
  } catch ( e ){
    res.status(400).send(e.message);
  }
})
app.get('/user/:id?', async (req, res) => {
  try {
    if(req.params.id != null)
      res.send(await prisma.user.findUnique({where: {id: parseInt(req.params.id)}}));
    else
      res.send(await prisma.user.findMany());
  } catch ( e ){
    res.status(400).send(e.message);
  }
})

app.get('/user/favs/:id', async (req, res) => {
  try {
    res.send((await prisma.user.findUnique({where: {id: parseInt(req.params.id)}, include: {recipes: true}})).recipes)
  } catch ( e ){
    res.status(400).send(e.message);
  }
})

app.post('/recipe', async (req, res) => {
  try {
    let params = req.body;
    console.log(params);
    res.send(await prisma.recipe.create({
      data: {
        detail: params.detail,
        title: params.title,
        author: params.author,
        imgSrc: params.imgSrc,
        youtubeLink: params.youtubeLink
      },
    }));
  } catch ( e ) {
    console.error(req.body);
    res.status(400).send(e.message)
  }
});

app.post('/user', async (req, res) => {
  try {
    let params = req.body;
    res.send(await prisma.user.create({
      data: {
        name: params.name,
        imgSrc: '',
      }
    }));
  } catch ( e ) {
    res.status(400).send(e.message)
  }
})

app.put('/user/:userId/addFavs/:recipeId', async (req, res) => {
  try {
    res.send(await prisma.user.update({
      where: {
        id: parseInt(req.params.userId),
      },
      data: {
        recipes: {
          connect: [{id: parseInt(req.params.recipeId)}]
        }
      }
    }));
  } catch ( e ) {
    res.status(400).send(e.message)
  }
})

app.put('/user/:userId/removeFavs/:recipeId', async (req, res) => {
  try {
    res.send(await prisma.user.update({
      where: {
        id: parseInt(req.params.userId),
      },
      data: {
        recipes: {
          disconnect: [{id: parseInt(req.params.recipeId)}]
        }
      }
    }));
  } catch ( e ) {
    res.status(400).send(e.message)
  }
})

app.delete('/recipe/:id', async (req, res) => {
  try {
    res.send(await prisma.recipe.delete({
      where: {
        id: parseInt(req.params.id)
      }
    }))
  } catch ( e ) {
    res.status(400).send(e.message);
  }
})

app.put('/recipe/:id', async (req, res) => {
  try {
    let params = req.body;
    res.send(await prisma.recipe.update({
      data: {
        detail: params.detail,
        title: params.title,
        author: params.author,
        imgSrc: params.title,
        youtubeLink: params.youtubeLink
      },
      where: {
        id: parseInt(req.params.id),
      }
    }));
  } catch ( e ) {
    res.status(400).send(e.message)
  }
});

const addUser = async () => {
  console.log(await prisma.user.create({
    data: {
      name: 'Gaetan',
      imgSrc: ''
    }
  }));
}

addUser();