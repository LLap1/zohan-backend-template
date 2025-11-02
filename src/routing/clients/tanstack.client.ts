import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import openApiClient from "./open-api.client";

const client = createTanstackQueryUtils(openApiClient);

export default client;
