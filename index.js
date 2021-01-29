const express = require('express');
const LimitingMiddleware = require('limiting-middleware');
const { randomMeme } = require('./handler');
const { Canvas } = require('canvas-constructor')
const canvas = require('canvas')
const path = require('path')
const app = express();
const fetch = require('node-fetch');
const api = require("imageapi.js");
const rsi = require("random-stuff-api")











app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Try /meme , /kowalski , /twitter, /woah, /rmeme, /trump, /temp, /aww, /deadinside, /cleverbot , /covid ');
});



 

app.get('/ping', (req, res) => {
  res.send('pong');
});



app.get('/meme', (req, res) => {
  res.json(randomMeme());
});

app.get('/twitter/:feed',async  (req, res) => {
  
  const img = await canvas.loadImage('https://teckspace.files.wordpress.com/2011/08/twitter1.jpg')

  let image = new Canvas(550, 267)
  .printImage(img, 0, 0, 550, 267)
  .setTextFont('18px Helvetica Neue')
  .printText(req.params.feed, 40, 150)
  .toBuffer();

  res.set({'Content-Type': 'image/png'})
  res.send(image)

  
});

app.get('/kowalski/:feed',async  (req, res) => {
  
  const img = await canvas.loadImage('https://i.redd.it/nis9eqae7qu11.png')

  let image = new Canvas(763, 400)
  .printImage(img, 0, 0, 763, 400)
  .setTextFont('18px Helvetica Neue')
  .printText(req.params.feed, 455, 130)
  .toBuffer();

  res.set({'Content-Type': 'image/png'})
  res.send(image)

  
});



  
  
            
                      






  


app.get('/woah/:feed',async  (req, res) => {
  
  const img = await canvas.loadImage('https://i.pinimg.com/474x/d0/5d/36/d05d367a5e0153bbd104805868d080a1.jpg')

  let image = new Canvas(466, 500)
  .printImage(img, 0, 0, 466, 500)
  .setTextFont('18px Helvetica Neue')
  .printText(req.params.feed, 106, 102)
  .toBuffer();

  res.set({'Content-Type': 'image/png'})
  res.send(image)

  
});



app.get('/trump/:feed',async  (req, res) => {
  
  const img = await canvas.loadImage('https://i.imgflip.com/1i7abe.jpg')

  let image = new Canvas(585, 189)
  .printImage(img, 0, 0, 585, 189)
  .setTextFont('18px Segoe UI')
  
  .printText(req.params.feed, 85, 55)
  .toBuffer();

  res.set({'Content-Type': 'image/png'})
  res.send(image)

  
});

app.get('/temp/:feed',async  (req, res) => {
  
  const img = await canvas.loadImage('https://i.imgflip.com/41exj5.png')

  let image = new Canvas(1763, 1779)
  .printImage(img, 0, 0, 1763, 1779)
  .setTextFont('65px Poppins Bold')
  
  .printText(req.params.feed, 1063, 956)
  .toBuffer();

  res.set({'Content-Type': 'image/png'})
  res.send(image)

  
});




app.get('/rmeme',async  (req, res) => {
  let subreddits = ["dankmemes", "dank", "meme", "memes"];
  let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
  let img = await api(subreddit, true);

 
  res.send(`{"image": "${img}"}`)

  


  
});

app.get('/aww',async  (req, res) => {
  let subreddits = ["aww"];
  let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
  let img = await api(subreddit, true);

 
  res.send(`{"image": "${img}"}`)

  


  
});



app.get('/deadinside',async  (req, res) => {
 
  let img = await rsi.image.deadinside()

 
  res.send(`{"image": "${img}"}`)

  


  
});





app.get('/cleverbot/feed', (req, res) => {

  const message = req.params.feed

  fetch(`https://pepee.ga/chat?message=${message}`)
  .then(res => res.json())
  .then(async json => {
   res.send(`{"response": "${json.response}"}`)
    });
})

app.get('/covid/:feed', (req, res) => {
  
  const countries = req.params.feed

  fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
  .then(response => response.json())
  .then(data => {
      let confirmed = data.confirmed.value.toLocaleString()
      let recovered = data.recovered.value.toLocaleString()
      let deaths = data.deaths.value.toLocaleString()


      res.send(`{"confirmed": "${confirmed}", "recovered": "${recovered}", "deaths": "${deaths}"} `)


          })})



                   

          














app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
