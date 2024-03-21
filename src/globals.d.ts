import { Event, NostrEvent } from "nostr-tools";

declare global {
  type Nip44 = {
    encrypt(pubkey: string, plaintext: string): Promise<string>;
    decrypt(pubkey: string, ciphertext: string): Promise<string>;
  };

  type NostrFns = {
    getPublicKey(): Promise<string>; // returns a public key as hex
    signEvent(event: {
      created_at: number;
      kind: number;
      tags: string[][];
      content: string;
    }): Promise<NostrEvent>; // takes an event object, adds `id`, `pubkey` and `sig` and returns it
    getRelays(): Promise<{ [url: string]: { read: boolean; write: boolean } }>; // returns a basic map of relay urls to relay policies
    // getRelays(): Promise<Map<string, { read: boolean; write: boolean }>>; // returns a basic map of relay urls to relay policies
    nip44: Nip44;
  };

  interface Window {
    webln?: any;
    nostr?: NostrFns;
  }
}
