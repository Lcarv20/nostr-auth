// INFO: not sure if this below is needed, because they say it's necessary to use with node
// import { useWebSocketImplementation } from "nostr-tools/relay";
// // I don't really understand this line here, but they say it's necessary to use with node/bun
// useWebSocketImplementation(require("ws"));

/**
 * detect if webln is available
 * @param timeout timeout in ms
 * @returns a promise that resolves to the webln instance
 * */
async function detectWebLNProvider(
  timeout = 3000,
): Promise<Window["webln"] | null> {
  let resolved = false;

  return new Promise((resolve) => {
    const resolveOnce = (value: Window["webln"]) => {
      if (!resolved) {
        resolved = true;
        resolve(value);
      }
    };

    const handleWebLN = () => {
      resolveOnce(window.webln ? window.webln : null);
    };

    if (window.webln) {
      handleWebLN();
    } else {
      document.addEventListener("webln:ready", handleWebLN, { once: true });

      setTimeout(() => {
        handleWebLN();
      }, timeout);
    }
  });
}

/**
 * client-side function to detect if the extension is enabled
 * @returns a promise that resolves to the nostr instance
 * */
export async function getProviders() {
  try {
    const webln = await detectWebLNProvider();
    const nostr = typeof window.nostr ? window.nostr : null;

    return { webln, nostr };
  } catch (error) {
    console.error("couldn't detect webLN", error);
    return { webln: null, nostr: null };
  }
}

