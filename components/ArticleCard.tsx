import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Article } from '@/models/HackerNews';
import { themeColors } from '@/styles/colors';
import typography from '@/styles/typography';

interface ArticleCardProps {
    article: Article,
    toggleFavorite?: (article: Article) => void;
    deleteItem?: (article: Article) => void;
}

const renderRightActions = (article: Article, deleteItem: (article: Article) => void) => {
    return (
        <ThemedView style={styles.deleteContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(article)}>
                <MaterialIcons color="white" size={23} name="delete" />
            </TouchableOpacity>
        </ThemedView>
    );
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, toggleFavorite, deleteItem }) => {
    return (
        <Swipeable
            renderRightActions={() => deleteItem ? renderRightActions(article, deleteItem) : null}
        >
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title} numberOfLines={2}>
                        {article.story_title || 'No Title'}
                    </Text>
                    <Text style={styles.author}>By: {article.author || 'Unknown Author'}</Text>
                    <Text style={styles.date}>{new Date(article.created_at).toLocaleDateString()}</Text>
                    {toggleFavorite &&
                        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite?.(article)}>
                            <MaterialIcons
                                name={article.is_favorite ? 'favorite' : 'favorite-border'}
                                size={28}
                                color={article.is_favorite ? themeColors.primary : 'gray'}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </Card>
        </Swipeable>
    );
};

const CARD_HEIGHT = 100;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
    },
    cardContent: {
        paddingHorizontal: 15,
        overflow: 'hidden',
        height: CARD_HEIGHT,
        justifyContent: 'center'
    },
    title: {
        marginBottom: 5,
        ...typography.heading3,
    },
    author: {
        marginBottom: 5,
        ...typography.body,
    },
    date: {
        ...typography.caption,
    },
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.error,
        height: CARD_HEIGHT,
        width: '30%',
    },
    deleteButton: {
        backgroundColor: themeColors.error,
        justifyContent: 'center',
        alignItems: 'center',
        height: CARD_HEIGHT,
        paddingBottom: 20,
        width: '100%',
    },
    favoriteButton: {
        paddingRight: 16,
        position: 'absolute',
        alignSelf: 'flex-end'
    },
});

export default ArticleCard;
