import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { PRIMARY_COLOR } from '@/constants/customConstants';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ fullName: '', phone: '', email: '' });

  const validateEmail = (email: string) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = { fullName: '', phone: '', email: '' };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (phone.trim().length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/otp');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
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

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors({ ...errors, email: '' });
  };

  const handleNameChange = (text: string) => {
    setFullName(text);
    if (errors.fullName) setErrors({ ...errors, fullName: '' });
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
            <Text style={tw`text-3xl font-bold mb-2 text-gray-900`}>Create Account</Text>
            <Text style={tw`text-gray-600 text-base`}>Sign up to get started with WanPay</Text>
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Full Name</Text>
            <TextInput
              style={tw`border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900`}
              placeholder="John Doe"
              placeholderTextColor="#9ca3af"
              value={fullName}
              onChangeText={handleNameChange}
              autoCapitalize="words"
              autoComplete="name"
            />
            {errors.fullName ? (
              <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.fullName}</Text>
            ) : null}
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

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>
              Email <Text style={tw`text-gray-400 font-normal`}>(Optional)</Text>
            </Text>
            <TextInput
              style={tw`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900`}
              placeholder="john@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email ? (
              <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.email}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={tw`bg-[${PRIMARY_COLOR}] py-4 rounded-xl mb-6 shadow-lg ${loading ? 'opacity-70' : ''}`}
            onPress={handleContinue}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`text-white text-center font-bold text-lg`}>Continue</Text>
            )}
          </TouchableOpacity>

          <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-gray-600`}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-blue-600 font-semibold`}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

