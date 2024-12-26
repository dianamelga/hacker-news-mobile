import React from 'react';
import { render } from '@testing-library/react-native'; // Import render from @testing-library/react-native
import ArticleDetailScreen from '@/app/(screens)/article-detail'; // Adjust the path as needed
import { useLocalSearchParams } from 'expo-router';

// Mock the `useLocalSearchParams` hook to control the URL passed as a parameter
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock('react-native-webview', () => {
  const { Text } = require('react-native'); // Import Text to return it in the mock

  return {
    WebView: ({
      testID = 'webview',
      source,
    }: {
      testID?: string;
      source: { uri: string };
    }) => {
      return (
        <Text testID={testID}>{source ? source.uri : 'No URL provided'}</Text>
      );
    },
  };
});

describe('ArticleDetailScreen', () => {
  it('renders the WebView with the provided article URL', () => {
    // Mock the `useLocalSearchParams` hook to return a valid URL
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      articleUrl: 'https://example.com',
    });

    const { getByTestId } = render(<ArticleDetailScreen />);

    // Check that the WebView is rendered with the correct source URL
    const webView = getByTestId('webview');
    expect(webView.props.children).toBe('https://example.com');
  });

  it('renders a message when no article URL is provided', () => {
    // Mock the `useLocalSearchParams` hook to return an empty URL
    (useLocalSearchParams as jest.Mock).mockReturnValue({});

    const { getByText } = render(<ArticleDetailScreen />);

    // Check that the message "No article URL provided!" is rendered
    expect(getByText('No article URL provided!')).toBeTruthy();
  });
});
