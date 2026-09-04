#!/usr/bin/env node

/* oxlint-disable no-await-in-loop -- Retries, confirmations, and nonce-sensitive writes must run sequentially. */

import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createPublicClient,
  createWalletClient,
  formatEther,
  formatUnits,
  http,
  isAddress,
  isAddressEqual,
  keccak256,
  parseUnits,
  stringToHex,
  zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

import { encodeAddressRecord } from "../packages/core/dist/index.js";
import { Ensforge } from "../packages/sdk/dist/index.js";
import { fixtureVersion, jsonReplacer, makeSepoliaV2Fixtures } from "./sepolia-v2-fixtures.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const repository = resolve(directory, "..");
const statePath = resolve(repository, ".ensforge/sepolia-v2-state.json");
const manifestPath = resolve(repository, ".ensforge/sepolia-v2-fixtures.json");
const day = 86_400n;
const duration = 365n * day;
const confirmations = 2;
const apply = process.argv.includes("--apply");
const help = process.argv.includes("--help") || process.argv.includes("-h");

// Edit these public fixture values before running the script with --apply.
const fixtureConfig = {
  rootName: "ensforge.eth",
  addresses: {
    bitcoin: "",
    solana: "",
    secondary: "0x000000000000000000000000000000000000dead",
    operator: "0x000000000000000000000000000000000000beef",
  },
  profile: {
    description: "ensforge ENSv2 Sepolia documentation profile",
    url: "https://ensforge.com",
    twitter: "thenamespace",
    email: "hello@ensforge.com",
    avatar: "https://ensforge.com/og.png",
    contentHash: {
      protocol: "ipfs",
      value: "QmYwAPJzv5CZsnAzt8auVZRnGiRAK8vN2jEw9kDrYb3a5f",
    },
    interface: { interfaceId: "0x01ffc9a7" },
    data: { key: "com.ensforge.docs", value: "0x656e73666f726765" },
  },
};

const usage = `
Set up persistent ENSv2 fixtures on Sepolia.

Usage:
  pnpm setup:sepolia-v2   # Preflight only
  pnpm setup:docs-sepolia # Apply the fixture plan

Both commands load ENSFORGE_SEPOLIA_RPC_URL and ENSFORGE_SEPOLIA_PRIVATE_KEY from .env.
Edit fixtureConfig near the top of this file before applying the plan.
Progress and generated fixture data are written under .ensforge/.
`;

if (help) {
  console.log(usage.trim());
  process.exit(0);
}

const requiredEnvironment = (name) => {
  const value = process.env[name];
  if (value === undefined || value.length === 0) throw new Error(`${name} is required`);
  return value;
};

const rpcUrl = requiredEnvironment("ENSFORGE_SEPOLIA_RPC_URL");
const privateKey = requiredEnvironment("ENSFORGE_SEPOLIA_PRIVATE_KEY");
if (!/^0x[\da-fA-F]{64}$/.test(privateKey)) {
  throw new Error("ENSFORGE_SEPOLIA_PRIVATE_KEY must be a 32-byte hex private key");
}

const account = privateKeyToAccount(privateKey);
const publicKey = account.publicKey;
const pubkey = {
  x: `0x${publicKey.slice(4, 68)}`,
  y: `0x${publicKey.slice(68, 132)}`,
};
if (!/^0x[\da-fA-F]{64}$/.test(pubkey.x) || !/^0x[\da-fA-F]{64}$/.test(pubkey.y)) {
  throw new Error("Unable to derive an uncompressed secp256k1 public key from the signer");
}
const root = fixtureConfig.rootName.toLowerCase();
const rootName = root.endsWith(".eth") ? root : `${root}.eth`;
const rootLabel = rootName.slice(0, -4);
if (!/^[a-z0-9](?:[a-z0-9-]{3,56}[a-z0-9])?\.eth$/.test(rootName) || rootLabel.length > 58) {
  throw new Error("fixtureConfig.rootName must be a normalized 5–58 character .eth label");
}
const bareRoot = `${rootLabel}-bare.eth`;
const secondary = fixtureConfig.addresses.secondary;
const operator = fixtureConfig.addresses.operator;
if (!isAddress(secondary) || !isAddress(operator)) {
  throw new Error("Secondary and operator fixture accounts must be valid Ethereum addresses");
}

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl, { retryCount: 2, timeout: 30_000 }),
});
const walletClient = createWalletClient({ account, chain: sepolia, transport: http(rpcUrl) });
const sdk = new Ensforge({
  network: "sepolia",
  publicClient,
  walletClient,
  writes: { confirmation: { type: "confirmed", confirmations } },
});
const deployment = sdk.config.deployments.v2;
if (deployment === undefined) throw new Error("The Sepolia config does not include ENSv2");

