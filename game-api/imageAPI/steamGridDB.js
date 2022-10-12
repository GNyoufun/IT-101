const SGDB = require('steamgriddb');
const client = new SGDB('8a1575f2ffa4e3cfab8e57014bba8c3c');

async function fetchImageList(game) {
  let response;
  let gameId;

  try{
    response = await client.searchGame(game);
  }catch(err){
    console.log(err);
  }
  gameId = response[0]["id"];

  imageList = await client.getGrids({type: 'game', id: gameId});
  return imageList;
  }

async function getImage(game, random = false){
  let images = [];

  for (let i = 0; i < game.length; i++) {
    let imageList = await fetchImageList(game[i]);
    let image = imageList[0];

    if (random) {
      let len = imageList.length - 1;
      let rand = Math.floor(Math.random() * len) + 1;
      image = imageList[rand];
    }

    let url = image["url"];
    let thumb = image["thumb"];
    images.push({Game: game[i], url: url, thumb: thumb});
  }
  return images ;
}