module.exports = {
  expo: {
    name: 'hacker-news-mobile',
    slug: 'hacker-news-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.dianascode.hackernewsmobile',
      infoPlist: {
        UIBackgroundModes: ['fetch', 'remote-notification'],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.dianascode.hackernewsmobile',
      googleServicesFile: './android/app/google-services.json',
      permissions: [
        'READ_PHONE_STATE',
        'READ_PRIVILEGED_PHONE_STATE',
        'RECEIVE_BOOT_COMPLETED',
        'SCHEDULE_EXACT_ALARM',
      ],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-background-fetch',
      'expo-task-manager',
      'expo-router',
      [
        'expo-notifications',
        {
          icon: './assets/images/notification-icon.png',
          color: '#ffffff',
          mode: 'production',
        },
      ],
      [
        'expo-font',
        {
          fonts: [
            './assets/fonts/Nunito-Black.ttf',
            './assets/fonts/Nunito-Bold.ttf',
            './assets/fonts/Nunito-ExtraBold.ttf',
            './assets/fonts/Nunito-Light.ttf',
            './assets/fonts/Nunito-Regular.ttf',
            './assets/fonts/Nunito-SemiBold.ttf',
          ],
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'a9133d53-dfaf-4079-9296-3fe713e4680c',
      },
    },
    owner: 'dianamelga',
  },
};
