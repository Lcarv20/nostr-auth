"use server";

import { generateSecretKey, getPublicKey } from "nostr-tools/pure";

function bytesToHexManual(byteArray: Uint8Array) {
  return Array.from(byteArray)
    .map((byte) => {
      return `0${byte.toString(16)}`.slice(-2);
    })
    .join("");
}

export async function generateKeys(): Promise<{ pk: string; sk: string }> {
  const u8sk = generateSecretKey(); // `sk` is a Uint8Array
  const pk = getPublicKey(u8sk); // `pk` is a hex string
  let sk = bytesToHexManual(u8sk);

  console.log({ sk, pk });

  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        pk,
        sk,
      });
    }, 3000);
  });
}
