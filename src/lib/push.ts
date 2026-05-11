// Push notifications. Native-only. No-op on web.
import { isNative } from "./native";

export type PushState = {
  supported: boolean;
  permission: "prompt" | "granted" | "denied" | "unknown";
  token?: string;
};

export async function getPushState(): Promise<PushState> {
  if (!isNative()) return { supported: false, permission: "unknown" };
  try {
    const { PushNotifications } = await import("@capacitor/push-notifications");
    const perm = await PushNotifications.checkPermissions();
    return { supported: true, permission: (perm.receive as PushState["permission"]) ?? "prompt" };
  } catch {
    return { supported: false, permission: "unknown" };
  }
}

export async function registerPush(): Promise<PushState> {
  if (!isNative()) return { supported: false, permission: "unknown" };
  const { PushNotifications } = await import("@capacitor/push-notifications");
  let perm = await PushNotifications.checkPermissions();
  if (perm.receive === "prompt" || perm.receive === "prompt-with-rationale") {
    perm = await PushNotifications.requestPermissions();
  }
  if (perm.receive !== "granted") {
    return { supported: true, permission: perm.receive as PushState["permission"] };
  }

  let token: string | undefined;
  await PushNotifications.removeAllListeners();
  PushNotifications.addListener("registration", (t) => {
    token = t.value;
    // eslint-disable-next-line no-console
    console.info("[push] device token:", t.value);
    try { localStorage.setItem("push.token", t.value); } catch {}
  });
  PushNotifications.addListener("registrationError", (e) => {
    // eslint-disable-next-line no-console
    console.error("[push] registration error:", e);
  });
  PushNotifications.addListener("pushNotificationReceived", (n) => {
    // eslint-disable-next-line no-console
    console.info("[push] received:", n);
  });
  PushNotifications.addListener("pushNotificationActionPerformed", (a) => {
    // eslint-disable-next-line no-console
    console.info("[push] action:", a);
  });

  await PushNotifications.register();
  return { supported: true, permission: "granted", token };
}
