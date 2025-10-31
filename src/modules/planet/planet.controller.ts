import { Controller, Get } from "@nestjs/common";
import { Implement, implement, ORPCError } from "@orpc/nest";
import { root } from "src/orpc/contracts/root.contract";
import { PlanetService } from "./planet.service";

@Controller()
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Implement(root.planet.list)
  list() {
    return implement(root.planet.list).handler(() => {
      return this.planetService.list();
    });
  }

  @Implement(root.planet.find)
  find() {
    return implement(root.planet.find).handler(({ input }) => {
      const planet = this.planetService.find(input.id);

      if (!planet) {
        throw new ORPCError("NOT_FOUND", { message: "Planet not found" });
      }

      return planet;
    });
  }

  @Implement(root.planet.create)
  create() {
    return implement(root.planet.create).handler(({ input }) => {
      return this.planetService.create(input);
    });
  }

  @Implement(root.planet.update)
  update() {
    return implement(root.planet.update).handler(({ input, errors }) => {
      const planet = this.planetService.find(input.id);

      if (!planet) {
        throw errors.NOT_FOUND({ data: { id: input.id } });
      }

      return this.planetService.update(planet);
    });
  }
}
