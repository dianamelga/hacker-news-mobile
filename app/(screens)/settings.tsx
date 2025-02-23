import { PrimaryButton } from '@/components/themed-button.component';
import { ThemedText } from '@/components/themed-text.component';
import { ThemedView } from '@/components/themed-view.component';
import { useSettingsScreen } from '@/hooks/use-settings.hook';
import { NotificationPreference } from '@/models/notification-preference';
import { themeColors } from '@/styles/colors';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Switch } from 'react-native-paper';

const SettingsScreen = () => {
  const { notificationPrefs, togglePreference, notifyAboutNewArticles } =
    useSettingsScreen();

  const ItemSettings = ({ item }: { item: NotificationPreference }) => (
    <View style={styles.topicRow}>
      <ThemedText type="body">{item.topic}</ThemedText>
      <Switch
        testID="switch"
        value={item.notificationsEnabled}
        onValueChange={() => togglePreference(item)}
        color={themeColors.primary}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container} safeArea={false}>
      <ThemedText type="h2" style={styles.title}>
        Receive alerts about the following topics:
      </ThemedText>
      <FlatList
        data={notificationPrefs}
        keyExtractor={(item) => item.topic}
        renderItem={ItemSettings}
        contentContainerStyle={styles.listContainer}
      />
      <PrimaryButton
        style={styles.notifyButton}
        onPress={notifyAboutNewArticles}
      >
        Notify About New Articles If Any
      </PrimaryButton>
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    gap: 20,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  notifyButton: {
    marginBottom: 30,
  },
  title: { textAlign: 'center' },
  topicRow: {
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
});
