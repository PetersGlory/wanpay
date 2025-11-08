import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

interface Limit {
  id: string;
  type: string;
  current: string;
  max: string;
  icon: string;
  color: string;
  description: string;
}

export default function TransactionLimitsScreen() {
  const router = useRouter();
  const [limits, setLimits] = useState<Limit[]>([
    {
      id: '1',
      type: 'Daily Transfer Limit',
      current: '₦500,000',
      max: '₦5,000,000',
      icon: 'arrow-forward-circle',
      color: '#2563eb',
      description: 'Maximum amount you can transfer per day',
    },
    {
      id: '2',
      type: 'Monthly Transfer Limit',
      current: '₦10,000,000',
      max: '₦50,000,000',
      icon: 'calendar-outline',
      color: '#7c3aed',
      description: 'Maximum amount you can transfer per month',
    },
    {
      id: '3',
      type: 'Single Transaction Limit',
      current: '₦1,000,000',
      max: '₦10,000,000',
      icon: 'cash-outline',
      color: '#10b981',
      description: 'Maximum amount for a single transaction',
    },
    {
      id: '4',
      type: 'Daily Bill Payment Limit',
      current: '₦200,000',
      max: '₦1,000,000',
      icon: 'document-text-outline',
      color: '#f59e0b',
      description: 'Maximum amount for bill payments per day',
    },
    {
      id: '5',
      type: 'ATM Withdrawal Limit',
      current: '₦300,000',
      max: '₦1,500,000',
      icon: 'card-outline',
      color: '#ef4444',
      description: 'Maximum amount you can withdraw per day',
    },
  ]);

  const handleIncreaseLimit = (limit: Limit) => {
    Alert.alert(
      'Increase Limit',
      `Would you like to request an increase for ${limit.type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Request Increase',
          onPress: () => {
            Alert.alert(
              'Request Submitted',
              'Your request has been submitted. Our team will review it and get back to you within 24 hours.',
            );
          },
        },
      ]
    );
  };

  const getLimitPercentage = (current: string, max: string) => {
    const currentNum = parseInt(current.replace(/[^0-9]/g, ''));
    const maxNum = parseInt(max.replace(/[^0-9]/g, ''));
    return Math.round((currentNum / maxNum) * 100);
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-gray-50`}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw`px-3 py-4 border-b border-gray-100 bg-white`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Transaction Limits</Text>
            <Text style={tw`text-xs text-gray-500`}>View and manage your account limits</Text>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Account Tier Info */}
        <LinearGradient
          colors={['#2563eb', '#7c3aed']}
          style={tw`rounded-2xl p-5 mb-6`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`bg-white/20 w-12 h-12 rounded-full items-center justify-center`}>
              <Ionicons name="shield-checkmark" size={24} color="#fff" />
            </View>
            <View style={tw`ml-3 flex-1`}>
              <Text style={tw`text-white font-bold text-lg`}>Tier 2 Account</Text>
              <Text style={tw`text-white/80 text-sm`}>Verified Account</Text>
            </View>
          </View>
          <Text style={tw`text-white/90 text-sm`}>
            Your account is verified. You can request limit increases by upgrading to Tier 3.
          </Text>
        </LinearGradient>

        {/* Limits List */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Current Limits</Text>
          {limits.map((limit, index) => {
            const percentage = getLimitPercentage(limit.current, limit.max);
            return (
              <View
                key={limit.id}
                style={tw`bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm`}
              >
                <View style={tw`flex-row items-center mb-4`}>
                  <View style={tw`bg-blue-50 w-12 h-12 rounded-full items-center justify-center mr-3`}>
                    <Ionicons name={limit.icon as any} size={24} color={limit.color} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-gray-900 font-bold text-base`}>{limit.type}</Text>
                    <Text style={tw`text-gray-500 text-xs mt-1`}>{limit.description}</Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={tw`mb-4`}>
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-gray-700 font-semibold`}>Current: {limit.current}</Text>
                    <Text style={tw`text-gray-500 text-sm`}>{percentage}% used</Text>
                  </View>
                  <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                    <View
                      style={[
                        tw`h-full rounded-full`,
                        { width: `${percentage}%`, backgroundColor: limit.color },
                      ]}
                    />
                  </View>
                  <Text style={tw`text-gray-500 text-xs mt-2`}>Maximum: {limit.max}</Text>
                </View>

                <TouchableOpacity
                  style={tw`bg-blue-50 border border-blue-200 py-3 rounded-xl flex-row items-center justify-center`}
                  onPress={() => handleIncreaseLimit(limit)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trending-up" size={18} color="#2563eb" />
                  <Text style={tw`text-blue-600 font-semibold ml-2`}>Request Increase</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Upgrade Tier */}
        <View style={tw`bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-6`}>
          <View style={tw`flex-row items-center mb-3`}>
            <Ionicons name="star" size={24} color="#7c3aed" />
            <Text style={tw`text-purple-900 font-bold text-lg ml-3`}>Upgrade to Tier 3</Text>
          </View>
          <Text style={tw`text-purple-700 text-sm mb-4`}>
            Unlock higher transaction limits by upgrading to Tier 3. Submit additional verification documents to get started.
          </Text>
          <TouchableOpacity
            style={tw`bg-purple-600 py-3 rounded-xl`}
            onPress={() => Alert.alert('Upgrade', 'Upgrade to Tier 3 feature coming soon.')}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white text-center font-bold`}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="information-circle" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-900 font-semibold ml-2`}>About Limits</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Limits are set based on your account tier and verification level
          </Text>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Limit increase requests are reviewed within 24-48 hours
          </Text>
          <Text style={tw`text-xs text-gray-600`}>
            • Higher limits may require additional verification documents
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

