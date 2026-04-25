import { DARK_BG } from '@/constants/customConstants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { id: 'transfer', name: 'Transfer', icon: 'arrow-forward-outline', screen: 'transfer', color: 'blue' },
    { id: 'bills',    name: 'Bills',    icon: 'document-text-outline', screen: 'bills',    color: 'blue' },
    { id: 'growth',   name: 'Growth',   icon: 'trending-up-outline',   screen: 'grants',   color: 'purple' },
    { id: 'receive',  name: 'Receive',  icon: 'arrow-down-outline',    screen: 'index',    color: 'blue' },
  ];

  const recentTransactions = [
    { id: 1, name: 'John Doe',      type: 'sent',     amount: 5000,  date: 'Today, 10:30 AM' },
    { id: 2, name: 'Jane Smith',    type: 'received', amount: 12000, date: 'Today, 09:15 AM' },
    { id: 3, name: 'DSTV Payment',  type: 'bills',    amount: 8500,  date: 'Yesterday' },
  ];

  const txnIcon = (type: string) => {
    if (type === 'received') return 'arrow-down-outline';
    if (type === 'sent') return 'arrow-up-outline';
    return 'document-text-outline';
  };

  const txnIconBg = (type: string) => {
    if (type === 'received') return 'bg-emerald-500/10';
    if (type === 'sent') return 'bg-red-500/10';
    return 'bg-amber-500/10';
  };

  const txnIconColor = (type: string) => {
    if (type === 'received') return '#10b981';
    if (type === 'sent') return '#f87171';
    return '#f59e0b';
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${DARK_BG}]`}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={tw`bg-blue-700 px-6 pt-6 pb-7 rounded-b-[32px]`}>
          {/* Top row */}
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <View>
              <Text style={tw`text-white/50 text-[12px] mb-0.5`}>Good morning 👋</Text>
              <Text style={tw`text-white text-[20px] font-bold tracking-tight`}>Samuel</Text>
            </View>
            <TouchableOpacity
              style={tw`w-[38px] h-[38px] rounded-xl bg-white/12 border border-white/15 items-center justify-center`}
              activeOpacity={0.75}
            >
              <Ionicons name="notifications-outline" size={20} color="rgba(255,255,255,0.85)" />
            </TouchableOpacity>
          </View>

          {/* Balance card */}
          <View style={tw`bg-white/10 border border-white/12 rounded-[20px] p-5`}>
            <View style={tw`flex-row justify-between items-center mb-1.5`}>
              <Text style={tw`text-white/55 text-[12px]`}>Wallet balance</Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)} activeOpacity={0.7}>
                <Ionicons
                  name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                  size={17}
                  color="rgba(255,255,255,0.55)"
                />
              </TouchableOpacity>
            </View>

            <Text style={tw`text-white text-[30px] font-bold tracking-tight mb-4`}>
              {showBalance ? '₦45,320.50' : '₦ ••••••'}
            </Text>

            <View style={tw`flex-row justify-between items-center`}>
              <TouchableOpacity
                style={tw`bg-white rounded-full py-1.5 px-4 flex-row items-center gap-1`}
                activeOpacity={0.85}
              >
                <Ionicons name="add" size={14} color="#1d4ed8" />
                <Text style={tw`text-blue-700 text-[12px] font-semibold`}>Add money</Text>
              </TouchableOpacity>
              <Text style={tw`text-white/35 text-[11px]`}>0123456789 · GTB</Text>
            </View>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={tw`px-5 pt-6 pb-24`}>

          {/* Quick Actions */}
          <Text style={tw`text-white text-[14px] font-semibold tracking-tight mb-4`}>Quick actions</Text>
          <View style={tw`flex-row gap-2 mb-7`}>
            {quickActions.map(action => {
              const isGrowth = action.color === 'purple';
              return (
                <TouchableOpacity
                  key={action.id}
                  style={tw`flex-1 items-center gap-2`}
                  activeOpacity={0.75}
                  onPress={() => router.push(`/(tabs)/${action.screen}` as any)}
                >
                  <View
                    style={tw`w-14 h-14 rounded-2xl items-center justify-center ${
                      isGrowth
                        ? 'bg-violet-500/15 border border-violet-500/20'
                        : 'bg-blue-500/15 border border-blue-500/20'
                    }`}
                  >
                    <Ionicons
                      name={action.icon as any}
                      size={22}
                      color={isGrowth ? '#a78bfa' : '#60a5fa'}
                    />
                  </View>
                  <Text style={tw`text-white/50 text-[11px] text-center`}>{action.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Recent Transactions */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-[14px] font-semibold tracking-tight`}>Recent transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')} activeOpacity={0.7}>
              <Text style={tw`text-blue-400 text-[12px] font-medium`}>See all</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map(txn => (
            <View
              key={txn.id}
              style={tw`bg-white/4 border border-white/7 rounded-2xl p-3.5 flex-row justify-between items-center mb-2.5`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-[42px] h-[42px] rounded-[14px] items-center justify-center ${txnIconBg(txn.type)}`}>
                  <Ionicons name={txnIcon(txn.type) as any} size={18} color={txnIconColor(txn.type)} />
                </View>
                <View>
                  <Text style={tw`text-white text-[13px] font-semibold mb-0.5`}>{txn.name}</Text>
                  <Text style={tw`text-white/30 text-[11px]`}>{txn.date}</Text>
                </View>
              </View>
              <Text
                style={tw`text-[13px] font-bold ${
                  txn.type === 'received' ? 'text-emerald-400' : 'text-red-400'
                }`}
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