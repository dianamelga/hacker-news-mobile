import { ArticlesList } from '@/components/articles-list.component';
import EnableNotificationsModal from '@/components/enable-notifications-modal.component';
import { ThemedView } from '@/components/themed-view.component';
import { useHomeScreen } from '@/hooks/use-home.hook';
import React from 'react';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  const { modalIsVisible, hideModal } = useHomeScreen();

  return (
    <ThemedView style={styles.container} safeArea={false}>
      <ArticlesList type="all" />
      <EnableNotificationsModal
        testID={'enable-notifications-modal'}
        isVisible={modalIsVisible}
        hideModal={hideModal}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
