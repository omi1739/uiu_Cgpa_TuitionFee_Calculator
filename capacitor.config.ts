import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.uiu.cgpa',
  appName: 'UIU CGPA Calculator',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#09090b",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      spinnerColor: "#f97316",
    },
  },
};

export default config;
