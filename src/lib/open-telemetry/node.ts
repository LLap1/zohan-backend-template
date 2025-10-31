import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { logger } from "../logger/logger";
import packageJson from "../../../package.json";
const traceExporter = new ConsoleSpanExporter();

// Create SDK instance with comprehensive configuration
const node = new NodeSDK({
  traceExporter,
  serviceName: packageJson.name,
  instrumentations: [],
});

process.on("SIGTERM", () => {
  node
    .shutdown()
    .then(
      () => logger.info("shutting down open telemetry node"),
      (err) => logger.error("Error shutting down open telemetry node", err)
    )
    .finally(() => process.exit(0));
});

export default node;
