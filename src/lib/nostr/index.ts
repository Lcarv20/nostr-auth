import { SimplePool } from "nostr-tools";
import { Relays } from "@/lib/nostr/types";


export const DEFAULT_RELAYS: Relays = {
  "wss://relay.damus.io": { read: true, write: true },
  "wss://nos.lol": { read: true, write: true },
};

export const pool = new SimplePool();
