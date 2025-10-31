import { trace } from "@opentelemetry/api";
import packageJson from "../../../package.json";

export const tracer = trace.getTracer(packageJson.name, packageJson.version);
