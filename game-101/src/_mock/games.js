import { faker } from "@faker-js/faker";

const GAME_NAME = [
  "Grand Theft Auto V",
  "League Of Legends",
  "Overcooked",
  "Overwatch",
  "Grand Theft Auto V",
  "League Of Legends",
  "Overcooked",
  "Overwatch",
];

const games = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/src/style/mock-images/game_${setIndex}.jpg`,
    name: GAME_NAME[index],
  };
});

export default games;
