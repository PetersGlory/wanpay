import { PRIMARY_COLOR } from '@/constants/customConstants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { id: 'transfer', name: 'Transfer', icon: 'arrow-forward-circle', screen: 'transfer' },
    { id: 'bills', name: 'Bills', icon: 'document-text', screen: 'bills' },
    { id: 'receive', name: 'Receive', icon: 'arrow-down-circle', screen: 'index' },
    { id: 'qr', name: 'Scan QR', icon: 'qr-code', screen: 'index' },
  ];

  const recentTransactions = [
    { id: 1, name: 'John Doe', type: 'sent', amount: 5000, date: 'Today, 10:30 AM' },
    { id: 2, name: 'Jane Smith', type: 'received', amount: 12000, date: 'Today, 09:15 AM' },
    { id: 3, name: 'DSTV Payment', type: 'bills', amount: 8500, date: 'Yesterday' },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'received':
        return 'arrow-down-circle';
      case 'sent':
        return 'arrow-up-circle';
      default:
        return 'document-text';
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`bg-[${PRIMARY_COLOR}] px-6 pt-6 pb-8 rounded-b-3xl`}>
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <View>
              <Text style={tw`text-white text-sm`}>Good Morning</Text>
              <Text style={tw`text-white text-xl font-bold`}>Samuel</Text>
            </View>
            <TouchableOpacity style={tw`bg-white/20 p-2 rounded-full`}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <View style={tw`bg-white/10 p-5 rounded-2xl`}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-white/80 text-sm`}>Wallet Balance</Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Ionicons
                  name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <Text style={tw`text-white text-3xl font-bold`}>
              {showBalance ? '₦45,320.50' : '₦****'}
            </Text>
            <TouchableOpacity style={tw`bg-white py-2 px-4 rounded-full mt-4 self-start`}>
              <Text style={tw`text-blue-600 font-semibold`}>+ Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={tw`px-6 mt-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Quick Actions</Text>
          <View style={tw`flex-row justify-between`}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={tw`items-center`}
                onPress={() => router.push(`/(tabs)/${action.screen}` as any)}
              >
                <View style={tw`bg-blue-100 w-16 h-16 rounded-2xl items-center justify-center mb-2`}>
                  <Ionicons name={action.icon as any} size={28} color="#2563eb" />
                </View>
                <Text style={tw`text-xs text-gray-700`}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={tw`px-6 mt-6 mb-20`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold`}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={tw`text-blue-600`}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions && recentTransactions.map((txn, i) => (
            <View
              // key={i}
              style={tw`bg-white p-4 rounded-xl mb-3 flex-row justify-between items-center`}
            >
              <View style={tw`flex-row items-center`}>
                <View
                  style={tw`${txn.type === 'received' ? 'bg-green-100' : 'bg-red-100'} w-12 h-12 rounded-full items-center justify-center mr-3`}
                >
                  <Ionicons
                    name={getTransactionIcon(txn.type) as any}
                    size={24}
                    color={txn.type === 'received' ? '#10b981' : '#ef4444'}
                  />
                </View>
                <View>
                  <Text style={tw`font-semibold`}>{txn.name}</Text>
                  <Text style={tw`text-xs text-gray-500`}>{txn.date}</Text>
                </View>
              </View>
              <Text
                style={tw`font-bold ${txn.type === 'received' ? 'text-green-600' : 'text-red-600'}`}
              >
                {txn.type === 'received' ? '+' : '-'}₦{txn.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
