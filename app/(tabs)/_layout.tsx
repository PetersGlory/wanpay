import { Tabs } from 'expo-router';
import React from "react";
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { PRIMARY_COLOR } from "@/constants/customConstants";

export default function TabLayout() {
  const tintColor = PRIMARY_COLOR;

  // Modern glassmorphic/tab pill/rounded tabs style
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
          letterSpacing: 0.15,
          marginBottom: 2,
        },
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          // bottom: 25,
          // elevation: 25,
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderRadius: 28,
          borderTopWidth: 0,
          shadowColor: '#6d28d9',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 36,
          height: 70,
          paddingBottom: 6,
        },
        tabBarItemStyle: {
          marginVertical: 6,
          borderRadius: 20,
        },
        tabBarIconStyle: {
          marginBottom: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? 'rgba(109,40,217,0.1)' : 'transparent',
                borderRadius: 12,
                padding: 2.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "arrow-forward-circle" : "arrow-forward-circle-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? 'rgba(16,185,129,0.08)' : 'transparent',
                borderRadius: 12,
                padding: 2.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bills"
        options={{
          title: 'Bills',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? 'rgba(249,115,22,0.09)' : 'transparent',
                borderRadius: 12,
                padding: 2.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? 'rgba(55,65,81,0.09)' : 'transparent',
                borderRadius: 12,
                padding: 2.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="grants"
        options={{
          title: 'Growth',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "trending-up" : "trending-up-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? 'rgba(67,56,202,0.1)' : 'transparent',
                borderRadius: 12,
                padding: 2.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? 'rgba(253,186,116,0.10)' : 'transparent',
                borderRadius: 12,
                padding: 2.5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
