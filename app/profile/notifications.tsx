import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
  category: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      icon: 'notifications-outline',
      color: '#2563eb',
      enabled: true,
      category: 'general',
    },
    {
      id: '2',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: 'mail-outline',
      color: '#7c3aed',
      enabled: true,
      category: 'general',
    },
    {
      id: '3',
      title: 'SMS Notifications',
      description: 'Receive notifications via SMS',
      icon: 'chatbubble-outline',
      color: '#10b981',
      enabled: false,
      category: 'general',
    },
    {
      id: '4',
      title: 'Transaction Alerts',
      description: 'Get notified for all transactions',
      icon: 'cash-outline',
      color: '#f59e0b',
      enabled: true,
      category: 'transactions',
    },
    {
      id: '5',
      title: 'Payment Reminders',
      description: 'Reminders for scheduled payments',
      icon: 'alarm-outline',
      color: '#ef4444',
      enabled: true,
      category: 'transactions',
    },
    {
      id: '6',
      title: 'Bill Payment Alerts',
      description: 'Notifications for bill payments',
      icon: 'document-text-outline',
      color: '#06b6d4',
      enabled: true,
      category: 'transactions',
    },
    {
      id: '7',
      title: 'Balance Updates',
      description: 'Get notified when your balance changes',
      icon: 'wallet-outline',
      color: '#84cc16',
      enabled: true,
      category: 'account',
    },
    {
      id: '8',
      title: 'Security Alerts',
      description: 'Important security and login notifications',
      icon: 'shield-checkmark-outline',
      color: '#dc2626',
      enabled: true,
      category: 'account',
    },
    {
      id: '9',
      title: 'Promotional Notifications',
      description: 'Receive offers, promotions and updates',
      icon: 'megaphone-outline',
      color: '#ec4899',
      enabled: false,
      category: 'marketing',
    },
    {
      id: '10',
      title: 'Grant Opportunities',
      description: 'Notifications about new grant opportunities',
      icon: 'trophy-outline',
      color: '#8b5cf6',
      enabled: true,
      category: 'marketing',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map((setting) =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const categories = [
    { id: 'general', name: 'General', icon: 'settings-outline' },
    { id: 'transactions', name: 'Transactions', icon: 'swap-horizontal-outline' },
    { id: 'account', name: 'Account', icon: 'person-outline' },
    { id: 'marketing', name: 'Marketing', icon: 'megaphone-outline' },
  ];

  const getCategorySettings = (categoryId: string) => {
    return settings.filter((setting) => setting.category === categoryId);
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-gray-50`}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw`px-3 py-4 border-b border-gray-100 bg-white`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <View>
              <Text style={tw`text-xl font-bold text-gray-900`}>Notifications</Text>
              <Text style={tw`text-xs text-gray-500`}>Manage your notification preferences</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Notification Status */}
        <View style={tw`bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="notifications" size={24} color="#2563eb" />
            <Text style={tw`text-blue-900 font-bold text-lg ml-3`}>Notification Settings</Text>
          </View>
          <Text style={tw`text-blue-700 text-sm`}>
            Customize how and when you receive notifications. Stay informed about your account activity.
          </Text>
        </View>

        {/* Notification Categories */}
        {categories.map((category) => {
          const categorySettings = getCategorySettings(category.id);
          return (
            <View key={category.id} style={tw`mb-6`}>
              <View style={tw`flex-row items-center mb-3`}>
                <Ionicons name={category.icon as any} size={18} color="#6b7280" />
                <Text style={tw`text-sm font-semibold text-gray-500 uppercase ml-2`}>
                  {category.name}
                </Text>
              </View>
              <View style={tw`bg-white border border-gray-100 rounded-2xl shadow-sm`}>
                {categorySettings.map((setting, index) => (
                  <View
                    key={setting.id}
                    style={tw`flex-row justify-between items-center px-5 py-4 ${index !== categorySettings.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <View style={tw`flex-row items-center flex-1`}>
                      <View style={tw`bg-blue-50 w-10 h-10 rounded-full items-center justify-center mr-3`}>
                        <Ionicons name={setting.icon as any} size={20} color={setting.color} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-gray-900 font-semibold`}>{setting.title}</Text>
                        <Text style={tw`text-gray-500 text-xs mt-1`}>{setting.description}</Text>
                      </View>
                    </View>
                    <Switch
                      value={setting.enabled}
                      onValueChange={() => toggleSetting(setting.id)}
                      trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                      thumbColor="#fff"
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* Quiet Hours */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Quiet Hours</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between mb-3`}>
              <View>
                <Text style={tw`text-gray-900 font-semibold`}>Do Not Disturb</Text>
                <Text style={tw`text-gray-500 text-xs mt-1`}>Mute notifications during quiet hours</Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                thumbColor="#fff"
              />
            </View>
            <View style={tw`bg-gray-50 rounded-xl p-3`}>
              <Text style={tw`text-gray-600 text-sm`}>10:00 PM - 7:00 AM</Text>
            </View>
          </View>
        </View>

        {/* Notification History */}
        <TouchableOpacity
          style={tw`bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm`}
          activeOpacity={0.7}
        >
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`bg-blue-50 w-10 h-10 rounded-full items-center justify-center mr-3`}>
                <Ionicons name="time-outline" size={20} color="#2563eb" />
              </View>
              <View>
                <Text style={tw`text-gray-900 font-semibold`}>Notification History</Text>
                <Text style={tw`text-gray-500 text-xs mt-1`}>View all past notifications</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </View>
        </TouchableOpacity>

        {/* Info Card */}
        <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="information-circle" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-900 font-semibold ml-2`}>Notification Tips</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Enable transaction alerts to stay informed about your account activity
          </Text>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Security alerts are always enabled for your protection
          </Text>
          <Text style={tw`text-xs text-gray-600`}>
            • You can customize notification preferences anytime
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

