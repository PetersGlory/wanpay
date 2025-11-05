import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function BillsScreen() {
  const router = useRouter();

  const billCategories = [
    { id: 1, name: 'Airtime', icon: 'call', color: 'purple' },
    { id: 2, name: 'Data', icon: 'wifi', color: 'blue' },
    { id: 3, name: 'Electricity', icon: 'flash', color: 'yellow' },
    { id: 4, name: 'TV', icon: 'tv', color: 'red' },
  ];

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      purple: 'bg-purple-100',
      blue: 'bg-blue-100',
      yellow: 'bg-yellow-100',
      red: 'bg-red-100',
    };
    return colors[color] || 'bg-gray-100';
  };

  const getIconColor = (color: string) => {
    const colors: { [key: string]: string } = {
      purple: '#9333ea',
      blue: '#2563eb',
      yellow: '#eab308',
      red: '#ef4444',
    };
    return colors[color] || '#666';
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 pt-4 flex-1`}>
        <View style={tw`flex-row items-center mb-6`}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
            <Ionicons name="arrow-back" size={32} color="#000" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold ml-4`}>Pay Bills</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {billCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={tw`${getColorClass(category.color)} w-[48%] p-6 rounded-2xl mb-4 items-center`}
              >
                <Ionicons name={category.icon as any} size={40} color={getIconColor(category.color)} />
                <Text style={tw`font-semibold mt-3`}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={tw`mt-6`}>
            <Text style={tw`text-lg font-bold mb-4`}>Recent Bills</Text>
            <View style={tw`bg-gray-50 p-4 rounded-xl`}>
              <Text style={tw`text-gray-500 text-center`}>No recent bills</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

