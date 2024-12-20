import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ArticleCardProps {
    title: string;
    author: string;
    createdAt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, author, createdAt }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.author}>By: {author || 'Unknown Author'}</Text>
                <Text style={styles.date}>{new Date(createdAt).toLocaleDateString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        marginVertical: 10,
        marginHorizontal: 15,
        overflow: 'hidden',
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    author: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
});

export default ArticleCard;
