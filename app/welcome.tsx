import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-600`}>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <View style={tw`mb-4`}>
          <Ionicons name="wallet" size={80} color="#fff" />
        </View>
        <Text style={tw`text-4xl font-bold text-white mb-2`}>WanPay</Text>
        <Text style={tw`text-white text-center mb-8 text-lg`}>
          Fast, Secure & Easy Payment Solution
        </Text>
        <TouchableOpacity
          style={tw`bg-white w-full py-4 rounded-xl mb-3`}
          onPress={() => router.push('/login')}
        >
          <Text style={tw`text-blue-600 text-center font-bold text-lg`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border-2 border-white w-full py-4 rounded-xl`}
          onPress={() => router.push('/signup')}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

