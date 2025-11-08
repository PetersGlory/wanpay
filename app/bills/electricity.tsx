import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
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

interface DiscoProvider {
  id: string;
  name: string;
  shortName: string;
}

export default function ElectricityScreen() {
  const router = useRouter();
  const [selectedDisco, setSelectedDisco] = useState<DiscoProvider | null>(null);
  const [meterNumber, setMeterNumber] = useState('');
  const [meterType, setMeterType] = useState<'prepaid' | 'postpaid'>('prepaid');
  const [amount, setAmount] = useState('');
  const [showDiscos, setShowDiscos] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ disco: '', meter: '', amount: '' });

  const discoProviders: DiscoProvider[] = [
    { id: 'ekedc', name: 'Eko Electricity Distribution Company', shortName: 'EKEDC' },
    { id: 'ikedc', name: 'Ikeja Electric', shortName: 'IKEDC' },
    { id: 'aedc', name: 'Abuja Electricity Distribution Company', shortName: 'AEDC' },
    { id: 'phed', name: 'Port Harcourt Electricity Distribution', shortName: 'PHED' },
    { id: 'ibedc', name: 'Ibadan Electricity Distribution Company', shortName: 'IBEDC' },
    { id: 'kedco', name: 'Kano Electricity Distribution Company', shortName: 'KEDCO' },
  ];

  const quickAmounts = [1000, 2000, 5000, 10000, 20000];

  const handleMeterChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    if (numeric.length <= 20) {
      setMeterNumber(numeric);
      setCustomerName('');
      if (errors.meter) setErrors((prev) => ({ ...prev, meter: '' }));
    }
  };

  const handleValidateMeter = async () => {
    if (meterNumber.length >= 11 && selectedDisco) {
      setIsValidating(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCustomerName('John Doe');
      } catch (error) {
        Alert.alert('Error', 'Invalid meter number. Please check and try again.');
      } finally {
        setIsValidating(false);
      }
    }
  };

  const handleAmountChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setAmount(numeric);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const validateForm = () => {
    const newErrors = { disco: '', meter: '', amount: '' };
    let isValid = true;

    if (!selectedDisco) {
      newErrors.disco = 'Please select a disco';
      isValid = false;
    }

    if (meterNumber.length < 11) {
      newErrors.meter = 'Meter number must be at least 11 digits';
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
      Alert.alert('Success', `₦${amount} electricity token will be sent to your phone`, [
        { text: 'Done', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Unable to process request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-white`}>
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
              <Text style={tw`text-xl font-bold text-gray-900`}>Electricity Bill</Text>
              <Text style={tw`text-xs text-gray-500`}>Pay your electricity bills</Text>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-6 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          {/* Select Disco */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Disco</Text>
            <TouchableOpacity
              style={tw`border ${errors.disco ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-4 flex-row justify-between items-center bg-gray-50`}
              onPress={() => setShowDiscos(true)}
              activeOpacity={0.7}
            >
              {selectedDisco ? (
                <View>
                  <Text style={tw`font-semibold text-gray-900`}>{selectedDisco.shortName}</Text>
                  <Text style={tw`text-xs text-gray-500`}>{selectedDisco.name}</Text>
                </View>
              ) : (
                <Text style={tw`text-gray-400`}>Choose your electricity provider</Text>
              )}
              <Ionicons name="chevron-down" size={24} color="#9ca3af" />
            </TouchableOpacity>
            {errors.disco ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.disco}</Text> : null}

            {/* Disco Modal */}
            <Modal visible={showDiscos} animationType="slide" transparent>
              <View style={tw`flex-1 justify-end bg-black/50`}>
                <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 max-h-[70%]`}>
                  <View style={tw`px-6 pb-4 border-b border-gray-100`}>
                    <View style={tw`flex-row justify-between items-center`}>
                      <Text style={tw`text-xl font-bold text-gray-900`}>Select Disco</Text>
                      <TouchableOpacity onPress={() => setShowDiscos(false)} activeOpacity={0.7}>
                        <Ionicons name="close" size={28} color="#111827" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={discoProviders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={tw`px-6 py-4 border-b border-gray-100`}
                        onPress={() => {
                          setSelectedDisco(item);
                          setShowDiscos(false);
                          if (errors.disco) setErrors((prev) => ({ ...prev, disco: '' }));
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={tw`font-bold text-gray-900`}>{item.shortName}</Text>
                        <Text style={tw`text-sm text-gray-500 mt-1`}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>

          {/* Meter Type */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Meter Type</Text>
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                style={[
                  tw`flex-1 py-3 rounded-xl border-2`,
                  meterType === 'prepaid'
                    ? tw`bg-orange-50 border-orange-600`
                    : tw`bg-gray-50 border-gray-200`,
                ]}
                onPress={() => setMeterType('prepaid')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    tw`text-center font-semibold`,
                    meterType === 'prepaid' ? tw`text-orange-600` : tw`text-gray-600`,
                  ]}
                >
                  Prepaid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex-1 py-3 rounded-xl border-2`,
                  meterType === 'postpaid'
                    ? tw`bg-orange-50 border-orange-600`
                    : tw`bg-gray-50 border-gray-200`,
                ]}
                onPress={() => setMeterType('postpaid')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    tw`text-center font-semibold`,
                    meterType === 'postpaid' ? tw`text-orange-600` : tw`text-gray-600`,
                  ]}
                >
                  Postpaid
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Meter Number */}
          <View style={tw`mb-2`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Meter Number</Text>
            <View
              style={tw`border ${errors.meter ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <TextInput
                style={tw`flex-1 text-base text-gray-900`}
                placeholder="Enter meter number"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                value={meterNumber}
                onChangeText={handleMeterChange}
                onBlur={handleValidateMeter}
                maxLength={20}
              />
              {isValidating && <ActivityIndicator size="small" color="#f59e0b" />}
            </View>
            {errors.meter ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.meter}</Text> : null}
          </View>
          {customerName && (
            <View style={tw`bg-green-50 border border-green-200 p-3 rounded-xl mb-6 flex-row items-center`}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={tw`text-green-700 font-semibold ml-2`}>{customerName}</Text>
            </View>
          )}
          {!customerName && <View style={tw`mb-6`} />}

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
                style={tw`bg-orange-50 border border-orange-100 px-4 py-2 rounded-full`}
                onPress={() => {
                  setAmount(amt.toString());
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                }}
                activeOpacity={0.7}
              >
                <Text style={tw`text-orange-600 font-semibold`}>₦{amt.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Box */}
          <View style={tw`bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6 flex-row`}>
            <Ionicons name="information-circle" size={20} color="#f59e0b" style={tw`mr-2`} />
            <Text style={tw`text-xs text-gray-700 flex-1`}>
              Your token will be sent via SMS and shown on the next screen
            </Text>
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${isSubmitting || !selectedDisco || meterNumber.length < 11 || !amount ? 'opacity-60' : ''}`}
            disabled={isSubmitting || !selectedDisco || meterNumber.length < 11 || !amount}
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

