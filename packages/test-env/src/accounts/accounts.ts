import { getAddress, type Address } from "viem";

export const devnetAccountRoles = [
  "deployer",
  "owner",
  "owner2",
  "operator",
  "unauthorized",
] as const;

export type DevnetAccountRole = (typeof devnetAccountRoles)[number];
export type DevnetAccounts = Readonly<Record<DevnetAccountRole, Address>>;

export const devnetAccounts = Object.freeze({
  deployer: getAddress("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"),
  owner: getAddress("0x70997970c51812dc3a010c7d01b50e0d17dc79c8"),
  owner2: getAddress("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"),
  operator: getAddress("0x90f79bf6eb2c4f870365e785982e1f101e93b906"),
  unauthorized: getAddress("0x15d34aaf54267db7d7c367839aaf71a00a2c6a65"),
}) satisfies DevnetAccounts;

export const devnetUnlockedAccounts = [
  devnetAccounts.deployer,
  devnetAccounts.owner,
  devnetAccounts.owner2,
  devnetAccounts.operator,
] as const;
