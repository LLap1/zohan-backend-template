import { root } from "../contracts/root.contract";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { onError } from "@orpc/client";
import { logger } from "src/lib/logger/logger";
import { RequestValidationPlugin } from "@orpc/contract/plugins";
import { JsonifiedClient } from "@orpc/openapi-client";
import { ContractRouterClient } from "@orpc/contract";
import { createORPCClient } from "@orpc/client";

const link = new OpenAPILink(root, {
  url: "http://localhost:3000",
  plugins: [new RequestValidationPlugin(root)],
});

const client: JsonifiedClient<ContractRouterClient<typeof root>> =
  createORPCClient(link);

export default client;
