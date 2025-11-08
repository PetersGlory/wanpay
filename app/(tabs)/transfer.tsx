import React, { useMemo, useState } from 'react';
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

type TransferErrors = {
  bank: string;
  accountNumber: string;
  amount: string;
};

const bankOptions = ['Access Bank', 'GTBank', 'UBA', 'First Bank', 'Zenith Bank'];

export default function TransferScreen() {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSelectingBank, setIsSelectingBank] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<TransferErrors>({ bank: '', accountNumber: '', amount: '' });

  const formattedAmount = useMemo(() => {
    if (!amount) return '';
    const numeric = amount.replace(/[^0-9.]/g, '');
    const parts = numeric.split('.');
    const integerPart = parts[0] ?? '';
    const decimalPart = parts[1]?.slice(0, 2) ?? '';
    const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${withCommas}.${decimalPart}` : withCommas;
  }, [amount]);

  const handleAmountChange = (value: string) => {
    const numeric = value.replace(/[^0-9.]/g, '');
    const segments = numeric.split('.');
    if (segments.length > 2) return;
    if (segments[1] && segments[1].length > 2) return;
    setAmount(numeric);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleAccountNumberChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    if (numeric.length <= 10) {
      setAccountNumber(numeric);
      if (errors.accountNumber) setErrors((prev) => ({ ...prev, accountNumber: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: TransferErrors = { bank: '', accountNumber: '', amount: '' };
    let isValid = true;

    if (!selectedBank) {
      newErrors.bank = 'Please select a bank';
      isValid = false;
    }

    if (accountNumber.length !== 10) {
      newErrors.accountNumber = 'Account number must be 10 digits';
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
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert('Transfer Initiated', `You are sending ₦${formattedAmount || amount} to ${selectedBank}.`, [
        { text: 'Done', onPress: () => router.push('/(tabs)/history') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Unable to initiate transfer. Please try again.');
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
        <ScrollView
          style={tw`flex-1 px-6`}
          contentContainerStyle={tw`pb-12`}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`flex-row items-center mb-8`}>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={28} color="#111827" />
            </TouchableOpacity>
            <Text style={tw`text-2xl font-bold ml-4 text-gray-900`}>Send Money</Text>
          </View>

          <View style={tw`bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex-row items-center`}>
            <View style={tw`bg-white w-12 h-12 rounded-full items-center justify-center mr-4`}>
              <Ionicons name="shield-checkmark" size={24} color="#2563eb" />
            </View>
            <Text style={tw`text-blue-900 flex-1 text-sm leading-5`}>
              Transfers are protected by WanPay’s fraud detection system. Double-check your recipient details before continuing.
            </Text>
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Select Bank</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`border ${errors.bank ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row justify-between items-center bg-gray-50`}
              onPress={() => setIsSelectingBank(!isSelectingBank)}
            >
              <Text style={tw`text-gray-900`}>{selectedBank || 'Choose bank...'}</Text>
              <Ionicons name={isSelectingBank ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
            </TouchableOpacity>
            {errors.bank ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.bank}</Text> : null}

            {isSelectingBank ? (
              <View style={tw`mt-3 border border-gray-200 rounded-xl bg-white shadow-sm`}>
                {bankOptions.map((bank) => (
                  <TouchableOpacity
                    key={bank}
                    style={tw`px-4 py-3 flex-row justify-between items-center ${selectedBank === bank ? 'bg-blue-50' : ''}`}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedBank(bank);
                      setIsSelectingBank(false);
                      if (errors.bank) setErrors((prev) => ({ ...prev, bank: '' }));
                    }}
                  >
                    <Text style={tw`text-gray-900`}>{bank}</Text>
                    {selectedBank === bank ? <Ionicons name="checkmark" size={18} color="#2563eb" /> : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Account Number</Text>
            <TextInput
              style={tw`border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900`}
              placeholder="Enter account number"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              maxLength={10}
              value={accountNumber}
              onChangeText={handleAccountNumberChange}
            />
            {errors.accountNumber ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.accountNumber}</Text> : null}
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Amount</Text>
            <View
              style={tw`border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <Text style={tw`text-xl mr-3 text-gray-900`}>₦</Text>
              <TextInput
                style={tw`flex-1 text-2xl font-bold text-gray-900`}
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
                value={formattedAmount}
                onChangeText={handleAmountChange}
              />
            </View>
            {errors.amount ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.amount}</Text> : null}
          </View>

          <View style={tw`mb-8`}>
            <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Description (Optional)</Text>
            <TextInput
              style={tw`border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900 h-24`}
              placeholder="What is this transfer for?"
              placeholderTextColor="#9ca3af"
              multiline
              value={description}
              onChangeText={setDescription}
              maxLength={120}
            />
            <Text style={tw`text-gray-400 text-xs mt-1 ml-1`}>{120 - description.length} characters remaining</Text>
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl shadow-lg ${isSubmitting ? 'opacity-60' : ''}`}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={tw`flex-row justify-center items-center`}>
                <Ionicons name="paper-plane" size={18} color="#fff" style={tw`mr-2`} />
                <Text style={tw`text-white text-center font-bold text-lg`}>Continue</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={tw`mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Tips</Text>
            <Text style={tw`text-gray-500 text-sm leading-5`}>
              Double-check the account number and bank name. WanPay cannot reverse transfers sent to the wrong account.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

