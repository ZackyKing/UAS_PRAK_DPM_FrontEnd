import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {ActivityIndicator, Button, Dialog, PaperProvider, Portal, Text} from 'react-native-paper';
import API_URL from '@/config/config';

const ProfileScreen = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/profile`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setProfile(response.data.data);
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setDialogVisible(true);
    };

    const confirmLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/auth/LoginScreen');
    };

    if (loading) {
        return (
            <PaperProvider>
                <ThemedView style={styles.loadingContainer}>
                    <ActivityIndicator animating={true} color="#00CCDD" />
                </ThemedView>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <View style={styles.profileContainer}>
                    <ThemedText style={styles.title}>Profile</ThemedText>
                    {profile ? (
                        <View style={styles.infoCard}>
                            <View style={styles.infoContainer}>
                                <ThemedText style={styles.label}>Username:</ThemedText>
                                <ThemedText style={styles.value}>{profile.username}</ThemedText>
                            </View>
                            <View style={styles.infoContainer}>
                                <ThemedText style={styles.label}>Email:</ThemedText>
                                <ThemedText style={styles.value}>{profile.email}</ThemedText>
                            </View>
                        </View>
                    ) : (
                        <ThemedText style={styles.noDataText}>No profile data available</ThemedText>
                    )}
                    <Button
                        mode="contained"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                        buttonColor="#FF4D4D"
                        textColor="#ffffff"
                    >
                        Log Out
                    </Button>
                </View>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Logout</Dialog.Title>
                        <Dialog.Content>
                            <Text>Are you sure you want to logout?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
                            <Button onPress={confirmLogout}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F75FF',
    },
    profileContainer: {
        marginTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#4F75FF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    infoContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7CF5FF',
    },
    value: {
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 8,
    },
    noDataText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 32,
        alignSelf: 'center',
        backgroundColor: '#00CCDD',
    },
});

export default ProfileScreen;
