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
  
- **[Offline Access](https://github.com/dianamelga/hacker-news-mobile/blob/main/context/articles-context.tsx#L66)**: Displays articles from the last session when offline.  
  
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
- **Networking**: `axios` and `axios-cache-interceptor`
- **Local Storage**: `@react-native-async-storage/async-storage`
- **UI & Unit Testing**: `jest-expo`
- **Background Tasks**: `expo-task-manager` for background processing and `expo-background-fetch` For scheduling and executing background tasks
- **UI**: React native framework and `react-native-paper` to re-use material components
- **Navigation**: `expo-router`
- **Fonts**: `expo-font`
- **DI**: React Native Context API
- **Notifications**: `expo-notifications`
- **CI/CD**: GithubActions (for now just linting and testing, but we can also add a workflow for deployment to playstore/testflight)

## Demo



https://github.com/user-attachments/assets/18b0a7ff-4fb3-46a2-a2a2-0ffc156973bf




https://github.com/user-attachments/assets/be7be424-e712-404a-9f01-af865c343210



