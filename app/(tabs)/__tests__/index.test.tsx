import React from 'react';
import { render } from '@testing-library/react-native'; // Import render from @testing-library/react-native
import { ArticlesList } from '@/components/articles-list.component';
import HomeScreen from '..';

// Mock ArticlesList to isolate HomeScreen testing
jest.mock('@/components/articles-list.component', () => {
  const { Text } = require('react-native'); // Import Text inside the mock to avoid out-of-scope issue
  return {
    ArticlesList: jest.fn(({ type }: { type: string }) => (
      <Text testID="articles-list">Mocked ArticlesList - Type: {type}</Text> // Use Text component for React Native
    )),
  };
});

jest.mock('@/utils/storage', () => ({
  loadLocalData: jest.fn(),
  saveLocalData: jest.fn(),
}));

describe('HomeScreen', () => {
  it('renders the ArticlesList component', () => {
    // Use render from @testing-library/react-native to render HomeScreen
    const { toJSON, getByTestId } = render(<HomeScreen />);

    // Verify that the ArticlesList component is rendered by checking for the testID
    const articlesListElement = getByTestId('articles-list');
    expect(articlesListElement).toBeTruthy(); // Ensure it exists in the output

    // Verify that the text inside the ArticlesList component is correct
    expect(articlesListElement.props.children.join('')).toBe(
      'Mocked ArticlesList - Type: all',
    );

    // Optionally, match the snapshot to verify UI consistency
    expect(toJSON()).toMatchSnapshot();
  });

  it('passes the correct "type" prop to ArticlesList', () => {
    render(<HomeScreen />);

    // Verify that the mocked ArticlesList was called with the expected props
    expect(ArticlesList).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'all' }),
      {},
    );
  });

  it('displays the correct type in the ArticlesList', () => {
    const { getByTestId } = render(<HomeScreen />);

    // Get the Text component with testID 'articles-list'
    const articlesListElement = getByTestId('articles-list');

    // Verify the rendered output contains the correct text
    expect(articlesListElement.props.children.join('')).toBe(
      'Mocked ArticlesList - Type: all',
    );
  });
});
