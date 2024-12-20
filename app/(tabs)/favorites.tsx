import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

const FavoritesScreen = () => {

    return <ThemedView style={styles.container}>
        <ThemedText>FavoritesScreen Screen</ThemedText>
    </ThemedView>
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
