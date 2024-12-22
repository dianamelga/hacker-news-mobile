import { ThemedText } from '@/components/themed-text.component';
import { ThemedView } from '@/components/themed-view.component';
import { useSettingsScreen } from '@/hooks/use-settings.hook';
import { NotificationPreference } from '@/models/notification-preference';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Switch } from 'react-native-paper';

const SettingsScreen = () => {
  const { notificationPrefs, togglePreference } = useSettingsScreen();

  const ItemSettings = ({ item }: { item: NotificationPreference }) => (
    <View style={styles.topicRow}>
      <ThemedText type="body">{item.topic}</ThemedText>
      <Switch
        value={item.notificationsEnabled}
        onValueChange={() => togglePreference(item)}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container} safeArea={false}>
      <FlatList
        data={notificationPrefs}
        keyExtractor={(item) => item.topic}
        renderItem={ItemSettings}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  topicRow: {
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
});
