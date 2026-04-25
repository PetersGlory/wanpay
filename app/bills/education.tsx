import { DARK_BG } from '@/constants/customConstants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
  SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import tw from 'twrnc';

export default function EducationScreen() {
  const router = useRouter();
  const [institution, setInstitution] = useState('');
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ institution: '', studentId: '', amount: '' });

  const handleAmountChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setAmount(numeric);
    if (errors.amount) setErrors(p => ({ ...p, amount: '' }));
  };

  const validateForm = () => {
    const newErrors = { institution: '', studentId: '', amount: '' };
    let isValid = true;
    if (!institution.trim()) { newErrors.institution = 'Institution name is required'; isValid = false; }
    if (!studentId.trim()) { newErrors.studentId = 'Student ID is required'; isValid = false; }
    if (!parseFloat(amount) || parseFloat(amount) <= 0) { newErrors.amount = 'Enter a valid amount'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Education payment has been processed', [
        { text: 'Done', onPress: () => router.back() },
      ]);
    } catch { Alert.alert('Error', 'Unable to process request. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  const isDisabled = isSubmitting || !institution || !studentId || !amount;

  return (
    <SafeAreaView style={[tw`flex-1 py-5`, { backgroundColor: DARK_BG }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>

        {/* Header */}
        <View style={tw`px-5 pt-4 pb-5 border-b border-white/7`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => router.back()} style={tw`w-[38px] h-[38px] rounded-xl bg-white/7 items-center justify-center mr-4`} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.75)" />
            </TouchableOpacity>
            <View>
              <Text style={tw`text-white text-[20px] font-bold tracking-tight`}>Education payment</Text>
              <Text style={tw`text-white/35 text-[12px] mt-0.5`}>Pay school fees and education bills</Text>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-5 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10`}>

          {/* Institution */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide mb-2`}>Institution name</Text>
            <View style={tw`bg-white/5 border ${errors.institution ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 h-[52px] justify-center`}>
              <TextInput
                style={tw`text-[14px] text-white`}
                placeholder="Enter institution name"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={institution}
                onChangeText={t => { setInstitution(t); if (errors.institution) setErrors(p => ({ ...p, institution: '' })); }}
                autoCapitalize="words"
              />
            </View>
            {errors.institution ? <Text style={tw`text-red-400 text-[11px] mt-1.5 ml-1`}>{errors.institution}</Text> : null}
          </View>

          {/* Student ID */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide mb-2`}>Student ID / matric number</Text>
            <View style={tw`bg-white/5 border ${errors.studentId ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 h-[52px] justify-center`}>
              <TextInput
                style={tw`text-[14px] text-white`}
                placeholder="Enter student ID"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={studentId}
                onChangeText={t => { setStudentId(t); if (errors.studentId) setErrors(p => ({ ...p, studentId: '' })); }}
              />
            </View>
            {errors.studentId ? <Text style={tw`text-red-400 text-[11px] mt-1.5 ml-1`}>{errors.studentId}</Text> : null}
          </View>

          {/* Amount */}
          <View style={tw`mb-7`}>
            <Text style={tw`text-white/55 text-[12px] font-semibold tracking-wide mb-2`}>Amount</Text>
            <View style={tw`bg-white/5 border ${errors.amount ? 'border-red-500/70' : 'border-white/10'} rounded-2xl px-4 h-[60px] flex-row items-center`}>
              <Text style={tw`text-white/40 text-[20px] mr-2`}>₦</Text>
              <TextInput
                style={tw`flex-1 text-[24px] font-bold text-white`}
                placeholder="0"
                placeholderTextColor="rgba(255,255,255,0.15)"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={handleAmountChange}
              />
            </View>
            {errors.amount ? <Text style={tw`text-red-400 text-[11px] mt-1.5 ml-1`}>{errors.amount}</Text> : null}
          </View>

          {/* Info notice */}
          <View style={tw`bg-emerald-500/10 border border-emerald-500/15 rounded-2xl p-4 mb-7 flex-row items-center gap-3`}>
            <View style={tw`w-9 h-9 rounded-xl bg-emerald-500/20 items-center justify-center flex-shrink-0`}>
              <Ionicons name="information-circle-outline" size={18} color="#34d399" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-emerald-300 text-[13px] font-semibold mb-0.5`}>Payment information</Text>
              <Text style={tw`text-emerald-400/55 text-[11px] leading-4`}>Ensure all details are correct. Payments are processed immediately.</Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={tw`bg-blue-500 h-[52px] rounded-2xl items-center justify-center ${isDisabled ? 'opacity-50' : ''}`}
            disabled={isDisabled}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white font-semibold text-[15px] tracking-tight`}>Continue</Text>}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}