import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const quickActions = [
  { id: 'limits', title: 'Increase Limits', icon: 'trending-up-outline', color: 'bg-blue-100', tint: '#2563eb' },
  { id: 'cards', title: 'Manage Cards', icon: 'card-outline', color: 'bg-purple-100', tint: '#7c3aed' },
  { id: 'support', title: 'Support', icon: 'chatbubbles-outline', color: 'bg-amber-100', tint: '#f59e0b' },
];

const menuItems = [
  { id: 1, title: 'Personal Information', icon: 'person-outline', subtitle: 'Name, phone number, address' },
  { id: 2, title: 'Security Settings', icon: 'lock-closed-outline', subtitle: 'Change PIN, biometrics' },
  { id: 3, title: 'Transaction Limits', icon: 'wallet-outline', subtitle: 'Daily and monthly limits' },
  { id: 4, title: 'Notifications', icon: 'notifications-outline', subtitle: 'Email and push alerts' },
  { id: 5, title: 'Help & Support', icon: 'help-circle-outline', subtitle: 'FAQs, contact support' },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={tw`flex-1 px-4 pt-4`}
        contentContainerStyle={tw`pb-24`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <View>
            <Text style={tw`text-2xl font-bold text-gray-900`}>Profile</Text>
            <Text style={tw`text-gray-500 text-sm`}>Manage your account and preferences</Text>
          </View>
          <TouchableOpacity
            style={tw`bg-blue-50 w-10 h-10 rounded-full items-center justify-center`}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Coming Soon', 'Profile settings will be available shortly.')}
          >
            <Ionicons name="settings-outline" size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>

        <View style={tw`bg-blue-600 rounded-3xl p-6 mb-6 shadow-lg shadow-blue-100`}>
          <View style={tw`flex-row items-center`}> 
            <View style={tw`bg-white/20 w-16 h-16 rounded-full items-center justify-center mr-4`}>
              <Text style={tw`text-white text-2xl font-semibold`}>SA</Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-xl font-semibold`}>Samuel Adebayo</Text>
              <Text style={tw`text-white/80 text-sm`}>+234 801 234 5678</Text>
              <View style={tw`flex-row items-center mt-2 bg-white/20 px-2 py-1 rounded-full self-start`}>
                <Ionicons name="shield-checkmark" size={14} color="#bbf7d0" />
                <Text style={tw`text-white text-xs font-semibold ml-1`}>Tier 2 • Verified</Text>
              </View>
            </View>
          </View>

          <View style={tw`flex-row justify-between mt-6 bg-white/10 rounded-2xl px-4 py-3`}>
            <View>
              <Text style={tw`text-white/70 text-xs uppercase`}>Wallet Balance</Text>
              <Text style={tw`text-white text-lg font-bold`}>₦45,320.50</Text>
            </View>
            <View>
              <Text style={tw`text-white/70 text-xs uppercase`}>Daily Limit</Text>
              <Text style={tw`text-white text-lg font-bold`}>₦500,000</Text>
            </View>
          </View>
        </View>

        <View style={tw`flex-row justify-between mb-8`}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={tw`${action.color} w-[31%] rounded-2xl p-4 items-start`}
              activeOpacity={0.8}
            >
              <View style={tw`bg-white/70 w-10 h-10 rounded-full items-center justify-center mb-3`}>
                <Ionicons name={action.icon as any} size={20} color={action.tint} />
              </View>
              <Text style={tw`text-gray-800 font-semibold text-sm leading-5`}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw`mb-8`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Account Settings</Text>
          <View style={tw`bg-white border border-gray-100 rounded-3xl shadow-sm`}> 
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={tw`flex-row justify-between items-center px-4 py-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                activeOpacity={0.75}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View style={tw`bg-blue-50 w-10 h-10 rounded-full items-center justify-center mr-3`}>
                    <Ionicons name={item.icon as any} size={20} color="#2563eb" />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-gray-900 font-semibold`}>{item.title}</Text>
                    <Text style={tw`text-gray-500 text-xs mt-1`}>{item.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={tw`bg-gray-50 border border-gray-200 rounded-3xl p-5 mb-8`}> 
          <Text style={tw`text-gray-900 font-semibold text-base mb-2`}>Need help?</Text>
          <Text style={tw`text-gray-600 text-sm leading-5 mb-4`}>
            Our support team is available 24/7. Reach out if you need any assistance with your account.
          </Text>
          <View style={tw`flex-row`}> 
            <TouchableOpacity
              style={tw`flex-1 bg-white border border-gray-200 rounded-xl py-3 items-center mr-3`}
              activeOpacity={0.75}
            >
              <Ionicons name="chatbox-ellipses-outline" size={18} color="#2563eb" />
              <Text style={tw`text-blue-600 font-semibold mt-1`}>Live chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-blue-600 rounded-xl py-3 items-center`}
              activeOpacity={0.85}
            >
              <Ionicons name="call-outline" size={18} color="#fff" />
              <Text style={tw`text-white font-semibold mt-1`}>Call us</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={tw`bg-red-50 border border-red-100 py-4 rounded-xl flex-row justify-center items-center`}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color="#dc2626" style={tw`mr-2`} />
          <Text style={tw`text-red-600 text-center font-semibold`}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

