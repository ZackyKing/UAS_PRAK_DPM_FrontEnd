import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
    ActivityIndicator,
    Button,
    Card,
    Dialog,
    FAB,
    Portal,
    Provider as PaperProvider,
    Text,
    TextInput
} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {useTodos} from '@/context/TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '@/config/config';
import Constants from "expo-constants/src/Constants";
import { MaterialIcons } from '@expo/vector-icons';

const TodosScreen = () => {
    const {todos, fetchTodos} = useTodos();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [completedTodos, setCompletedTodos] = useState({});
    const router = useRouter();

    useEffect(() => {
        const loadTodos = async () => {
            setLoading(true);
            await fetchTodos();
            setLoading(false);
        };
        loadTodos();
    }, []);

    const handleAddTodo = async () => {
        if (!title || !description) {
            setDialogMessage('Both title and description are required.');
            setDialogVisible(true);
            return;
        }
        try {
            const token = await AsyncStorage.getItem('token');
            const createdAt = new Date().toISOString(); // Add timestamp
            await axios.post(`${API_URL}/api/todos`, {
                title,
                description,
                createdAt
            }, {headers: {Authorization: `Bearer ${token}`} });
            fetchTodos();
            setTitle('');
            setDescription('');
            setIsAdding(false);
        } catch (error) {
            setDialogMessage('Failed to add todo');
            setDialogVisible(true);
        }
    };

    const handleToggleComplete = (id) => {
        setCompletedTodos((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.title} type="title">ToDo List</ThemedText>
                {loading ? (
                    <ActivityIndicator style={styles.loading} animating={true} color="#00CCDD" />
                ) : (
                    <FlatList
                        data={todos}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => (
                            <Card style={styles.card} mode="elevated">
                                <Card.Content style={styles.cardContent}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardDescription}>{item.description}</Text>
                                        <Text style={styles.timestamp}>Created on: {new Date(item.createdAt).toLocaleDateString()}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleToggleComplete(item._id)}>
                                        <MaterialIcons 
                                            name={completedTodos[item._id] ? "check-circle" : "radio-button-unchecked"} 
                                            size={24} 
                                            color={completedTodos[item._id] ? "#00FF00" : "#FFFFFF"} 
                                        />
                                    </TouchableOpacity>
                                </Card.Content>
                            </Card>
                        )}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </ThemedView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#6439FF',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#4F75FF',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    cardDescription: {
        fontSize: 14,
        color: '#7CF5FF',
        marginTop: 4,
    },
    timestamp: {
        fontSize: 12,
        color: '#fff',
        marginTop: 8,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#00CCDD',
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#4F75FF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#6439FF',
    },
    addButton: {
        marginTop: 12,
        backgroundColor: '#00CCDD',
    },
    cancelButton: {
        marginTop: 8,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TodosScreen;
