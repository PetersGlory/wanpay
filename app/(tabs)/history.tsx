import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { DARK_BG } from '@/constants/customConstants';

export default function HistoryScreen() {
  const router = useRouter();

  const transactions = [
    { id: 1, name: 'John Doe',      type: 'sent',     amount: 5000,  date: 'Nov 5, 10:30 AM', status: 'completed' },
    { id: 2, name: 'Jane Smith',    type: 'received', amount: 12000, date: 'Nov 5, 09:15 AM', status: 'completed' },
    { id: 3, name: 'DSTV Payment',  type: 'bills',    amount: 8500,  date: 'Nov 4, 08:20 PM', status: 'completed' },
    { id: 4, name: 'MTN Airtime',   type: 'bills',    amount: 1000,  date: 'Nov 3, 02:15 PM', status: 'completed' },
    { id: 5, name: 'Mary Johnson',  type: 'sent',     amount: 3500,  date: 'Nov 3, 11:45 AM', status: 'completed' },
  ];

  const txnIcon = (type: string) => {
    if (type === 'received') return 'arrow-down-outline';
    if (type === 'sent') return 'arrow-up-outline';
    return 'document-text-outline';
  };

  const txnStyles = (type: string) => {
    if (type === 'received') return { bg: 'bg-emerald-500/10', icon: '#10b981', text: 'text-emerald-400' };
    if (type === 'sent') return { bg: 'bg-red-500/10', icon: '#f87171', text: 'text-red-400' };
    return { bg: 'bg-amber-500/10', icon: '#f59e0b', text: 'text-amber-400' };
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-[${DARK_BG}]`}>
      <StatusBar style="light" />
      <View style={tw`flex-1 px-5`}>

        {/* Header */}
        <View style={tw`flex-row items-start mt-4 mb-7`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`w-[38px] h-[38px] rounded-xl bg-white/7 items-center justify-center mr-4`}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.75)" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-white text-[20px] font-bold tracking-tight`}>Transaction history</Text>
            <Text style={tw`text-white/35 text-[12px] mt-0.5`}>{transactions.length} transactions</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10`}>
          {transactions.map((txn) => {
            const s = txnStyles(txn.type);
            return (
              <TouchableOpacity
                key={txn.id}
                style={tw`bg-white/4 border border-white/7 rounded-2xl p-3.5 mb-2.5 flex-row justify-between items-center`}
                activeOpacity={0.75}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View style={tw`w-[42px] h-[42px] rounded-[14px] items-center justify-center mr-3 ${s.bg}`}>
                    <Ionicons name={txnIcon(txn.type) as any} size={18} color={s.icon} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white text-[13px] font-semibold mb-0.5`}>{txn.name}</Text>
                    <Text style={tw`text-white/30 text-[11px] mb-1`}>{txn.date}</Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Ionicons name="checkmark-circle" size={12} color="#10b981" />
                      <Text style={tw`text-emerald-400 text-[11px]`}>{txn.status}</Text>
                    </View>
                  </View>
                </View>
                <Text style={tw`font-bold text-[13px] ${s.text}`}>
                  {txn.type === 'received' ? '+' : '-'}₦{txn.amount.toLocaleString()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}