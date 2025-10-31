import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { root } from "src/orpc/contracts/root.contract";
import { PlanetSchema } from "src/schemas/planet.schema";
import packageJson from "../../package.json";
import {
  NewPlanetSchema,
  UpdatePlanetSchema,
} from "src/orpc/contracts/planet/planet.contract.schema";

const openapiGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function generateOpenAPIDocument() {
  return openapiGenerator.generate(root, {
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    },
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    commonSchemas: {
      NewPlanet: { schema: NewPlanetSchema },
      UpdatePlanet: { schema: UpdatePlanetSchema },
      Planet: { schema: PlanetSchema },
    },
    servers: [{ url: "http://localhost:3000" }],
  });
}
