import { createORPCClient, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RouterClient } from "@orpc/server";
import { root } from "src/routing/routers/root";

const link = new RPCLink({
  url: "http://localhost:3000/rpc",
});

const client: RouterClient<typeof root> = createORPCClient(link);

export default client;
