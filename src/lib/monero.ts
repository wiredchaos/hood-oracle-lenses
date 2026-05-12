// Monero (XMR) acceptance config — client-only.
// Set VITE_MONERO_ADDRESS in project settings to override the placeholder.
const PLACEHOLDER = "44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A";

const ENV_ADDR = (import.meta.env.VITE_MONERO_ADDRESS as string | undefined)?.trim();

export const MONERO_ADDRESS: string = ENV_ADDR && ENV_ADDR.length > 40 ? ENV_ADDR : PLACEHOLDER;
export const MONERO_IS_PLACEHOLDER = MONERO_ADDRESS === PLACEHOLDER;

export function moneroUri(amountXmr?: number, label = "Hood Oracle", message?: string): string {
  const params = new URLSearchParams();
  if (amountXmr && amountXmr > 0) params.set("tx_amount", String(amountXmr));
  if (label) params.set("recipient_name", label);
  if (message) params.set("tx_description", message);
  const q = params.toString();
  return `monero:${MONERO_ADDRESS}${q ? `?${q}` : ""}`;
}

export function shortAddr(a = MONERO_ADDRESS, head = 8, tail = 8): string {
  if (a.length <= head + tail + 3) return a;
  return `${a.slice(0, head)}…${a.slice(-tail)}`;
}

export const MONERO_GUI_URL = "https://www.getmonero.org/downloads/";
export const MONERO_GUI_REPO = "https://github.com/monero-project/monero-gui";
