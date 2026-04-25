import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
  SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { DARK_BG } from '@/constants/customConstants';

type TransferErrors = { bank: string; accountNumber: string; amount: string };

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
    const parts = amount.split('.');
    const int = (parts[0] ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const dec = parts[1]?.slice(0, 2) ?? '';
    return dec ? `${int}.${dec}` : int;
  }, [amount]);

  const handleAmountChange = (value: string) => {
    const numeric = value.replace(/[^0-9.]/g, '');
    const segments = numeric.split('.');
    if (segments.length > 2) return;
    if (segments[1] && segments[1].length > 2) return;
    setAmount(numeric);
    if (errors.amount) setErrors(p => ({ ...p, amount: '' }));
  };

  const handleAccountNumberChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, '');
    if (numeric.length <= 10) {
      setAccountNumber(numeric);
      if (errors.accountNumber) setErrors(p => ({ ...p, accountNumber: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: TransferErrors = { bank: '', accountNumber: '', amount: '' };
    let isValid = true;
    if (!selectedBank) { newErrors.bank = 'Please select a bank'; isValid = false; }
    if (accountNumber.length !== 10) { newErrors.accountNumber = 'Account number must be 10 digits'; isValid = false; }
    if (!parseFloat(amount) || parseFloat(amount) <= 0) { newErrors.amount = 'Enter a valid amount'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Transfer initiated', `Sending ₦${formattedAmount || amount} to ${selectedBank}.`, [
        { text: 'Done', onPress: () => router.push('/(tabs)/history') },
      ]);
    } catch {
      Alert.alert('Error', 'Unable to initiate transfer. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  const inputStyle = (hasError: boolean) =>
    tw`bg-white/5 border ${hasError ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 h-[52px] justify-center`;

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-[${DARK_BG}]`}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView style={tw`flex-1 px-5`} contentContainerStyle={tw`pb-12`} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={tw`flex-row items-start mt-4 mb-7`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`w-[38px] h-[38px] rounded-xl bg-white/7 items-center justify-center mr-4`}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.75)" />
            </TouchableOpacity>
            <View>
              <Text style={tw`text-white text-[20px] font-bold tracking-tight`}>Send money</Text>
              <Text style={tw`text-white/35 text-[12px] mt-0.5`}>Instant bank transfer</Text>
            </View>
          </View>

          {/* Security notice */}
          <View style={tw`bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 flex-row items-center gap-3`}>
            <View style={tw`w-9 h-9 rounded-xl bg-blue-500/20 items-center justify-center flex-shrink-0`}>
              <Ionicons name="shield-checkmark" size={18} color="#60a5fa" />
            </View>
            <Text style={tw`text-blue-300/80 text-[12px] leading-5 flex-1`}>
              Double-check your recipient details before continuing. Transfers cannot be reversed.
            </Text>
          </View>

          {/* Bank selector */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide mb-2`}>Bank</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`bg-white/5 border ${errors.bank ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 h-[52px] flex-row justify-between items-center`}
              onPress={() => setIsSelectingBank(!isSelectingBank)}
            >
              <Text style={tw`${selectedBank ? 'text-white' : 'text-white/25'} text-[14px]`}>
                {selectedBank || 'Choose bank...'}
              </Text>
              <Ionicons name={isSelectingBank ? 'chevron-up' : 'chevron-down'} size={18} color="rgba(255,255,255,0.35)" />
            </TouchableOpacity>
            {errors.bank ? <Text style={tw`text-red-400 text-[11px] mt-1.5 ml-1`}>{errors.bank}</Text> : null}

            {isSelectingBank && (
              <View style={tw`mt-2 bg-[#0f0f1e] border border-white/10 rounded-2xl overflow-hidden`}>
                {bankOptions.map((bank, i) => (
                  <TouchableOpacity
                    key={bank}
                    style={tw`px-4 h-[48px] flex-row justify-between items-center ${selectedBank === bank ? 'bg-blue-500/10' : ''} ${i !== bankOptions.length - 1 ? 'border-b border-white/7' : ''}`}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedBank(bank);
                      setIsSelectingBank(false);
                      if (errors.bank) setErrors(p => ({ ...p, bank: '' }));
                    }}
                  >
                    <Text style={tw`text-white text-[14px]`}>{bank}</Text>
                    {selectedBank === bank && <Ionicons name="checkmark" size={16} color="#60a5fa" />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Account number */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide mb-2`}>Account number</Text>
            <View style={inputStyle(!!errors.accountNumber)}>
              <TextInput
                style={tw`text-[14px] text-white`}
                placeholder="Enter 10-digit account number"
                placeholderTextColor="rgba(255,255,255,0.2)"
                keyboardType="number-pad"
                maxLength={10}
                value={accountNumber}
                onChangeText={handleAccountNumberChange}
              />
            </View>
            {errors.accountNumber ? <Text style={tw`text-red-400 text-[11px] mt-1.5 ml-1`}>{errors.accountNumber}</Text> : null}
          </View>

          {/* Amount */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide mb-2`}>Amount</Text>
            <View style={tw`bg-white/5 border ${errors.amount ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 h-[60px] flex-row items-center`}>
              <Text style={tw`text-white/40 text-[20px] mr-2`}>₦</Text>
              <TextInput
                style={tw`flex-1 text-[24px] font-bold text-white`}
                placeholder="0.00"
                placeholderTextColor="rgba(255,255,255,0.15)"
                keyboardType="decimal-pad"
                value={formattedAmount}
                onChangeText={handleAmountChange}
              />
            </View>
            {errors.amount ? <Text style={tw`text-red-400 text-[11px] mt-1.5 ml-1`}>{errors.amount}</Text> : null}
          </View>

          {/* Description */}
          <View style={tw`mb-8`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide`}>Description</Text>
              <Text style={tw`text-white/25 text-[11px] ml-1.5`}>(optional)</Text>
            </View>
            <View style={tw`bg-white/5 border border-white/10 rounded-2xl px-4 py-3`}>
              <TextInput
                style={tw`text-[14px] text-white h-20`}
                placeholder="What is this transfer for?"
                placeholderTextColor="rgba(255,255,255,0.2)"
                multiline
                value={description}
                onChangeText={setDescription}
                maxLength={120}
              />
            </View>
            <Text style={tw`text-white/25 text-[11px] mt-1 ml-1`}>{120 - description.length} characters remaining</Text>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={tw`bg-blue-500 h-[52px] rounded-2xl items-center justify-center flex-row gap-2 mb-6 ${isSubmitting ? 'opacity-60' : ''}`}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Ionicons name="paper-plane-outline" size={17} color="#fff" />
                  <Text style={tw`text-white font-semibold text-[15px] tracking-tight`}>Continue</Text>
                </>
            }
          </TouchableOpacity>

          {/* Tip */}
          <View style={tw`bg-white/4 border border-white/7 rounded-2xl p-4`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold mb-1.5`}>Tip</Text>
            <Text style={tw`text-white/30 text-[12px] leading-5`}>
              WanPay cannot reverse transfers sent to the wrong account. Always verify recipient details.
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}