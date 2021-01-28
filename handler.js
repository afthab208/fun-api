const memes = require('./memes/index.json');

const randomMeme = () => {
  return memes[Math.floor(Math.random() * memes.length)];
}



module.exports = {  randomMeme };
