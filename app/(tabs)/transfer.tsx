import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function TransferScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <View style={tw`px-6 pt-4 flex-1`}>
        <View style={tw`flex-row items-center mb-6`}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/' as never)}>
            <Ionicons name="arrow-back" size={32} color="#000" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold ml-4`}>Send Money</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Select Bank</Text>
          <TouchableOpacity style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center`}>
            <Text style={tw`text-gray-500`}>Choose bank...</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Account Number</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
            placeholder="Enter account number"
            keyboardType="number-pad"
            maxLength={10}
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Amount</Text>
          <View style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-6 flex-row items-center`}>
            <Text style={tw`text-xl mr-2`}>₦</Text>
            <TextInput
              style={tw`flex-1 text-2xl font-bold`}
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Description (Optional)</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-6`}
            placeholder="What's this for?"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity style={tw`bg-blue-600 py-4 rounded-xl mb-6`}>
            <Text style={tw`text-white text-center font-bold text-lg`}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

