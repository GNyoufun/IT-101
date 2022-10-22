const pathResolve = require('node:path');
require('dotenv').config({path: pathResolve.resolve(__dirname, '../../.env')});
const SGDB = require('steamgriddb');
const client = new SGDB(process.env.GAMEGRIDDB_URI);

async function fetchImageList(game) {
  let response;
  let gameId;

  try {
    response = await client.searchGame(game);
  } catch(err) {
    console.error(err);
  }
  gameId = response[0]["id"];
  console.log("found game: %s", gameId);

  imageList = await client.getGrids({type: 'game', id: gameId});
  return imageList;
}

async function getImage(game, random = false){
  let imageList = await fetchImageList(game);
  let image = imageList[0];

  if (random) {
    let len = imageList.length - 1;
    let rand = Math.floor(Math.random() * len) + 1;
    image = imageList[rand];
  }
  
  if (image === undefined || image.thumb === undefined) {
    console.warn("image search failure");
    return "";
  }

  console.log(image);
  return image.thumb;
}

module.exports = getImage;
