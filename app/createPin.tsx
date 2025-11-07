import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import tw from 'twrnc';

type PinErrors = {
  pin: string;
  confirmPin: string;
};

export default function CreatePinScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<PinErrors>({ pin: '', confirmPin: '' });

  const validatePin = () => {
    const newErrors: PinErrors = { pin: '', confirmPin: '' };
    let isValid = true;

    if (pin.length !== 4) {
      newErrors.pin = 'PIN must be 4 digits';
      isValid = false;
    }

    if (confirmPin.length !== 4) {
      newErrors.confirmPin = 'Confirm PIN must be 4 digits';
      isValid = false;
    } else if (pin !== confirmPin) {
      newErrors.confirmPin = 'PINs do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePinChange = (value: string, field: 'pin' | 'confirm') => {
    const numeric = value.replace(/[^0-9]/g, '');
    if (numeric.length > 4) return;
    if (field === 'pin') {
      setPin(numeric);
      if (errors.pin) setErrors((prev) => ({ ...prev, pin: '' }));
    } else {
      setConfirmPin(numeric);
      if (errors.confirmPin) setErrors((prev) => ({ ...prev, confirmPin: '' }));
    }
  };

  const handleComplete = async () => {
    if (!validatePin()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      Alert.alert('PIN Created', 'Your account is now secured with your new PIN.', [
        { text: 'Continue', onPress: () => router.replace('/(tabs)') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Unable to create PIN. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 mb-6 w-10`} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={28} color="#111827" />
          </TouchableOpacity>

          <View style={tw`mb-8`}>
            <Text style={tw`text-3xl font-bold mb-2 text-gray-900`}>Create PIN</Text>
            <Text style={tw`text-gray-600 text-base leading-6`}>
              Create a 4-digit PIN to secure your WanPay account. You will use this PIN to authorise transactions.
            </Text>
          </View>

          <View style={tw`bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex-row items-start`}>
            <View style={tw`bg-white w-10 h-10 rounded-full items-center justify-center mr-3`}>
              <Ionicons name="lock-closed" size={20} color="#2563eb" />
            </View>
            <Text style={tw`text-blue-900 text-sm leading-5 flex-1`}>
              Choose a PIN that you can remember easily but isn’t obvious to others. Avoid using repeating numbers like 1111.
            </Text>
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Enter PIN</Text>
            <View
              style={tw`border ${errors.pin ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <TextInput
                style={tw`flex-1 text-xl tracking-[8px] text-gray-900`}
                placeholder="••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPin}
                keyboardType="number-pad"
                maxLength={4}
                value={pin}
                onChangeText={(value) => handlePinChange(value, 'pin')}
              />
              <TouchableOpacity onPress={() => setShowPin(!showPin)} activeOpacity={0.7}>
                <Ionicons name={showPin ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {errors.pin ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.pin}</Text> : null}
          </View>

          <View style={tw`mb-10`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Confirm PIN</Text>
            <View
              style={tw`border ${errors.confirmPin ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <TextInput
                style={tw`flex-1 text-xl tracking-[8px] text-gray-900`}
                placeholder="••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showConfirmPin}
                keyboardType="number-pad"
                maxLength={4}
                value={confirmPin}
                onChangeText={(value) => handlePinChange(value, 'confirm')}
              />
              <TouchableOpacity onPress={() => setShowConfirmPin(!showConfirmPin)} activeOpacity={0.7}>
                <Ionicons name={showConfirmPin ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {errors.confirmPin ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.confirmPin}</Text> : null}
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl shadow-lg ${isSubmitting ? 'opacity-60' : ''}`}
            onPress={handleComplete}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`text-white text-center font-bold text-lg`}>Create PIN</Text>
            )}
          </TouchableOpacity>

          <View style={tw`mt-6 flex-row items-center justify-center`}>
            <Ionicons name="shield-checkmark" size={16} color="#10b981" />
            <Text style={tw`text-gray-500 text-sm ml-2`}>Your PIN is encrypted and never stored in plain text.</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

