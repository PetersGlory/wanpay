import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = useCallback(() => router.push('/login'), [router]);
  const handleSignup = useCallback(() => router.push('/signup'), [router]);

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-600`}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <View style={tw`mb-6 items-center`}>
            <View style={tw`bg-white/20 p-6 rounded-full mb-6 p-2`}>
              <Image
                source={require("../assets/images/wanpay_logo.png")}
                style={tw`w-40 h-40 rounded-full`}
                resizeMode="contain"
                accessibilityLabel="WanPay logo"
              />
            </View>
            <Text style={tw`text-5xl font-bold text-white mb-3`}>WanPay</Text>
            <Text style={tw`text-white/90 text-center text-base max-w-xs leading-6`}>
              Fast, secure & easy payment solution for your daily transactions
            </Text>
          </View>

          <View style={tw`w-full mt-8`}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Login to your WanPay account"
              activeOpacity={0.8}
              style={tw`bg-white w-full py-4 rounded-xl mb-4 shadow-lg`}
              onPress={handleLogin}
            >
              <Text style={tw`text-blue-600 text-center font-bold text-lg`}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Create a new WanPay account"
              activeOpacity={0.8}
              style={tw`border-2 border-white/80 w-full py-4 rounded-xl`}
              onPress={handleSignup}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

