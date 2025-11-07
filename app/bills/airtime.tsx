import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

interface Network {
  id: string;
  name: string;
  color: string;
}

export default function AirtimeScreen() {
  const router = useRouter();
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ network: '', phone: '', amount: '' });

  const networks: Network[] = [
    { id: 'mtn', name: 'MTN', color: '#FFCC00' },
    { id: 'glo', name: 'Glo', color: '#00A95C' },
    { id: 'airtel', name: 'Airtel', color: '#ED1C24' },
    { id: '9mobile', name: '9mobile', color: '#00853E' },
  ];

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handlePhoneChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    if (numeric.length <= 10) {
      setPhoneNumber(numeric);
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleAmountChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setAmount(numeric);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const validateForm = () => {
    const newErrors = { network: '', phone: '', amount: '' };
    let isValid = true;

    if (!selectedNetwork) {
      newErrors.network = 'Please select a network';
      isValid = false;
    }

    if (phoneNumber.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      newErrors.amount = 'Enter a valid amount';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert('Success', `₦${amount} airtime has been sent to ${phoneNumber}`, [
        { text: 'Done', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Unable to process request. Please try again.');
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
        {/* Header */}
        <View style={tw`px-6 py-4 border-b border-gray-100 bg-white`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <View>
              <Text style={tw`text-xl font-bold text-gray-900`}>Buy Airtime</Text>
              <Text style={tw`text-xs text-gray-500`}>Instant airtime top-up</Text>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-6 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          {/* Select Network */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Network</Text>
            <View style={tw`flex-row justify-between`}>
              {networks.map((network) => (
                <TouchableOpacity
                  key={network.id}
                  style={[
                    tw`w-[22%] p-3 rounded-2xl items-center border-2`,
                    selectedNetwork?.id === network.id
                      ? { borderColor: network.color, backgroundColor: `${network.color}20` }
                      : tw`border-gray-200 bg-gray-50`,
                  ]}
                  onPress={() => {
                    setSelectedNetwork(network);
                    if (errors.network) setErrors((prev) => ({ ...prev, network: '' }));
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="phone-portrait" size={28} color={network.color} />
                  <Text style={tw`text-xs font-semibold text-gray-900 mt-2`}>{network.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.network ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.network}</Text> : null}
          </View>

          {/* Phone Number */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Phone Number</Text>
            <View
              style={tw`flex-row items-center border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-gray-50`}
            >
              <Text style={tw`text-gray-700 mr-2 font-medium`}>+234</Text>
              <View style={tw`h-5 w-px bg-gray-300 mr-2`} />
              <TextInput
                style={tw`flex-1 text-base text-gray-900`}
                placeholder="8012345678"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                autoComplete="tel"
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="person-circle-outline" size={24} color="#3b82f6" />
              </TouchableOpacity>
            </View>
            {errors.phone ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.phone}</Text> : null}
          </View>

          {/* Amount */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Amount</Text>
            <View
              style={tw`border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <Text style={tw`text-xl text-gray-700 mr-2`}>₦</Text>
              <TextInput
                style={tw`flex-1 text-xl font-bold text-gray-900`}
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>
            {errors.amount ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.amount}</Text> : null}
          </View>

          {/* Quick Amounts */}
          <View style={tw`flex-row flex-wrap gap-2 mb-6`}>
            {quickAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={tw`bg-blue-50 px-4 py-2 rounded-full border border-blue-100`}
                onPress={() => {
                  setAmount(amt.toString());
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                }}
                activeOpacity={0.7}
              >
                <Text style={tw`text-blue-600 font-semibold`}>₦{amt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Beneficiary Info */}
          <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="information-circle" size={20} color="#3b82f6" />
              <Text style={tw`text-blue-900 font-semibold ml-2`}>Save as Beneficiary</Text>
            </View>
            <Text style={tw`text-xs text-gray-600`}>Save this number for quick recharge next time</Text>
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${isSubmitting || !selectedNetwork || phoneNumber.length !== 10 || !amount ? 'opacity-60' : ''}`}
            disabled={isSubmitting || !selectedNetwork || phoneNumber.length !== 10 || !amount}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`text-white text-center font-bold text-lg`}>Continue</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

