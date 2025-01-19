import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

// Warna tema
const themeColors = {
    light: {
        activeTintColor: '#6439FF',
        inactiveTintColor: '#4F75FF',
        iconColor: '#00CCDD',
        backgroundColor: '#7CF5FF',
    },
    dark: {
        activeTintColor: '#6439FF',
        inactiveTintColor: '#4F75FF',
        iconColor: '#00CCDD',
        backgroundColor: '#7CF5FF',
    },
};

// Konstanta gaya
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#7CF5FF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    icon: {
        width: 28,
        height: 28,
    },
});

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const currentTheme = themeColors[colorScheme ?? 'light'];

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: currentTheme.activeTintColor,
                tabBarInactiveTintColor: currentTheme.inactiveTintColor,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        backgroundColor: currentTheme.backgroundColor,
                    },
                    default: {
                        backgroundColor: currentTheme.backgroundColor,
                    },
                }),
            }}>
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, focused }) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            return {
                                transform: [{ scale: withSpring(focused ? 1.3 : 1) }],
                            };
                        });

                        return (
                            <Animated.View style={[styles.icon, animatedStyle]}>
                                <IconSymbol size={28} name="list.fill" color={color || currentTheme.iconColor} />
                            </Animated.View>
                        );
                    },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Todos',
                    tabBarIcon: ({ color, focused }) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            return {
                                transform: [{ scale: withSpring(focused ? 1.3 : 1) }],
                            };
                        });

                        return (
                            <Animated.View style={[styles.icon, animatedStyle]}>
                                <IconSymbol size={28} name="list.fill" color={color || currentTheme.iconColor} />
                            </Animated.View>
                        );
                    },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                }}
            />
            <Tabs.Screen
                name="posts"
                options={{
                    title: 'Posts',
                    tabBarIcon: ({ color, focused }) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            return {
                                transform: [{ scale: withSpring(focused ? 1.3 : 1) }],
                            };
                        });

                        return (
                            <Animated.View style={[styles.icon, animatedStyle]}>
                                <IconSymbol size={28} name="list.fill" color={color || currentTheme.iconColor} />
                            </Animated.View>
                        );
                    },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                title: 'Post Todos',
                tabBarIcon: ({ color, focused }) => {
                    const animatedStyle = useAnimatedStyle(() => {
                        return {
                            transform: [{ scale: withSpring(focused ? 1.3 : 1) }],
                        };
                    });

                    return (
                        <Animated.View style={[styles.icon, animatedStyle]}>
                            <IconSymbol size={28} name="list.fill" color={color || currentTheme.iconColor} />
                        </Animated.View>
                    );
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            return {
                                transform: [{ scale: withSpring(focused ? 1.3 : 1) }],
                            };
                        });

                        return (
                            <Animated.View style={[styles.icon, animatedStyle]}>
                                <IconSymbol size={28} name="person.fill" color={color || currentTheme.iconColor} />
                            </Animated.View>
                        );
                    },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
                }}
            />
        </Tabs>
    );
}
