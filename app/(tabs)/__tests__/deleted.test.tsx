import React from 'react';
import { render } from '@testing-library/react-native'; // Import render from @testing-library/react-native
import { ArticlesList } from '@/components/articles-list.component';
import DeletedScreen from '../deleted';

// Mock ArticlesList to isolate DeletedScreen testing
jest.mock('@/components/articles-list.component', () => {
  const { Text } = require('react-native'); // Import Text inside the mock to avoid out-of-scope issue
  return {
    ArticlesList: jest.fn(({ type }: { type: string }) => (
      <Text testID="articles-list">Mocked ArticlesList - Type: {type}</Text> // Use Text component for React Native
    )),
  };
});

describe('DeletedScreen', () => {
  it('renders the ArticlesList component', () => {
    // Use render from @testing-library/react-native to render DeletedScreen
    const { toJSON, getByTestId } = render(<DeletedScreen />);

    // Verify that the ArticlesList component is rendered by checking for the testID
    const articlesListElement = getByTestId('articles-list');
    expect(articlesListElement).toBeTruthy(); // Ensure it exists in the output

    // Verify that the text inside the ArticlesList component is correct
    expect(articlesListElement.props.children.join('')).toBe(
      'Mocked ArticlesList - Type: deleted',
    );

    // Optionally, match the snapshot to verify UI consistency
    expect(toJSON()).toMatchSnapshot();
  });

  it('passes the correct "type" prop to ArticlesList', () => {
    render(<DeletedScreen />);

    // Verify that the mocked ArticlesList was called with the expected props
    expect(ArticlesList).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'deleted' }),
      {},
    );
  });

  it('displays the correct type in the ArticlesList', () => {
    const { getByTestId } = render(<DeletedScreen />);

    // Get the Text component with testID 'articles-list'
    const articlesListElement = getByTestId('articles-list');

    // Verify the rendered output contains the correct text
    expect(articlesListElement.props.children.join('')).toBe(
      'Mocked ArticlesList - Type: deleted',
    );
  });
});
