# Welcome to your Lovable project

TODO: Document your project here

## Native iOS / Android (Capacitor)

This project ships with a Capacitor wrapper. To run on a real device or simulator:

1. Export to GitHub via the Lovable "Export to Github" button, then `git pull`.
2. `npm install`
3. `npx cap add ios` and/or `npx cap add android`
4. `npm run build`
5. `npx cap sync`
6. Run on device:
   - iOS: `npx cap run ios` (requires macOS + Xcode)
   - Android: `npx cap run android` (requires Android Studio)

The app is configured to hot-reload from the Lovable sandbox URL — you can iterate
in Lovable and see changes live in the native shell.

### Push notifications
The Settings → Notifications toggle requests permission and registers with APNs/FCM.
To actually deliver notifications you need an Apple Developer account (APNs key) for iOS
and a Firebase project (`google-services.json`) for Android.

### Installable web (PWA)
On any browser, visit `/install` for instructions. iOS: Share → Add to Home Screen.
Android/Chrome: tap the Install button.
