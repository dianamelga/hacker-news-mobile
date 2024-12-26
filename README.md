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


