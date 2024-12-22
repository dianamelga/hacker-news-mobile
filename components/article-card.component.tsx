import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './themed-view.component';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Article } from '@/models/HackerNews';
import { themeColors } from '@/styles/colors';
import { ThemedText } from './themed-text.component';

interface ArticleCardProps {
  article: Article;
  toggleFavorite?: (article: Article) => void;
  deleteItem?: (article: Article) => void;
}

const renderRightActions = (
  article: Article,
  deleteItem: (article: Article) => void,
) => {
  return (
    <ThemedView style={styles.deleteContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(article)}
      >
        <MaterialIcons color="white" size={23} name="delete" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  toggleFavorite,
  deleteItem,
}) => {
  return (
    <Swipeable
      renderRightActions={() =>
        deleteItem ? renderRightActions(article, deleteItem) : null
      }
    >
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <ThemedText type="h3" numberOfLines={2} style={styles.title}>
            {article.story_title || 'No Title'}
          </ThemedText>
          <ThemedText type="body" style={styles.author}>
            By: {article.author || 'Unknown Author'}
          </ThemedText>
          <ThemedText type="caption">
            {new Date(article.created_at).toLocaleDateString()}
          </ThemedText>
          {toggleFavorite && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite?.(article)}
            >
              <MaterialIcons
                name={article.is_favorite ? 'favorite' : 'favorite-border'}
                size={28}
                color={article.is_favorite ? themeColors.primary : 'gray'}
              />
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </Swipeable>
  );
};

const CARD_HEIGHT = 120;

const styles = StyleSheet.create({
  author: {
    marginBottom: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    flex: 1,
  },
  cardContent: {
    height: CARD_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: themeColors.error,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  deleteContainer: {
    alignItems: 'center',
    backgroundColor: themeColors.error,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    width: '30%',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    paddingRight: 16,
    position: 'absolute',
  },
  title: {
    marginBottom: 5,
    marginRight: 45,
  },
});

export default ArticleCard;
