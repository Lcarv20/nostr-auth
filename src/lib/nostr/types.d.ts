export type Profile = {
  relay: string;
  displayName?: string;
  name?: string;
  picture?: string;
  banner?: string;
  about?: string;
  website?: string;
  // readable address
  lud06?: string;
  // mess of chars
  lud16?: string;
  publickey?: string;
};

export type Relays = {
  [url: string]: { read: boolean; write: boolean };
};

export type UserWithKeys = User & {
  secretKey: string;
  publicKey: string;
};

export type TokenWithPublicKey = {
  publicKey: string;
};
