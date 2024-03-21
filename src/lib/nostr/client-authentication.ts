import { getProviders } from "@/lib/nostr/providers";
import { getRelays } from "@/lib/nostr/actions/get-relays";
import { getProfile } from "@/lib/nostr/actions/get-profile";
import { signIn } from "next-auth/react";

export async function loginWithExtension() {
  try {
    // get providers
    const { nostr } = await getProviders();
    if (!nostr) {
      alert("No Extension detected!");
      return;
    }

    // get public key
    const pubKey = await nostr?.getPublicKey();
    if (!pubKey) {
      alert("No Public key detected!");
      return;
    }

    // server actions
    await getRelays(pubKey);
    const profile = await getProfile(pubKey);

    if (!profile) {
      alert("No Profile detected!");
      return;
    }

    // INFO: this can take the whole user profile maybe
    const signed = await signIn("credentials", { publicKey: pubKey });

    console.log("signed:", signed);

    // console.table(profile);
    // TODO:add to next-auth
  } catch (error) {
    console.error("Error:", error);
  }
}
