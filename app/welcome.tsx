import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = useCallback(() => router.push('/login'), [router]);
  const handleSignup = useCallback(() => router.push('/signup'), [router]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar style="light" />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={['#2563eb', '#1e40af', '#1e3a8a']}
        style={tw`flex-1`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={tw`flex-1 justify-center items-center px-6`}>
          {/* Icon with subtle animation effect */}
          <View style={tw`mb-6`}>
            <View style={tw`bg-white/10 p-6 rounded-full`}>
              <Ionicons name="wallet-outline" size={72} color="#ffffff" />
            </View>
          </View>

          {/* App Name */}
          <Text style={tw`text-5xl font-bold text-white mb-3 ${Platform.OS === 'ios' ? 'tracking-tight' : ''}`}>
            WanPay
          </Text>

          {/* Tagline */}
          <Text style={tw`text-white/90 text-center mb-12 text-base px-4 leading-6`}>
            Fast, secure & easy payment solution
          </Text>

          {/* Buttons Container */}
          <View style={tw`w-full gap-3`}>
            {/* Login Button */}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Login to your WanPay account"
              testID="loginButton"
              activeOpacity={0.85}
              style={[
                tw`bg-white w-full py-4 rounded-2xl shadow-lg`,
                {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }
              ]}
              onPress={handleLogin}
            >
              <Text style={tw`text-blue-600 text-center font-bold text-lg`}>
                Login
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Create a new WanPay account"
              testID="signupButton"
              activeOpacity={0.85}
              style={tw`border-2 border-white/90 bg-white/5 w-full py-4 rounded-2xl`}
              onPress={handleSignup}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
          <View style={tw`absolute bottom-8`}>
            <Text style={tw`text-white/60 text-xs text-center`}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}