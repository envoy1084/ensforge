export const ensContractsV2Repository = "https://github.com/ensdomains/contracts-v2.git" as const;

export const ensContractsV2Commit = "892311a7268bf6051d5fe65740f1eebfaf8db431" as const;

export const ensDevnetChainId = 31337 as const;

export const ensDevnetImage =
  `ensforge-contracts-devnet:${ensContractsV2Commit.slice(0, 7)}` as const;
