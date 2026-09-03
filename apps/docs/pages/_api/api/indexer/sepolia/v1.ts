import { proxyIndexerRequest } from "../../../../../server/indexer-proxy";

export default (request: Request) => proxyIndexerRequest(request, "sepolia:v1");
