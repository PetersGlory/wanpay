import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const phoneValid = /^\d{10}$/.test(phone);
  const pinValid = /^\d{4}$/.test(pin);
  const canLogin = phoneValid && pinValid;

  const handleLogin = () => {
    // Navigate to home screen after login
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <StatusBar style="dark" />
      <ScrollView style={tw`flex-1 px-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 mb-8`}>
          <Ionicons name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-3xl font-bold mb-2`}>Welcome Back!</Text>
        <Text style={tw`text-gray-600 mb-8`}>Login to continue</Text>

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="8012345678"
          keyboardType="phone-pad"
          accessibilityLabel="Phone number"
          prefix="+234"
          icon="call-outline"
          helperText={phone.length === 0 ? "Enter your 10-digit phone number" : phoneValid ? "Looks good" : "Please enter a valid 10-digit number"}
          errored={phone.length > 0 && !phoneValid}
          errorText={!phoneValid && phone.length > 0 ? "Invalid phone number" : undefined}
        />

        <Input
          label="PIN"
          value={pin}
          onChangeText={setPin}
          placeholder="Enter 4-digit PIN"
          keyboardType="number-pad"
          maxLength={4}
          accessibilityLabel="4-digit PIN"
          icon="key-outline"
          secure={true}
          secureShown={showPin}
          showToggle={true}
          toggleSecure={() => setShowPin(!showPin)}
          helperText={pin.length === 0 ? "Use a 4-digit PIN" : pinValid ? "PIN looks good" : "PIN must be exactly 4 digits"}
          errored={pin.length > 0 && !pinValid}
          errorText={!pinValid && pin.length > 0 ? "Invalid PIN" : undefined}
        />

        <TouchableOpacity style={tw`mb-6`}>
          <Text style={tw`text-blue-600 text-right`}>Forgot PIN?</Text>
        </TouchableOpacity>

        <Button label="Login" onPress={handleLogin} disabled={!canLogin} />

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

