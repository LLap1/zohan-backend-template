import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { apiReference } from "@scalar/nestjs-api-reference";
import { config } from "./config";
import { logger } from "./lib/logger/logger";
import { WinstonModule } from "nest-winston";
import { generateOpenAPIDocument } from "./docs/open-api.docs";
import node from "./lib/open-telemetry/node";
import openApiClient from "./orpc/clients/open-api.client";

async function bootstrap() {
  node.start();

  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });

  const document = await generateOpenAPIDocument();

  app.use(
    "/docs",
    apiReference({
      content: document,
    })
  );

  app.listen(config.nest.port).then(async () => {
    const result = await openApiClient.planet.find({ id: 1 });
    console.log(result);
  });
}

bootstrap();
