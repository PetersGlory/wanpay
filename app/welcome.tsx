import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function WelcomeScreen() {
  const router = useRouter();

    // New: memoized navigation handlers
    const handleLogin = useCallback(() => router.push('/login'), [router]);
    const handleSignup = useCallback(() => router.push('/signup'), [router]);

    return (
      <SafeAreaView style={tw`flex-1 bg-blue-600`}>
        {/* New: match light status bar to dark background for better contrast */}
        <StatusBar style="light" />

        <View style={tw`flex-1 justify-center items-center px-6`}>
          <View style={tw`mb-4`}>
            {/* Slightly refined icon style */}
            <Ionicons name="wallet-outline" size={80} color="#fff" />
          </View>
        <Text style={tw`text-4xl font-bold text-white mb-2`}>WanPay</Text>
        <Text style={tw`text-white text-center mb-8 text-lg`}>
          Fast, secure & easy payment solution
        </Text>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Login to your WanPay account"
          testID="loginButton"
          activeOpacity={0.8}
          style={tw`bg-white w-full py-4 rounded-xl mb-3`}
          onPress={handleLogin}
        >
          <Text style={tw`text-blue-600 text-center font-bold text-lg`}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Create a new WanPay account"
          testID="signupButton"
          activeOpacity={0.8}
          style={tw`border-2 border-white w-full py-4 rounded-xl`}
          onPress={handleSignup}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

