// PostScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import API_URL from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostScreen = () => {
    const [content, setContent] = useState('');
    const [username, setUsername] = useState(''); // Menyimpan username
    const [postId, setPostId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Data dummy untuk postingan
    const [dummyPosts, setDummyPosts] = useState([
        {
            id: 1,
            user: "John Doe",
            username: "@johndoe",
            content: "This is a dummy post content.",
            timestamp: "11:30 PM / 21/03/2030",
            views: "987K Views",
            likes: 91000, // Ubah menjadi angka
            isLiked: false,
            comments: "45K",
            retweets: "82K",
        },
        {
            id: 2,
            user: "Jane Smith",
            username: "@janesmith",
            content: "Another dummy post with some different content!",
            timestamp: "2:30 PM / 22/03/2030",
            views: "750K Views",
            likes: 120000, // Ubah menjadi angka
            isLiked: false,
            comments: "30K",
            retweets: "50K",
        }
    ]);

    useEffect(() => {
        // Ambil username dari AsyncStorage saat komponen dimuat
        const getUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        };

        getUsername();
    }, []);

    const handlePost = async () => {
        if (!content.trim()) {
            alert("Please write something before posting.");
            return;
        }

        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Kirim token di header
                },
                body: JSON.stringify({
                    user: 'user_id_here',  // Ganti dengan user yang sedang login
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const newPost = await response.json();
            setPostId(newPost._id);
            setContent('');
            alert("Post created successfully!");
        } catch (error) {
            console.error('Error creating post:', error);
            alert("Failed to create post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk menangani toggle Like
    const handleLikeToggle = (postId: number) => {
        setDummyPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
                    : post
            )
        );
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/50' }} />
                <View>
                    <Text style={styles.name}>{username || 'profile.username'}</Text>
                    <Text style={styles.username}>@{username || 'UserNameHere'}</Text>
                </View>
            </View>

            {/* Content */}
            <TextInput
                style={styles.contentInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#ccc"
                value={content}
                onChangeText={setContent}
                multiline
            />

            {/* Post Button */}
            <TouchableOpacity
                style={styles.postButton}
                onPress={handlePost}
                disabled={isLoading}
            >
                <Text style={styles.postButtonText}>{isLoading ? "Posting..." : "Post"}</Text>
            </TouchableOpacity>

            {/* Dummy Posts */}
            <ScrollView style={styles.scrollView}>
                {dummyPosts.map(post => (
                    <View key={post.id} style={styles.postCard}>
                        <View style={styles.header}>
                            <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/50' }} />
                            <View>
                                <Text style={styles.name}>{post.user}</Text>
                                <Text style={styles.username}>{post.username}</Text>
                            </View>
                        </View>

                        <Text style={styles.content}>{post.content}</Text>

                        <Text style={styles.timestamp}>{post.timestamp} · {post.views}</Text>

                        <View style={styles.actions}>
                            <View style={styles.action}>
                                <FontAwesome name="retweet" size={18} color="#00CCDD" />
                                <Text style={styles.actionText}>{post.retweets}</Text>
                            </View>
                            <View style={styles.action}>
                                <Feather name="message-circle" size={18} color="#4F75FF" />
                                <Text style={styles.actionText}>{post.comments}</Text>
                            </View>
                            <View style={styles.action}>
                                <TouchableOpacity onPress={() => handleLikeToggle(post.id)}>
                                    <FontAwesome name="heart" size={18} color={post.isLiked ? "#FF4D4D" : "#ccc"} />
                                </TouchableOpacity>
                                <Text style={styles.actionText}>{post.likes}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6439FF',
    },
    username: {
        fontSize: 14,
        color: '#7C7C7C',
    },
    contentInput: {
        fontSize: 14,
        color: '#4F75FF',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#00CCDD',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#F9F9F9',
    },
    postButton: {
        backgroundColor: '#6439FF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    postButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: 20,
    },
    postCard: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    content: {
        fontSize: 14,
        color: '#4F75FF',
        marginBottom: 12,
    },
    timestamp: {
        fontSize: 12,
        color: '#A1A1A1',
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 12,
        color: '#4F75FF',
        marginLeft: 4,
    },
});

export default PostScreen;
