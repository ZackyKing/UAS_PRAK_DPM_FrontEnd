import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Untuk navigasi
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Mendapatkan ukuran layar untuk grafik
const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const navigation = useNavigation(); // Hook untuk navigasi antar tab

  const navigateToTab = (tabName: string) => {
    navigation.navigate(tabName); // Mengarahkan ke tab yang sesuai
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, User!</Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <FontAwesome name="list" size={30} color="#6439FF" />
          <Text style={styles.statText}>100</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome name="heart" size={30} color="#FF4D4D" />
          <Text style={styles.statText}>50</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="post-add" size={30} color="#4F75FF" />
          <Text style={styles.statText}>30</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Completed Task: "Finish Project"</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>New Post: "My First Post"</Text>
          <Text style={styles.activityTime}>5 hours ago</Text>
        </View>
      </View>

      {/* Graph */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Activity Growth</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [
              {
                data: [20, 30, 50, 80, 100],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(100, 57, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </View>

      {/* Quick Access Links */}
      <View style={styles.quickAccessContainer}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigateToTab('index')}>
          <Text style={styles.quickAccessText}>Go to Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem} onPress={() => navigateToTab('profile')}>
          <Text style={styles.quickAccessText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#6439FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  recentActivityContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  activityText: {
    fontSize: 16,
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#aaa',
  },
  chartContainer: {
    marginBottom: 20,
  },
  quickAccessContainer: {
    marginTop: 20,
  },
  quickAccessItem: {
    backgroundColor: '#6439FF',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DashboardScreen;
