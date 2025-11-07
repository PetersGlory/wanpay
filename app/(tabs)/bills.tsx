import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

interface BillCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
}

export default function BillsScreen() {
  const router = useRouter();

  const billCategories: BillCategory[] = [
    { id: '1', name: 'Airtime', icon: 'call', color: '#8b5cf6', route: '/bills/airtime' },
    { id: '2', name: 'Data', icon: 'wifi', color: '#3b82f6', route: '/bills/data' },
    { id: '3', name: 'Electricity', icon: 'flash', color: '#f59e0b', route: '/bills/electricity' },
    { id: '4', name: 'TV Subscription', icon: 'tv', color: '#ef4444', route: '/bills/tv' },
    { id: '5', name: 'Education', icon: 'school', color: '#10b981', route: '/bills/education' },
    { id: '6', name: 'Internet', icon: 'globe', color: '#06b6d4', route: '/bills/internet' },
  ];

  const recentBills = [
    { id: '1', name: 'MTN Airtime', amount: 1000, date: 'Nov 5, 2024' },
    { id: '2', name: 'EKEDC', amount: 5000, date: 'Nov 3, 2024' },
    { id: '3', name: 'DSTV Compact', amount: 10500, date: 'Nov 1, 2024' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw`bg-white px-6 py-4 border-b border-gray-100`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>Pay Bills</Text>
        <Text style={tw`text-sm text-gray-500 mt-1`}>Quick and easy payments</Text>
      </View>

      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Bill Categories */}
        <View style={tw`mt-6`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-4`}>Services</Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {billCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  tw`w-[48%] bg-white p-5 rounded-2xl mb-4 items-center`,
                  { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }
                ]}
                activeOpacity={0.7}
                onPress={() => router.push(category.route as any)}
              >
                <View style={[tw`w-14 h-14 rounded-full items-center justify-center mb-3`, { backgroundColor: `${category.color}20` }]}>
                  <Ionicons name={category.icon} size={28} color={category.color} />
                </View>
                <Text style={tw`font-semibold text-gray-900 text-center`}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Bills */}
        <View style={tw`mt-6 mb-6`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-4`}>Recent Bills</Text>
          {recentBills.length > 0 ? (
            recentBills.map((bill) => (
              <TouchableOpacity
                key={bill.id}
                style={[
                  tw`bg-white p-4 rounded-2xl mb-3 flex-row justify-between items-center`,
                  { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 }
                ]}
                activeOpacity={0.7}
              >
                <View>
                  <Text style={tw`font-semibold text-gray-900`}>{bill.name}</Text>
                  <Text style={tw`text-xs text-gray-500 mt-1`}>{bill.date}</Text>
                </View>
                <Text style={tw`font-bold text-gray-900`}>₦{bill.amount.toLocaleString()}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={tw`bg-white p-8 rounded-2xl items-center`}>
              <Ionicons name="receipt-outline" size={48} color="#9ca3af" />
              <Text style={tw`text-gray-400 mt-3`}>No recent bills</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

