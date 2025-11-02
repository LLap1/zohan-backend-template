import { root } from "src/routing/routers/root.router";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { JsonifiedClient } from "@orpc/openapi-client";
import { ContractRouterClient } from "@orpc/contract";
import { createORPCClient } from "@orpc/client";

const link = new OpenAPILink(root, {
  url: "http://localhost:3000/api",
});

const client: JsonifiedClient<ContractRouterClient<typeof root>> =
  createORPCClient(link);

export default client;
