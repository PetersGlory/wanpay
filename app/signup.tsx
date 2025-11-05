import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1 px-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 mb-8`}>
          <Ionicons name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-3xl font-bold mb-2`}>Create Account</Text>
        <Text style={tw`text-gray-600 mb-8`}>Sign up to get started</Text>

        <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Full Name</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
          placeholder="John Doe"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Phone Number</Text>
        <View style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-4 flex-row items-center`}>
          <Text style={tw`text-gray-600 mr-2`}>+234</Text>
          <TextInput
            style={tw`flex-1`}
            placeholder="8012345678"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Email (Optional)</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-6`}
          placeholder="john@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={tw`bg-blue-600 py-4 rounded-xl mb-4`}
          onPress={() => router.push('/otp')}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>Continue</Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-gray-600`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={tw`text-blue-600 font-semibold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

