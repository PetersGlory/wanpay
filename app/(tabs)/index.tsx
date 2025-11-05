import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

type TransactionType = 'sent' | 'received' | 'bills';

interface Transaction {
  id: number;
  name: string;
  type: TransactionType;
  amount: number;
  date: string;
}

interface QuickAction {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
  color: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const quickActions: QuickAction[] = useMemo(
    () => [
      { id: 'transfer', name: 'Transfer', icon: 'arrow-forward-circle', screen: 'transfer', color: '#3b82f6' },
      { id: 'bills', name: 'Bills', icon: 'document-text', screen: 'bills', color: '#8b5cf6' },
      { id: 'receive', name: 'Receive', icon: 'arrow-down-circle', screen: 'index', color: '#10b981' },
      { id: 'qr', name: 'Scan QR', icon: 'qr-code', screen: 'index', color: '#f59e0b' },
    ],
    []
  );

  const recentTransactions: Transaction[] = useMemo(
    () => [
      { id: 1, name: 'John Doe', type: 'sent', amount: 5000, date: 'Today, 10:30 AM' },
      { id: 2, name: 'Jane Smith', type: 'received', amount: 12000, date: 'Today, 09:15 AM' },
      { id: 3, name: 'DSTV Payment', type: 'bills', amount: 8500, date: 'Yesterday' },
    ],
    []
  );

  const getTransactionIcon = (type: TransactionType): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'received':
        return 'arrow-down-circle';
      case 'sent':
        return 'arrow-up-circle';
      default:
        return 'document-text';
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case 'received':
        return { bg: 'bg-green-100', text: 'text-green-600', icon: '#10b981' };
      case 'sent':
        return { bg: 'bg-red-100', text: 'text-red-600', icon: '#ef4444' };
      default:
        return { bg: 'bg-blue-100', text: 'text-blue-600', icon: '#3b82f6' };
    }
  };

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar style="light" />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#2563eb', '#1e40af']}
          style={tw`px-6 pt-8 pb-8 rounded-b-3xl`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <View>
              <Text style={tw`text-white/80 text-sm`}>{greeting}</Text>
              <Text style={tw`text-white text-xl font-bold mt-1`}>Samuel</Text>
            </View>
            <TouchableOpacity
              style={tw`bg-white/20 p-3 rounded-full`}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="View notifications"
            >
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <View style={tw`bg-white/10 p-6 rounded-3xl`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-white/80 text-sm font-medium`}>Wallet Balance</Text>
              <TouchableOpacity
                onPress={() => setShowBalance(!showBalance)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={showBalance ? 'Hide balance' : 'Show balance'}
                style={tw`p-1`}
              >
                <Ionicons
                  name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <Text style={tw`text-white text-4xl font-bold mb-4`}>
              {showBalance ? '₦45,320.50' : '₦••••••'}
            </Text>
            <TouchableOpacity
              style={tw`bg-white py-3 px-5 rounded-xl w-full self-center`}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Add money to wallet"
            >
              <Text style={tw`text-blue-600 w-full text-center font-bold text-sm`}>+ Add Money</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={tw`px-3 mt-6`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Quick Actions</Text>
          <View style={tw`flex-row justify-between`}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={tw`items-center`}
                onPress={() => router.push(`/(tabs)/${action.screen}` as any)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`${action.name} action`}
              >
                <View
                  style={[
                    tw`bg-blue-50 w-16 h-16 rounded-2xl items-center justify-center mb-2`,
                    {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    },
                  ]}
                >
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={tw`text-xs text-gray-700 font-medium`}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={tw`px-3 mt-6 pb-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/history')}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="View all transactions"
            >
              <Text style={tw`text-blue-600 font-semibold`}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length > 0 ? (
            recentTransactions.map((txn) => {
              const colors = getTransactionColor(txn.type);
              return (
                <TouchableOpacity
                  key={txn.id}
                  style={[
                    tw`bg-white p-4 rounded-2xl mb-3 flex-row justify-between items-center`,
                    {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 3,
                      elevation: 2,
                    },
                  ]}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={`Transaction: ${txn.name}, ${
                    txn.type === 'received' ? 'received' : 'sent'
                  } ${txn.amount} naira`}
                >
                  <View style={tw`flex-row items-center flex-1`}>
                    <View
                      style={tw`${colors.bg} w-12 h-12 rounded-full items-center justify-center mr-3`}
                    >
                      <Ionicons
                        name={getTransactionIcon(txn.type)}
                        size={24}
                        color={colors.icon}
                      />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`font-semibold text-gray-900 text-base`}>{txn.name}</Text>
                      <Text style={tw`text-xs text-gray-500 mt-1`}>{txn.date}</Text>
                    </View>
                  </View>
                  <Text style={tw`font-bold ${colors.text} text-base`}>
                    {txn.type === 'received' ? '+' : '-'}₦{txn.amount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={tw`bg-white p-8 rounded-2xl items-center`}>
              <Ionicons name="receipt-outline" size={48} color="#d1d5db" />
              <Text style={tw`text-gray-400 text-center mt-3`}>No recent transactions</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}