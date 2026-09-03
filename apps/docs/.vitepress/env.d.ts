declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_ENSFORGE_MAINNET_RPC_URL?: string;
  readonly VITE_ENSFORGE_MAINNET_V1_INDEXER_URL?: string;
  readonly VITE_ENSFORGE_MAINNET_V2_INDEXER_URL?: string;
  readonly VITE_ENSFORGE_SEPOLIA_RPC_URL?: string;
  readonly VITE_ENSFORGE_SEPOLIA_V1_INDEXER_URL?: string;
  readonly VITE_ENSFORGE_SEPOLIA_V2_INDEXER_URL?: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
}