const fixtures = makeSepoliaV2Fixtures({
  account: account.address,
  bareRoot,
  btcAddress: fixtureConfig.addresses.bitcoin,
  operator,
  profile: { ...fixtureConfig.profile, pubkey },
  root: rootName,
  secondary,
  solanaAddress: fixtureConfig.addresses.solana,
});

for (const [coinType, address] of [
  [0n, fixtureConfig.addresses.bitcoin],
  [501n, fixtureConfig.addresses.solana],
]) {
  encodeAddressRecord({ coinType, address });
}

const parseState = async () => {
  try {
    return JSON.parse(await readFile(statePath, "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    return {
      version: fixtureVersion,
      root: rootName,
      bareRoot,
      secrets: {
        root: `0x${randomBytes(32).toString("hex")}`,
        bareRoot: `0x${randomBytes(32).toString("hex")}`,
      },
      completed: [],
    };
  }
};

const state = await parseState();
if (
  state.version !== fixtureVersion ||
  state.root !== rootName ||
  state.bareRoot !== bareRoot ||
  !/^0x[\da-fA-F]{64}$/.test(state.secrets?.root ?? "") ||
  !/^0x[\da-fA-F]{64}$/.test(state.secrets?.bareRoot ?? "") ||
  !Array.isArray(state.completed)
) {
  throw new Error(
    `Checkpoint ${statePath} belongs to another fixture plan. Move it away and run again.`,
  );
}

const persistState = async () => {
  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify(state, jsonReplacer, 2)}\n`, { mode: 0o600 });
};

const sleep = (milliseconds) =>
  new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));
const retryable = (error) =>
  !/execution reverted|contract function reverted/i.test(
    error instanceof Error ? error.message : String(error),
  ) &&
  /429|rate.?limit|timeout|timed out|network|socket|fetch failed|connection/i.test(
    error instanceof Error ? `${error.name} ${error.message}` : String(error),
  );

const retry = async (label, operation) => {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === 4 || !retryable(error)) throw error;
      const delay = 2 ** (attempt - 1) * 1_000;
      console.warn(`  ${label} hit a transient error; retrying in ${delay / 1_000}s`);
      await sleep(delay);
    }
  }
};

const step = async (id, operation) => {
  if (state.completed.includes(id)) {
    console.log(`- ${id}: checkpointed`);
    return;
  }
  console.log(`- ${id}`);
  await retry(id, operation);
  state.completed.push(id);
  await persistState();
};

const waitForTransaction = async (hash) =>
  publicClient.waitForTransactionReceipt({ hash, confirmations, timeout: 180_000 });

const ownerOf = async (name) => (await sdk.name.getOwner({ name }))?.owner ?? null;

const requireOwned = async (name, expectedOwner = account.address) => {
  const owner = await ownerOf(name);
  if (owner === null || !isAddressEqual(owner, expectedOwner)) {
    throw new Error(`${name} is owned by ${owner ?? "nobody"}, expected ${expectedOwner}`);
  }
};

const ensurePaymentBalance = async () => {
  const token = deployment.testTokens?.usdc;
  if (token === undefined) throw new Error("The ENSv2 deployment has no MockUSDC test token");
  const abi = [
    {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      type: "function",
      name: "decimals",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "uint8" }],
    },
    {
      type: "function",
      name: "mint",
      stateMutability: "nonpayable",
      inputs: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [],
    },
  ];
  const [balance, decimals] = await Promise.all([
    publicClient.readContract({
      address: token,
      abi,
      functionName: "balanceOf",
      args: [account.address],
    }),
    publicClient.readContract({ address: token, abi, functionName: "decimals" }),
  ]);
  const target = parseUnits("1000", decimals);
  if (balance >= target) return;
  const hash = await walletClient.writeContract({
    address: token,
    abi,
    functionName: "mint",
    args: [account.address, target - balance],
  });
  await waitForTransaction(hash);
};

const ensureResolver = async () => {
  const salt = BigInt(keccak256(stringToHex(`ensforge:sepolia-v2:${rootName}`)));
  const resolver = await sdk.resolution.predictResolverAddress({ salt });
  const code = await publicClient.getCode({ address: resolver });
  if (code === undefined || code === "0x") await sdk.resolution.createResolver({ salt });
  return resolver;
};

const register = async ({ name, resolver, secret }) => {
  if (!(await sdk.name.isAvailable({ name }))) {
    await requireOwned(name);
    return;
  }
  const paymentToken = deployment.testTokens?.usdc;
  if (paymentToken === undefined) throw new Error("The ENSv2 deployment has no MockUSDC");
  const parameters = {
    name,
    duration,
    owner: account.address,
    secret,
    paymentToken,
    mode: "sequential",
    ...(resolver === undefined ? {} : { resolver }),
  };
  let result = await sdk.registration.registerName(parameters);
  for (let attempt = 0; result.status !== "completed" && attempt < 4; attempt += 1) {
    if (result.status === "partial") {
      throw new Error(`Registration of ${name} stopped with a partial write plan`);
    }
    if (result.nextActionAt !== null) {
      const delay = Math.max(0, Number(result.nextActionAt) * 1_000 - Date.now() + 2_000);
      console.log(`  waiting ${Math.ceil(delay / 1_000)}s for ${name}'s commitment`);
      await sleep(delay);
    }
    result = await sdk.registration.registerName({ ...parameters, resume: result });
  }
  if (result.status !== "completed") throw new Error(`Registration of ${name} did not complete`);
};

