import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { id: 1, title: 'Personal Information', icon: 'person-outline' },
    { id: 2, title: 'Security Settings', icon: 'lock-closed-outline' },
    { id: 3, title: 'Transaction Limits', icon: 'wallet-outline' },
    { id: 4, title: 'Help & Support', icon: 'help-circle-outline' },
  ];

  const handleLogout = () => {
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <ScrollView style={tw`flex-1 px-6 pt-4`}>
        <Text style={tw`text-2xl font-bold mb-6`}>Profile</Text>

        {/* Profile Header */}
        <View style={tw`bg-blue-50 p-6 rounded-2xl mb-6 items-center`}>
          <View style={tw`bg-blue-200 w-20 h-20 rounded-full items-center justify-center mb-3`}>
            <Ionicons name="person" size={40} color="#2563eb" />
          </View>
          <Text style={tw`text-xl font-bold`}>Samuel Adebayo</Text>
          <Text style={tw`text-gray-600`}>+234 801 234 5678</Text>
          <View style={tw`bg-green-100 px-3 py-1 rounded-full mt-2 flex-row items-center`}>
            <Ionicons name="checkmark-circle" size={14} color="#10b981" />
            <Text style={tw`text-green-700 text-xs font-semibold ml-1`}>Verified</Text>
          </View>
        </View>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={tw`bg-gray-50 p-4 rounded-xl mb-3 flex-row justify-between items-center`}
          >
            <View style={tw`flex-row items-center`}>
              <View style={tw`bg-white w-10 h-10 rounded-full items-center justify-center mr-3`}>
                <Ionicons name={item.icon as any} size={20} color="#2563eb" />
              </View>
              <Text style={tw`font-semibold`}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={tw`bg-red-50 p-4 rounded-xl mt-4 mb-20`} onPress={handleLogout}>
          <Text style={tw`text-red-600 text-center font-semibold`}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

