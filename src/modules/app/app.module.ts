import { Module } from "@nestjs/common";
import { onError, ORPCModule } from "@orpc/nest";
import { config } from "../../config";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { logger } from "../../lib/logger/logger";
import { PlanetModule } from "../planet/planet.module";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Module({
  imports: [
    WinstonModule.forRoot({
      instance: logger,
    }),

    ORPCModule.forRootAsync({
      // or .forRoot
      useFactory: (request: Request) => ({
        interceptors: [
          onError((error) => {
            logger.error(error);
          }),
        ],
        context: { request }, // oRPC context, accessible from middlewares, etc.
        eventIteratorKeepAliveInterval: 5000, // 5 seconds
      }),
      inject: [REQUEST],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => config,
    }),

    PlanetModule,
  ],
})
export class AppModule {}