const ensureSubname = async ({ name, owner = account.address, resolver, expiry }) => {
  const currentOwner = await ownerOf(name);
  if (currentOwner !== null) {
    if (!isAddressEqual(currentOwner, owner)) {
      throw new Error(`${name} is owned by ${currentOwner}, expected ${owner}`);
    }
    return;
  }
  await sdk.subnames.createSubname({
    name,
    owner,
    mode: "sequential",
    ...(resolver === undefined ? {} : { resolver }),
    ...(expiry === undefined ? {} : { expiry }),
  });
};

const preflight = async () => {
  const [chainId, block, balance] = await Promise.all([
    publicClient.getChainId(),
    publicClient.getBlock({ blockTag: "latest" }),
    publicClient.getBalance({ address: account.address }),
  ]);
  if (chainId !== sepolia.id) throw new Error(`RPC returned chain ${chainId}, expected Sepolia`);
  if (balance < 5_000_000_000_000_000n) {
    throw new Error(`Fixture account needs at least 0.005 ETH; it has ${formatEther(balance)} ETH`);
  }
  for (const [name, address] of Object.entries({
    ethRegistry: deployment.contracts.ethRegistry,
    ethRegistrar: deployment.contracts.ethRegistrar,
    universalResolver: deployment.contracts.universalResolver,
    verifiableFactory: deployment.contracts.verifiableFactory,
  })) {
    const code = await publicClient.getCode({ address });
    if (code === undefined || code === "0x") throw new Error(`${name} has no code at ${address}`);
  }
  console.log(
    `Sepolia block ${block.number}; signer ${account.address}; balance ${formatEther(balance)} ETH`,
  );
};

