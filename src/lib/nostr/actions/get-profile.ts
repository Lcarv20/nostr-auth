'use server'

import { cookies } from "next/headers";
import { DEFAULT_RELAYS, pool } from "@/lib/nostr";
import { kinds } from "nostr-tools";
import { Profile } from "@/lib/nostr/types";

export async function getProfile(publickey: string) {
  const relays = cookies().get("relays")?.value || Object.keys(DEFAULT_RELAYS);

  const profiles: Profile[] = [];

  try {
    for (const relay of Object.keys(relays)) {
      const filter = {
        kinds: [kinds.Metadata],
        authors: [publickey],
      };
      const event = await pool.querySync([relay], filter);
      if (event.length === 0 || !event[0].content) {
        // alert("something went wrong, please try again later");
        // return;
        continue;
      }
      const json = JSON.parse(event[0].content);

      const profile: Profile = {
        relay,
        publickey,
        name: json.name,
        displayName: json.display_name,
        picture: json.picture,
        banner: json.banner,
        about: json.about,
        website: json.website,
        lud06: json.lud06,
        lud16: json.lud16,
      };
      profiles.push(profile);
    }
  } catch (error) {
    // TODO: handle error properly
    console.error("There was an error while loggin in -> ", error);
  } finally {
    cookies().set("profiles", JSON.stringify(profiles));
    return profiles;
    //FIXME: add this to next-auth instead of returning
  }
}
