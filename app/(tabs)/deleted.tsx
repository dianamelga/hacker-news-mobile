import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

const DeletedScreen = () => {

    return <ThemedView style={styles.container}>
        <ThemedText>Deleted Screen</ThemedText>
    </ThemedView>
};

export default DeletedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