await preflight();
console.log(`Fixture roots: ${rootName}, ${bareRoot}`);
if (!apply) {
  console.log("\nDry run only. Re-run with --apply to submit transactions.");
  console.log(JSON.stringify(fixtures, jsonReplacer, 2));
  process.exit(0);
}

await persistState();
await step("fund-mock-usdc", ensurePaymentBalance);

let permissionedResolver;
await step("deploy-permissioned-resolver", async () => {
  permissionedResolver = await ensureResolver();
});
permissionedResolver ??= await ensureResolver();

await step("register-root", () =>
  register({ name: rootName, resolver: permissionedResolver, secret: state.secrets.root }),
);
await step("register-bare-root", () =>
  register({ name: bareRoot, secret: state.secrets.bareRoot }),
);
await step("clear-bare-root-resolver", async () => {
  const resolver = await sdk.resolution.getResolver({ name: bareRoot });
  if (resolver !== null) {
    await sdk.resolution.setResolver({ name: bareRoot, resolver: zeroAddress });
  }
});

await step("create-primary-subnames", async () => {
  const { timestamp } = await publicClient.getBlock({ blockTag: "latest" });
  await ensureSubname({ name: fixtures.names.profile, resolver: permissionedResolver });
  await ensureSubname({ name: fixtures.names.empty, resolver: permissionedResolver });
  await ensureSubname({ name: fixtures.names.inherited });
  await ensureSubname({ name: fixtures.names.alias, resolver: permissionedResolver });
  await ensureSubname({ name: fixtures.names.permissioned, resolver: permissionedResolver });
  await ensureSubname({ name: fixtures.names.mutation, resolver: permissionedResolver });
  await ensureSubname({ name: fixtures.names.dns, resolver: deployment.contracts.publicResolver });
  await ensureSubname({ name: fixtures.names.branch });
  await ensureSubname({
    name: fixtures.names.customExpiry,
    resolver: permissionedResolver,
    expiry: timestamp + 90n * day,
  });
});

await step("create-nested-subname", () => ensureSubname({ name: fixtures.names.nested }));

await step("set-profile-records", () =>
  sdk.records.setRecords({
    name: fixtures.names.profile,
    aggregation: "resolver",
    records: [
      ...fixtures.records.profile.addresses.map((record) => ({ type: "address", ...record })),
      ...fixtures.records.profile.texts.map((record) => ({ type: "text", ...record })),
      { type: "contentHash", ...fixtures.records.profile.contentHash },
      { type: "abi", contentType: "json", value: fixtures.records.profile.abi },
      { type: "pubkey", ...fixtures.records.profile.pubkey },
      { type: "interface", ...fixtures.records.profile.interface },
      { type: "data", ...fixtures.records.profile.data },
      { type: "name", value: fixtures.records.profile.name },
    ],
  }),
);

await step("set-root-records", () =>
  sdk.records.setRecords({
    name: rootName,
    aggregation: "resolver",
    records: [
      ...fixtures.records.root.addresses.map((record) => ({ type: "address", ...record })),
      ...fixtures.records.root.texts.map((record) => ({ type: "text", ...record })),
      { type: "contentHash", ...fixtures.records.root.contentHash },
      { type: "abi", contentType: "json", value: fixtures.records.root.abi },
      { type: "pubkey", ...fixtures.records.root.pubkey },
      { type: "interface", ...fixtures.records.root.interface },
      { type: "data", ...fixtures.records.root.data },
      { type: "name", value: fixtures.records.root.name },
    ],
  }),
);

await step("set-inherited-resolver-record", () =>
  sdk.records.setText({ name: fixtures.names.inherited, ...fixtures.records.inherited.text }),
);
await step("set-alias", () =>
  sdk.records.setAlias({ name: fixtures.names.alias, target: fixtures.names.profile }),
);
await step("verify-dns-write-unavailable", async () => {
  const permissions = await sdk.capabilities.getRecordPermissions({
    name: fixtures.names.dns,
    account: account.address,
    records: [{ type: "dnsZone" }, { type: "dnsRecord" }],
  });
  if (permissions.records.some(({ authorization }) => authorization.status === "authorized")) {
    throw new Error("The V2-only DNS fixture unexpectedly reports writable PublicResolver records");
  }
});

