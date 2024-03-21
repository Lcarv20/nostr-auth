"use server";

import { kinds } from "nostr-tools";
import { DEFAULT_RELAYS, pool } from "..";
import { cookies } from "next/headers";
import { Relays } from "../types";

/**
 * @param publickey -
 *
 * this function sets a cookie with the user prefered relays NIP65
 * @see {@link https://github.com/nostr-protocol/nips/blob/master/65.md}
 */
export async function getRelays(pubkey: string) {
  const defaultRelays = Object.keys(DEFAULT_RELAYS);
  const relays: Relays = {};

  try {
    const filter = {
      kinds: [kinds.RelayList],
      authors: [pubkey],
    };

    const event = await pool.get([...defaultRelays], filter);
    if (event?.tags) {
      event.tags.forEach((tag) => {
        const relaySettings = () => {
          if (tag.includes("read")) return [true, false];
          if (tag.includes("write")) return [false, true];
          return [true, true];
        };

        const [read, write] = relaySettings();

        relays[tag[1]] = { read, write };
      });
    }
  } catch (error) {
    // TODO: handle error properly
    console.error("There was an error while loggin in -> ", error);
  } finally {
    // TODO: handle finally
    console.debug("Relays", relays);
    cookies().set("relays", JSON.stringify(relays));
  }
}
