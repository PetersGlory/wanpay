import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      // You can add refs here for auto-focus if needed
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <View style={tw`flex-1 px-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 mb-8`}>
          <Ionicons name="arrow-back" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-3xl font-bold mb-2`}>Verify Phone</Text>
        <Text style={tw`text-gray-600 mb-8`}>Enter the 6-digit code sent to your phone</Text>

        <View style={tw`flex-row justify-between mb-8`}>
          {otp && otp.map((digit, idx) => (
            <TextInput
              // key={idx}
              style={tw`border-2 border-gray-300 w-12 h-14 rounded-xl text-center text-xl font-bold`}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleOtpChange(val, idx)}
            />
          ))}
        </View>

        <TouchableOpacity style={tw`mb-6`}>
          <Text style={tw`text-blue-600 text-center`}>Resend Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-blue-600 py-4 rounded-xl`}
          onPress={() => router.push('/createPin')}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

