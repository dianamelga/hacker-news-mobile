import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';
import { ThemedText } from '@/components/themed-text.component';
import { PrimaryButton } from '@/components/themed-button.component';
import { themeColors } from '@/styles/colors';

interface Props {
  isVisible: boolean;
  hideModal: () => void;
}

const EnableNotificationsModal = ({ isVisible, hideModal }: Props) => {
  return (
    <Modal
      visible={isVisible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}
    >
      <ThemedText type="body" style={styles.content}>
        🔔 Enable your notifications to get up to date with latest news!
      </ThemedText>
      <PrimaryButton style={styles.button} onPress={hideModal}>
        Continue
      </PrimaryButton>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: themeColors.background,
    borderRadius: 10,
    padding: 20,
    width: '60%',
  },
  content: {
    fontSize: 20,
    paddingVertical: 30,
    textAlign: 'center',
  },
});

export default EnableNotificationsModal;
