import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { DARK_BG } from '@/constants/customConstants';

const quickActions = [
  { id: 'limits',  title: 'Limits',       icon: 'trending-up-outline',  iconColor: '#60a5fa', bg: 'bg-blue-500/15',   border: 'border-blue-500/20',   route: '/profile/increase-limits' },
  { id: 'cards',   title: 'Cards',        icon: 'card-outline',          iconColor: '#a78bfa', bg: 'bg-violet-500/15', border: 'border-violet-500/20', route: '/profile/manage-cards' },
  { id: 'support', title: 'Support',      icon: 'chatbubbles-outline',   iconColor: '#fbbf24', bg: 'bg-amber-500/15',  border: 'border-amber-500/20',  route: '/profile/help-support' },
];

const menuItems = [
  { id: 1, title: 'Personal information', icon: 'person-outline',        subtitle: 'Name, phone, address',      route: '/profile/personal-information' },
  { id: 2, title: 'Security settings',    icon: 'lock-closed-outline',   subtitle: 'Change PIN, biometrics',    route: '/profile/security-settings' },
  { id: 3, title: 'Transaction limits',   icon: 'wallet-outline',        subtitle: 'Daily and monthly limits',  route: '/profile/transaction-limits' },
  { id: 4, title: 'Notifications',        icon: 'notifications-outline', subtitle: 'Email and push alerts',     route: '/profile/notifications' },
  { id: 5, title: 'Help & support',       icon: 'help-circle-outline',   subtitle: 'FAQs, contact support',     route: '/profile/help-support' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-[${DARK_BG}]`}>
      <StatusBar style="light" />
      <ScrollView style={tw`flex-1 py-4 px-5`} contentContainerStyle={tw`pt-6 pb-24`} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <View>
            <Text style={tw`text-white text-[22px] font-bold tracking-tight`}>Profile</Text>
            <Text style={tw`text-white/35 text-[12px] mt-0.5`}>Manage your account</Text>
          </View>
          <TouchableOpacity
            style={tw`w-[38px] h-[38px] rounded-xl bg-white/7 items-center justify-center`}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Coming Soon', 'Profile settings will be available shortly.')}
          >
            <Ionicons name="settings-outline" size={18} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View style={tw`bg-blue-700 rounded-3xl p-5 mb-5`}>
          <View style={tw`flex-row items-center mb-5`}>
            <View style={tw`w-14 h-14 rounded-2xl bg-white/20 border border-white/20 items-center justify-center mr-4`}>
              <Text style={tw`text-white text-[18px] font-bold`}>SA</Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-[18px] font-bold tracking-tight`}>Samuel Adebayo</Text>
              <Text style={tw`text-white/60 text-[12px] mt-0.5`}>+234 801 234 5678</Text>
              <View style={tw`flex-row items-center mt-2 bg-white/15 px-2.5 py-1 rounded-full self-start gap-1`}>
                <Ionicons name="shield-checkmark" size={12} color="#86efac" />
                <Text style={tw`text-white text-[11px] font-semibold`}>Tier 2 · Verified</Text>
              </View>
            </View>
          </View>

          <View style={tw`flex-row justify-between bg-white/10 border border-white/10 rounded-2xl px-4 py-3`}>
            <View>
              <Text style={tw`text-white/50 text-[11px] uppercase tracking-wider mb-1`}>Wallet balance</Text>
              <Text style={tw`text-white text-[18px] font-bold tracking-tight`}>₦45,320.50</Text>
            </View>
            <View style={tw`w-px bg-white/10`} />
            <View>
              <Text style={tw`text-white/50 text-[11px] uppercase tracking-wider mb-1`}>Daily limit</Text>
              <Text style={tw`text-white text-[18px] font-bold tracking-tight`}>₦500,000</Text>
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <View style={tw`flex-row gap-3 mb-6`}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={tw`flex-1 ${action.bg} border ${action.border} rounded-2xl p-4`}
              activeOpacity={0.75}
              onPress={() => router.push(action.route as any)}
            >
              <View style={tw`w-9 h-9 rounded-xl bg-white/10 items-center justify-center mb-3`}>
                <Ionicons name={action.icon as any} size={18} color={action.iconColor} />
              </View>
              <Text style={tw`text-white text-[12px] font-semibold leading-5`}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu */}
        <Text style={tw`text-white/35 text-[11px] font-semibold uppercase tracking-widest mb-3`}>Account settings</Text>
        <View style={tw`bg-white/4 border border-white/7 rounded-3xl overflow-hidden mb-5`}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={tw`flex-row justify-between items-center px-4 py-4 ${index !== menuItems.length - 1 ? 'border-b border-white/7' : ''}`}
              activeOpacity={0.75}
              onPress={() => router.push(item.route as any)}
            >
              <View style={tw`flex-row items-center flex-1`}>
                <View style={tw`w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/20 items-center justify-center mr-3`}>
                  <Ionicons name={item.icon as any} size={17} color="#60a5fa" />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white text-[13px] font-semibold`}>{item.title}</Text>
                  <Text style={tw`text-white/30 text-[11px] mt-0.5`}>{item.subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.2)" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help card */}
        <View style={tw`bg-white/4 border border-white/7 rounded-3xl p-5 mb-5`}>
          <Text style={tw`text-white text-[14px] font-semibold mb-1`}>Need help?</Text>
          <Text style={tw`text-white/35 text-[12px] leading-5 mb-4`}>
            Our support team is available 24/7 for any assistance with your account.
          </Text>
          <View style={tw`flex-row gap-3`}>
            <TouchableOpacity
              style={tw`flex-1 bg-white/7 border border-white/10 rounded-xl h-[44px] items-center justify-center flex-row gap-1.5`}
              activeOpacity={0.75}
              onPress={() => router.push('/profile/help-support' as any)}
            >
              <Ionicons name="chatbox-ellipses-outline" size={16} color="#60a5fa" />
              <Text style={tw`text-blue-400 text-[13px] font-semibold`}>Live chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-blue-500 rounded-xl h-[44px] items-center justify-center flex-row gap-1.5`}
              activeOpacity={0.85}
              onPress={() => router.push('/profile/help-support' as any)}
            >
              <Ionicons name="call-outline" size={16} color="#fff" />
              <Text style={tw`text-white text-[13px] font-semibold`}>Call us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={tw`bg-red-500/10 border border-red-500/20 h-[52px] rounded-2xl flex-row justify-center items-center gap-2`}
          onPress={() => router.replace('/welcome')}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color="#f87171" />
          <Text style={tw`text-red-400 font-semibold text-[14px]`}>Log out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}