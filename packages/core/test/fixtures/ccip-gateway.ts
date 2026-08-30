import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export interface CcipGatewayRequest {
  readonly body: string;
  readonly method: string;
  readonly path: string;
}

export interface CcipGatewayFixture {
  readonly requests: ReadonlyArray<CcipGatewayRequest>;
  readonly url: string;
  readonly close: () => Promise<void>;
}

const readBody = async (request: IncomingMessage): Promise<string> => {
  const chunks: Array<Buffer> = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
};

const sendJson = (response: ServerResponse, value: unknown, status = 200) => {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    "content-length": Buffer.byteLength(body),
    "content-type": "application/json",
  });
  response.end(body);
};

export const startCcipGateway = async (): Promise<CcipGatewayFixture> => {
  const requests: Array<CcipGatewayRequest> = [];
  const server = createServer(async (request, response) => {
    const path = request.url ?? "/";
    const body = await readBody(request);
    requests.push({ body, method: request.method ?? "GET", path });

    if (path.startsWith("/get/")) return sendJson(response, { data: "0xabcd" });
    if (path === "/post") return sendJson(response, { data: "0xcafe" });
    if (path.startsWith("/result")) return sendJson(response, { data: "0xbeef" });
    if (path === "/redirect") {
      response.writeHead(302, { location: "/result" });
      return response.end();
    }
    if (path === "/redirect-denied") {
      const port = request.headers.host?.split(":").at(-1);
      response.writeHead(302, { location: `http://localhost:${port}/result` });
      return response.end();
    }
    if (path === "/loop") {
      response.writeHead(302, { location: "/loop" });
      return response.end();
    }
    if (path === "/slow") {
      return setTimeout(() => sendJson(response, { data: "0x1234" }), 100);
    }
    if (path === "/oversized") return response.end(`0x${"12".repeat(128)}`);
    if (path === "/malformed") return sendJson(response, { data: "not-hex" });
    if (path === "/invalid-json") {
      response.writeHead(200, { "content-type": "application/json" });
      return response.end("{");
    }
    return sendJson(response, { error: "gateway failure" }, 500);
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("The CCIP gateway fixture did not bind a TCP port");
  }

  return {
    requests,
    url: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error === undefined ? resolve() : reject(error)));
        server.closeAllConnections();
      }),
  };
};