await step("grant-permission-fixtures", async () => {
  await sdk.permissions.setOperatorApproval({
    name: fixtures.names.profile,
    target: "registry",
    operator,
    approved: true,
  });
  await sdk.permissions.grantRegistryRoles({
    name: fixtures.names.profile,
    account: operator,
    roles: 1n << 24n,
  });
  await sdk.permissions.setRecordPermissions({
    name: fixtures.names.permissioned,
    account: operator,
    records: [
      { type: "text", key: "description" },
      { type: "address", coinType: 60n },
    ],
    approved: true,
    mode: "sequential",
  });
  await sdk.permissions.setResolverDelegateApproval({
    name: fixtures.names.dns,
    delegate: operator,
    approved: true,
  });
});

await step("set-primary-name", () =>
  sdk.reverse.setPrimaryName({ name: fixtures.names.profile, verifyForward: true }),
);

await step("transfer-different-owner", async () => {
  const ownerBefore = await ownerOf(fixtures.names.differentOwner);
  if (ownerBefore === null) {
    await ensureSubname({ name: fixtures.names.differentOwner });
  } else if (isAddressEqual(ownerBefore, secondary)) {
    return;
  } else if (!isAddressEqual(ownerBefore, account.address)) {
    throw new Error(`${fixtures.names.differentOwner} is not controlled by the fixture signer`);
  }
  await sdk.subnames.transferSubname({
    name: fixtures.names.differentOwner,
    to: secondary,
    mode: "sequential",
  });
});

const profile = await sdk.records.getRecords({
  name: fixtures.names.profile,
  records: {
    addresses: fixtures.records.profile.addresses.map(({ coinType }) => coinType),
    texts: fixtures.records.profile.texts.map(({ key }) => key),
    avatar: true,
    contentHash: true,
    abi: true,
    pubkey: true,
    name: true,
    interfaces: [fixtures.records.profile.interface.interfaceId],
    data: [fixtures.records.profile.data.key],
  },
});
const [
  rootState,
  bareState,
  alias,
  inheritedResolver,
  primaryName,
  dnsRecord,
  zoneHash,
  registryRoles,
  recordPermissions,
  operatorApproval,
  resolverDelegateApproval,
  nestedResource,
  differentOwnerState,
  emptyResolver,
  resolverVersion,
  availableRegistration,
  renewal,
  ttl,
  customExpiry,
  seededAtBlock,
  tokenBalance,
] = await Promise.all([
  sdk.name.getNameState({ name: rootName }),
  sdk.name.getNameState({ name: bareRoot }),
  sdk.resolution.getAlias({ name: fixtures.names.alias }),
  sdk.resolution.getResolver({ name: fixtures.names.inherited }),
  sdk.reverse.getPrimaryName({ address: account.address }),
  sdk.dns.getDnsRecord({
    name: fixtures.names.dns,
    recordName: fixtures.records.dns.recordName,
    resource: fixtures.records.dns.resource,
  }),
  sdk.dns.getZoneHash({ name: fixtures.names.dns }),
  sdk.capabilities.getRegistryRoles({ name: fixtures.names.profile, account: operator }),
  sdk.capabilities.getRecordPermissions({
    name: fixtures.names.permissioned,
    account: operator,
    records: [
      { type: "text", key: "description" },
      { type: "address", coinType: 60n },
    ],
  }),
  sdk.capabilities.getOperatorApproval({
    name: fixtures.names.profile,
    owner: account.address,
    operator,
  }),
  sdk.capabilities.getResolverDelegateApproval({
    name: fixtures.names.dns,
    owner: account.address,
    delegate: operator,
  }),
  sdk.name.getCanonicalResource({ name: fixtures.names.nested }),
  sdk.name.getNameState({ name: fixtures.names.differentOwner }),
  sdk.resolution.getResolver({ name: fixtures.names.empty }),
  sdk.resolution.getResolverVersion({ name: fixtures.names.profile }),
  sdk.registration.getRegistrationPrice({
    name: fixtures.names.availableRoot,
    duration,
    paymentToken: deployment.testTokens.usdc,
  }),
  sdk.registration.getRenewalPrice({
    name: rootName,
    duration,
    paymentToken: deployment.testTokens.usdc,
  }),
  sdk.ownership.getTtl({ name: fixtures.names.profile }),
  sdk.name.getExpiry({ name: fixtures.names.customExpiry }),
  publicClient.getBlockNumber(),
  publicClient.readContract({
    address: deployment.testTokens.usdc,
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
    functionName: "balanceOf",
    args: [account.address],
  }),
]);

