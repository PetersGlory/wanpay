import { PRIMARY_COLOR } from '@/constants/customConstants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Resend timer countdown
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (index === 5 && numericValue) {
      const completeOtp = [...newOtp];
      completeOtp[index] = numericValue;
      if (completeOtp.every(digit => digit !== '')) {
        handleVerify(completeOtp.join(''));
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    if (code.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/createPin');
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    Alert.alert('Code Resent', 'A new verification code has been sent to your phone');
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`mt-4 mb-6 w-10`}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>

          <View style={tw`mb-8`}>
            <Text style={tw`text-3xl font-bold mb-2 text-gray-900`}>Verify Phone</Text>
            <Text style={tw`text-gray-600 text-base leading-6`}>
              Enter the 6-digit code sent to{'\n'}
              <Text style={tw`font-semibold text-gray-900`}>+234 801 234 5678</Text>
            </Text>
          </View>

          <View style={tw`flex-row justify-between mb-8`}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={(ref) => {
                  inputRefs.current[idx] = ref;
                }}
                style={tw`border-2 ${
                  digit ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50'
                } w-14 h-16 rounded-xl text-center text-2xl font-bold text-gray-900`}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity
            style={tw`mb-8 ${canResend ? '' : 'opacity-50'}`}
            onPress={handleResend}
            disabled={!canResend}
            activeOpacity={0.7}
          >
            <Text style={tw`text-blue-600 text-center font-medium`}>
              {canResend ? 'Resend Code' : `Resend Code in ${resendTimer}s`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-[${PRIMARY_COLOR}] py-4 rounded-xl shadow-lg ${loading || !isOtpComplete ? 'opacity-70' : ''}`}
            onPress={() => handleVerify()}
            disabled={loading || !isOtpComplete}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`text-white text-center font-bold text-lg`}>Verify</Text>
            )}
          </TouchableOpacity>

          <View style={tw`mt-6 flex-row justify-center items-center`}>
            <Ionicons name="lock-closed-outline" size={16} color="#6b7280" />
            <Text style={tw`text-gray-500 text-sm ml-2`}>
              We'll never share your code with anyone
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

