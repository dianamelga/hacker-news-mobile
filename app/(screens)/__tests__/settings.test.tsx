import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'; // Import testing utilities
import SettingsScreen from '@/app/(screens)/settings'; // Adjust the import path as needed
import { useSettingsScreen } from '@/hooks/use-settings.hook';
import { NotificationPreference } from '@/models/notification-preference';

// Mock the `useSettingsScreen` hook to control the notification preferences
jest.mock('@/hooks/use-settings.hook', () => ({
  useSettingsScreen: jest.fn(),
}));

describe('SettingsScreen', () => {
  it('renders notification preferences correctly', () => {
    // Mock the notification preferences
    const mockNotificationPrefs: NotificationPreference[] = [
      { topic: 'Topic 1', notificationsEnabled: true },
      { topic: 'Topic 2', notificationsEnabled: false },
    ];

    // Mock the hook to return the mocked preferences
    (useSettingsScreen as jest.Mock).mockReturnValue({
      notificationPrefs: mockNotificationPrefs,
      togglePreference: jest.fn(),
    });

    const { getByText, getAllByTestId } = render(<SettingsScreen />);

    // Check if the topics are rendered correctly
    expect(getByText('Topic 1')).toBeTruthy();
    expect(getByText('Topic 2')).toBeTruthy();

    // Ensure that there are Switch components for each item
    const switches = getAllByTestId('switch');
    expect(switches.length).toBe(mockNotificationPrefs.length);
  });

  it('toggles the switch and calls the togglePreference function', () => {
    // Mock the notification preferences
    const mockNotificationPrefs: NotificationPreference[] = [
      { topic: 'Topic 1', notificationsEnabled: true },
      { topic: 'Topic 2', notificationsEnabled: false },
    ];

    // Mock the hook to return the mocked preferences and a mock toggle function
    const mockTogglePreference = jest.fn();
    (useSettingsScreen as jest.Mock).mockReturnValue({
      notificationPrefs: mockNotificationPrefs,
      togglePreference: mockTogglePreference,
    });

    const { getAllByTestId } = render(<SettingsScreen />);

    // Get the first switch element
    const switches = getAllByTestId('switch');
    const firstSwitch = switches[0];

    // Simulate the toggle action
    fireEvent(firstSwitch, 'valueChange', false);

    // Verify that the togglePreference function was called with the correct argument
    expect(mockTogglePreference).toHaveBeenCalledWith(mockNotificationPrefs[0]);
  });

  it('renders the correct value of the switch based on preferences', () => {
    // Mock the notification preferences with specific values
    const mockNotificationPrefs: NotificationPreference[] = [
      { topic: 'Topic 1', notificationsEnabled: true },
      { topic: 'Topic 2', notificationsEnabled: false },
    ];

    // Mock the hook to return the mocked preferences
    (useSettingsScreen as jest.Mock).mockReturnValue({
      notificationPrefs: mockNotificationPrefs,
      togglePreference: jest.fn(),
    });

    const { getAllByTestId } = render(<SettingsScreen />);

    // Get the switch elements
    const switches = getAllByTestId('switch');

    // Check that the switches are in the correct state based on the notification preferences
    expect(switches[0].props.value).toBe(true); // First switch should be ON
    expect(switches[1].props.value).toBe(false); // Second switch should be OFF
  });
});
