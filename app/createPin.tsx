import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function CreatePinScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleComplete = () => {
    if (pin === confirmPin && pin.length === 4) {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <View style={tw`flex-1 px-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 mb-8`}>
          <Ionicons name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-3xl font-bold mb-2`}>Create PIN</Text>
        <Text style={tw`text-gray-600 mb-8`}>Create a 4-digit PIN to secure your account</Text>

        <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Enter PIN</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
          placeholder="****"
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />

        <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Confirm PIN</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-8`}
          placeholder="****"
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
          value={confirmPin}
          onChangeText={setConfirmPin}
        />

        <TouchableOpacity style={tw`bg-blue-600 py-4 rounded-xl`} onPress={handleComplete}>
          <Text style={tw`text-white text-center font-bold text-lg`}>Create PIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

