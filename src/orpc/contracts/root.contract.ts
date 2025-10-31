import {
  createPlanet,
  findPlanet,
  listPlanets,
  updatePlanet,
} from "./planet/planet.contract";

export const root = {
  planet: {
    list: listPlanets,
    create: createPlanet,
    find: findPlanet,
    update: updatePlanet,
  },
};
