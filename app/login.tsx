import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleLogin = () => {
    // Navigate to home screen after login
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1 px-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 mb-8`}>
          <Ionicons name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-3xl font-bold mb-2`}>Welcome Back!</Text>
        <Text style={tw`text-gray-600 mb-8`}>Login to continue</Text>

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

        <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>PIN</Text>
        <View style={tw`border border-gray-300 rounded-xl px-4 py-3 mb-2 flex-row items-center`}>
          <TextInput
            style={tw`flex-1`}
            placeholder="Enter 4-digit PIN"
            secureTextEntry={!showPin}
            keyboardType="number-pad"
            maxLength={4}
            value={pin}
            onChangeText={setPin}
          />
          <TouchableOpacity onPress={() => setShowPin(!showPin)}>
            <Ionicons
              name={showPin ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={tw`mb-6`}>
          <Text style={tw`text-blue-600 text-right`}>Forgot PIN?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`bg-blue-600 py-4 rounded-xl mb-4`} onPress={handleLogin}>
          <Text style={tw`text-white text-center font-bold text-lg`}>Login</Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-gray-600`}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={tw`text-blue-600 font-semibold`}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

