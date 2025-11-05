import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[(colorScheme ?? 'light') as keyof typeof Colors].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          backgroundColor: '#fff',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="arrow-forward-circle" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bills"
        options={{
          title: 'Bills',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="document-text" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="time" size={size || 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size || 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
