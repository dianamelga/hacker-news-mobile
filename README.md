# Hacker News Articles
![CI](https://github.com/dianamelga/hacker-news-mobile/actions/workflows/test.yml/badge.svg)

This app allows users to read and interact with Hacker News articles, with features including article fetching, offline access, push notifications, and more.

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/dianamelga/hacker-news-mobile
    ```

2. Install dependencies:
    ```bash
    npx expo install
    ```

3. Start the app:
    ```bash
    npx expo start
    ```

## Testing

To run both UI & Unit Tests, use the following command:

```bash
npx jest
```

## Features

### Core Functionality

- **Data Fetching**: Fetches articles related to Android/iOS from the Hacker News Algolia API on startup and pull-to-refresh.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/components/articles-list.component.tsx#L85)
  
- **Offline Access**: Displays articles from the last session when offline.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/services/api.ts#L9)
  
- **Article Viewing**: Articles are displayed in a scrollable view. Tapping an article opens it in an in-app web view.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/components/articles-list.component.tsx#L46)
  
- **Delete Functionality**: Users can swipe to delete articles. Deleted articles do not reappear on refresh.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/components/article-card.component.tsx#L41)

### Enhanced Features

- **Favorites**: Users can mark articles as favorites, viewable in a dedicated screen.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/(tabs)/favorites.tsx#L5)
  
- **Deleted Articles View**: View articles that have been deleted from the main list.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/(tabs)/deleted.tsx#L5)

### Push Notifications for New Articles

- **Push Notification Permission**: Requests permission on the first launch for sending push notifications.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/_layout.tsx#L43)

- **User Preferences**: Allows users to set preferences for notifications (e.g., only "Android" or "iOS" articles).  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/(screens)/settings.tsx#L16)

- **Background Fetch**: Periodically checks the API for new articles based on user preferences and sends push notifications when new articles match.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/_layout.tsx#L44)

- **Notification Interaction**: Tapping on a push notification opens the article in the app.  
  [View Code](https://github.com/dianamelga/hacker-news-mobile/blob/main/app/_layout.tsx#L50)



