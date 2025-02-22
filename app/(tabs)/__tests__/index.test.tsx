import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '..';
import { useFirstLaunch } from '@/hooks/use-app-boot';

// Mock dependencies
jest.mock('@/hooks/use-home.hook', () => ({
  useHomeScreen: jest.fn(),
}));

jest.mock('@/components/articles-list.component', () => {
  const { View } = require('react-native');
  return {
    ArticlesList: jest.fn(() => <View testID="articles-list" />), // Mocked ArticlesList component
  };
});

jest.mock('@/components/enable-notifications-modal.component', () => {
  const { Text, TouchableOpacity } = require('react-native');
  return {
    __esModule: true,
    default: ({
      isVisible,
      hideModal,
      testID,
    }: {
      isVisible: boolean;
      hideModal: () => void;
      testID: string;
    }) =>
      isVisible ? (
        <TouchableOpacity testID={testID} onPress={hideModal}>
          <Text>Mocked Modal</Text>
        </TouchableOpacity>
      ) : null,
  };
});

describe('HomeScreen', () => {
  it('renders the main components correctly', () => {
    // Mock the hook's return values
    (useFirstLaunch as jest.Mock).mockReturnValue({
      modalIsVisible: false,
      hideModal: jest.fn(),
    });

    const { getByTestId, queryByTestId } = render(<HomeScreen />);

    // Check that the ThemedView and ArticlesList components are rendered
    expect(getByTestId('themed-view')).toBeTruthy();
    expect(getByTestId('articles-list')).toBeTruthy();

    // Check that the modal is not visible initially
    expect(queryByTestId('enable-notifications-modal')).toBeNull();
  });

  it('shows and hides the modal correctly', () => {
    const hideModalMock = jest.fn();

    (useFirstLaunch as jest.Mock).mockReturnValue({
      modalIsVisible: true,
      hideModal: hideModalMock,
    });

    const { getByTestId } = render(<HomeScreen />);

    // Check that the modal is visible
    const modal = getByTestId('enable-notifications-modal');
    expect(modal).toBeTruthy();

    // Simulate hiding the modal
    fireEvent.press(modal);
    expect(hideModalMock).toHaveBeenCalledTimes(1);
  });
});
