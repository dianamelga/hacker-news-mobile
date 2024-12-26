# Hacker News Articles
![CI](https://github.com/dianamelga/hacker-news-mobile/actions/workflows/test.yml/badge.svg)

This app allows users to read and interact with Hacker News articles, with features including article fetching, offline access, push notifications, and more.

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dianamelga/hacker-news-mobile
    ```

2. Copy the `google-services.json` file provided on the email and paste it on the repository root as well

3. Install dependencies:
    ```bash
    npx expo install
    ```

4. Run on ios or android:
    ```bash
    npx expo run:android 
    npx expo run:ios
    ```

## Testing

To run both UI & Unit Tests, use the following command:

```bash
npx jest
```

## Features

### Core Functionality

- **[Data Fetching](https://github.com/dianamelga/hacker-news-mobile/blob/main/components/articles-list.component.tsx#L85)**: Fetches articles related to Android/iOS from the Hacker News Algolia API on startup and pull-to-refresh.  
  
- **[Offline Access](https://github.com/dianamelga/hacker-news-mobile/blob/main/services/api.ts#L9)**: Displays articles from the last session when offline.  
  
- **[Article Viewing](https://github.com/dianamelga/hacker-news-mobile/blob/main/components/articles-list.component.tsx#L46)**: Articles are displayed in a scrollable view. Tapping an article opens it in an in-app web view.  
  
- **[Delete Functionality](https://github.com/dianamelga/hacker-news-mobile/blob/main/components/article-card.component.tsx#L41)**: Users can swipe to delete articles. Deleted articles do not reappear on refresh.  

### Enhanced Features

- **[Favorites](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/(tabs)/favorites.tsx#L5)**: Users can mark articles as favorites, viewable in a dedicated screen.  

- **[Deleted Articles View](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/(tabs)/deleted.tsx#L5)**: View articles that have been deleted from the main list.  

### Push Notifications for New Articles

- **[Push Notification Permission](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/_layout.tsx#L43)**: Requests permission on the first launch for sending push notifications.  

- **[User Preferences](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/(screens)/settings.tsx#L16)**: Allows users to set preferences for notifications (e.g., only "Android" or "iOS" articles).  

- **[Background Fetch](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/_layout.tsx#L44)**: Periodically checks the API for new articles based on user preferences and sends push notifications when new articles match.  

- **[Notification Interaction](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/_layout.tsx#L50)**: Tapping on a push notification opens the article in the app.  


## Tools and Libraries Used in the App

### Networking
- **Custom API Layer**: Built with TypeScript to interact with external APIs (`services/api.ts`, `services/hacker-news-api.ts`).
- Used **`axios`** for HTTP requests.

### Local Storage
- **AsyncStorage**: Utilized via `utils/storage.ts` for persistent data storage (e.g., user preferences, cached articles).

### UI & Unit Testing
- **Jest**: Framework used for writing unit tests (e.g., `services/__tests__`, `app/(screens)/__tests__`, `app/(tabs)/__tests__`).
- **React Testing Library**: For testing React components and custom hooks.

### Threading / Background Tasks
- **expo-task-manager**: Used for background processing, such as fetching data and handling notifications (`services/background-task-service.ts`).
- **expo-background-fetch**: For scheduling and executing background tasks.

### UI Framework
- **React Native Components**: Base framework for building app UI.
- **Expo Router**: For navigation and routing (`app/(screens)`, `app/(tabs)`).
- **Custom Components**: Tailored components for the app, such as:
  - `components/article-card.component.tsx`
  - `components/articles-list.component.tsx`
  - and more
- **Expo Font**: Used for custom typography (loading fonts like `Nunito`).

### Dependency Injection (DI)
- **Context API**: Used for state management and dependency injection:
  - `context/articles-context.tsx`
  - `context/preferences-context.tsx`

### Notifications
- **expo-notifications**: Handles push notifications:
  - Receiving notifications (`utils/push-notifications.ts`).
  - Managing notification preferences (`models/notification-preference.ts`).

### Development Tools
- **Expo CLI**: For building and managing the app.
- **EAS Build**: For configuring and managing builds (`eas.json`).

### Other Utilities
- **Custom Hooks**: To enhance reusability and manage app-specific logic:
  - `hooks/use-articles-manager.hook.ts`
  - `hooks/use-preferences.hook.ts`

---

This list details the tools and libraries utilized in the development of this Expo app. Each library or tool serves a specific purpose, contributing to features like background tasks, push notifications, UI enhancements, and robust testing.