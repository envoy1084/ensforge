type IndexerSource = "mainnet:v1" | "sepolia:v1" | "sepolia:v2";

const maximumRequestBytes = 64 * 1024;

const defaultEndpoints = {
  "mainnet:v1": "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
  "sepolia:v1": "https://api.studio.thegraph.com/query/49574/enssepolia/version/latest",
  "sepolia:v2": "https://staging-graphql.ens.dev/graphql",
} as const satisfies Readonly<Record<IndexerSource, string>>;

const endpointEnvironmentNames = {
  "mainnet:v1": [
    "ENSFORGE_MAINNET_V1_INDEXER_URL",
    "ENSFORGE_MAINNET_V1_SUBGRAPH_URL",
    "VITE_ENSFORGE_MAINNET_V1_INDEXER_URL",
  ],
  "sepolia:v1": ["ENSFORGE_SEPOLIA_V1_INDEXER_URL", "VITE_ENSFORGE_SEPOLIA_V1_INDEXER_URL"],
  "sepolia:v2": ["ENSFORGE_SEPOLIA_V2_INDEXER_URL", "VITE_ENSFORGE_SEPOLIA_V2_INDEXER_URL"],
} as const satisfies Readonly<Record<IndexerSource, ReadonlyArray<string>>>;

const jsonResponse = (message: string, status: number, headers?: HeadersInit) =>
  Response.json(
    { errors: [{ message }] },
    {
      status,
      headers: {
        "cache-control": "no-store",
        ...headers,
      },
    },
  );

const resolveEndpoint = (source: IndexerSource) => {
  for (const name of endpointEnvironmentNames[source]) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return defaultEndpoints[source];
};

export const proxyIndexerRequest = async (request: Request, source: IndexerSource) => {
  if (request.method !== "POST") {
    return jsonResponse("Only POST requests are supported", 405, { allow: "POST" });
  }

  const requestBody = await request.text();
  if (new TextEncoder().encode(requestBody).byteLength > maximumRequestBytes) {
    return jsonResponse("Indexer request is too large", 413);
  }

  try {
    const response = await fetch(resolveEndpoint(source), {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: requestBody,
      signal: request.signal,
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "cache-control": "no-store",
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return jsonResponse(`Unable to reach the ${source} indexer`, 502);
  }
};
