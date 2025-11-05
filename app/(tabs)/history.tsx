import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function HistoryScreen() {
  const router = useRouter();

  const transactions = [
    { id: 1, name: 'John Doe', type: 'sent', amount: 5000, date: 'Nov 5, 10:30 AM', status: 'completed' },
    { id: 2, name: 'Jane Smith', type: 'received', amount: 12000, date: 'Nov 5, 09:15 AM', status: 'completed' },
    { id: 3, name: 'DSTV Payment', type: 'bills', amount: 8500, date: 'Nov 4, 08:20 PM', status: 'completed' },
    { id: 4, name: 'MTN Airtime', type: 'bills', amount: 1000, date: 'Nov 3, 02:15 PM', status: 'completed' },
    { id: 5, name: 'Mary Johnson', type: 'sent', amount: 3500, date: 'Nov 3, 11:45 AM', status: 'completed' },
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

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'received':
        return { bg: 'bg-green-100', icon: '#10b981', text: 'text-green-600' };
      case 'sent':
        return { bg: 'bg-red-100', icon: '#ef4444', text: 'text-red-600' };
      default:
        return { bg: 'bg-blue-100', icon: '#2563eb', text: 'text-blue-600' };
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 pt-4 flex-1`}>
        <View style={tw`flex-row items-center mb-6`}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
            <Ionicons name="arrow-back" size={32} color="#000" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold ml-4`}>Transaction History</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {transactions.map((txn) => {
            const colors = getTransactionColor(txn.type);
            return (
              <TouchableOpacity key={txn.id} style={tw`bg-gray-50 p-4 rounded-xl mb-3`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View style={tw`${colors.bg} w-12 h-12 rounded-full items-center justify-center mr-3`}>
                      <Ionicons name={getTransactionIcon(txn.type) as any} size={24} color={colors.icon} />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`font-semibold`}>{txn.name}</Text>
                      <Text style={tw`text-xs text-gray-500`}>{txn.date}</Text>
                      <View style={tw`flex-row items-center mt-1`}>
                        <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                        <Text style={tw`text-xs text-green-600 ml-1`}>{txn.status}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={tw`font-bold ${colors.text}`}>
                    {txn.type === 'received' ? '+' : '-'}₦{txn.amount.toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

