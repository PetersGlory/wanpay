import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Validation
  const nameValid = fullName.trim().length >= 3;
  const phoneValid = /^\d{10}$/.test(phone);
  const emailValid = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canContinue = nameValid && phoneValid && emailValid;

  const handleContinue = () => {
    router.push('/otp');
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <StatusBar style="dark" />
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={tw`mt-4 mb-8`}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-3xl font-bold mb-2`}>Create Account</Text>
        <Text style={tw`text-gray-600 mb-8`}>Sign up to get started</Text>

        <Input
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="John Doe"
          keyboardType="default"
          accessibilityLabel="Full name"
          icon="person-outline"
          helperText={
            fullName.length === 0
              ? 'Enter your full name'
              : nameValid
              ? 'Looks good'
              : 'Name must be at least 3 characters'
          }
          errored={fullName.length > 0 && !nameValid}
          errorText={!nameValid && fullName.length > 0 ? 'Name too short' : undefined}
        />

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="8012345678"
          keyboardType="phone-pad"
          maxLength={10}
          accessibilityLabel="Phone number"
          prefix="+234"
          icon="call-outline"
          helperText={
            phone.length === 0
              ? 'Enter your 10-digit phone number'
              : phoneValid
              ? 'Looks good'
              : 'Please enter a valid 10-digit number'
          }
          errored={phone.length > 0 && !phoneValid}
          errorText={!phoneValid && phone.length > 0 ? 'Invalid phone number' : undefined}
        />

        <Input
          label="Email (Optional)"
          value={email}
          onChangeText={setEmail}
          placeholder="john@example.com"
          keyboardType="email-address"
          // autoCapitalize="none"
          accessibilityLabel="Email address"
          icon="mail-outline"
          helperText={
            email.length === 0
              ? 'Optional - for account recovery'
              : emailValid
              ? 'Valid email'
              : 'Please enter a valid email address'
          }
          errored={email.length > 0 && !emailValid}
          errorText={!emailValid && email.length > 0 ? 'Invalid email format' : undefined}
        />

        <Button 
          label="Continue" 
          onPress={handleContinue} 
          disabled={!canContinue}
        />

        <View style={tw`flex-row justify-center mb-6`}>
          <Text style={tw`text-gray-600`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={tw`text-blue-600 font-semibold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}