if (rootState.protocol !== "v2" || rootState.resolver === null) {
  throw new Error("Configured root did not verify as a resolved ENSv2 name");
}
if (bareState.protocol !== "v2" || bareState.resolver !== null) {
  throw new Error("Bare root did not verify as an ENSv2 name without a resolver");
}
if (!alias.supported || alias.target !== fixtures.names.profile) {
  throw new Error("Alias fixture did not round-trip through the ENSv2 resolver");
}
if (inheritedResolver === null || profile.addresses.some(({ address }) => address === null)) {
  throw new Error("Resolver fixture verification failed");
}
if (primaryName === null || primaryName.name !== fixtures.names.profile || !primaryName.match) {
  throw new Error("Primary-name fixture did not pass forward verification");
}
if (dnsRecord.value !== null || zoneHash.value !== null) {
  throw new Error("V2-only DNS fixture unexpectedly returned populated PublicResolver records");
}
if (!registryRoles.supported || (registryRoles.roles & (1n << 24n)) === 0n) {
  throw new Error("Registry-role fixture did not verify");
}
if (
  recordPermissions.records.length !== 2 ||
  recordPermissions.records.some(({ authorization }) => authorization.status !== "authorized")
) {
  throw new Error("Resolver-role fixture did not verify");
}
if (
  !operatorApproval.targets.some(
    ({ kind, supported, approved }) => kind === "registry" && supported && approved,
  ) ||
  !resolverDelegateApproval.supported ||
  !resolverDelegateApproval.approved
) {
  throw new Error("Operator or resolver-delegate fixture did not verify");
}
if (nestedResource === null || emptyResolver === null || !resolverVersion.supported) {
  throw new Error("Nested registry or resolver topology did not verify");
}
if (differentOwnerState.owner === null || !isAddressEqual(differentOwnerState.owner, secondary)) {
  throw new Error("Different-owner fixture did not verify");
}
if (availableRegistration.status !== "available" || renewal.status !== "renewable") {
  throw new Error("Registration and renewal read fixtures did not verify");
}
if (ttl.supported || ttl.protocol !== "v2" || customExpiry === null) {
  throw new Error("ENSv2 TTL or custom-expiry fixture did not verify");
}

const manifest = {
  ...fixtures,
  chainId: sepolia.id,
  deployment: deployment.id,
  seededAtBlock,
  resolver: permissionedResolver,
  expected: {
    profile,
    alias,
    primaryName,
    inheritedResolver,
    dnsRecord,
    zoneHash,
    registryRoles,
    recordPermissions,
    operatorApproval,
    resolverDelegateApproval,
    nestedResource,
    differentOwnerState,
    emptyResolver,
    resolverVersion,
    availableRegistration,
    renewal,
    ttl,
    customExpiry,
  },
};
await mkdir(dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, jsonReplacer, 2)}\n`);

console.log(`\nENSv2 Sepolia fixtures are ready at block ${seededAtBlock}.`);
console.log(`MockUSDC remaining: ${formatUnits(tokenBalance, 6)}`);
console.log(`Manifest: ${manifestPath}`);
console.log(JSON.stringify(manifest, jsonReplacer, 2));
