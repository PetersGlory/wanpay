import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ phone: '', pin: '' });

  const validateForm = () => {
    const newErrors = { phone: '', pin: '' };
    let isValid = true;

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (phone.trim().length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!pin.trim()) {
      newErrors.pin = 'PIN is required';
      isValid = false;
    } else if (pin.length !== 4) {
      newErrors.pin = 'PIN must be 4 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 10) {
      setPhone(numericText);
      if (errors.phone) setErrors({ ...errors, phone: '' });
    }
  };

  const handlePinChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 4) {
      setPin(numericText);
      if (errors.pin) setErrors({ ...errors, pin: '' });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <ScrollView
          style={tw`flex-1 px-6`}
          contentContainerStyle={tw`pb-8`}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`mt-4 mb-6 w-10`}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>

          <View style={tw`mb-8`}>
            <Text style={tw`text-3xl font-bold mb-2 text-gray-900`}>Welcome Back!</Text>
            <Text style={tw`text-gray-600 text-base`}>Login to continue to your account</Text>
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Phone Number</Text>
            <View
              style={tw`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <Text style={tw`text-gray-700 mr-2 font-medium`}>+234</Text>
              <View style={tw`h-5 w-px bg-gray-300 mr-2`} />
              <TextInput
                style={tw`flex-1 text-base text-gray-900`}
                placeholder="8012345678"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={10}
                autoComplete="tel"
              />
            </View>
            {errors.phone ? (
              <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.phone}</Text>
            ) : null}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>PIN</Text>
            <View
              style={tw`border ${errors.pin ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <TextInput
                style={tw`flex-1 text-base text-gray-900`}
                placeholder="Enter 4-digit PIN"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPin}
                keyboardType="number-pad"
                maxLength={4}
                value={pin}
                onChangeText={handlePinChange}
                autoComplete="off"
              />
              <TouchableOpacity
                onPress={() => setShowPin(!showPin)}
                activeOpacity={0.7}
                style={tw`ml-2 p-1`}
              >
                <Ionicons
                  name={showPin ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            {errors.pin ? (
              <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.pin}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={tw`mb-8`}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Forgot PIN', 'Feature coming soon')}
          >
            <Text style={tw`text-blue-600 text-right font-medium`}>Forgot PIN?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${loading ? 'opacity-70' : ''}`}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`text-white text-center font-bold text-lg`}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-gray-600`}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push('/signup')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-blue-600 font-semibold`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

