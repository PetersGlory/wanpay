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
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const validateForm = () => {
    const newErrors = { institution: '', studentId: '', amount: '' };
    let isValid = true;

    if (!institution.trim()) {
      newErrors.institution = 'Institution name is required';
      isValid = false;
    }

    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
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
      Alert.alert('Success', 'Education payment has been processed', [
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
              <Text style={tw`text-xl font-bold text-gray-900`}>Education Payment</Text>
              <Text style={tw`text-xs text-gray-500`}>Pay school fees and other education bills</Text>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-6 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Institution Name</Text>
            <TextInput
              style={tw`border ${errors.institution ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900`}
              placeholder="Enter institution name"
              placeholderTextColor="#9ca3af"
              value={institution}
              onChangeText={(text) => {
                setInstitution(text);
                if (errors.institution) setErrors((prev) => ({ ...prev, institution: '' }));
              }}
              autoCapitalize="words"
            />
            {errors.institution ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.institution}</Text> : null}
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Student ID/Matric Number</Text>
            <TextInput
              style={tw`border ${errors.studentId ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-gray-50 text-base text-gray-900`}
              placeholder="Enter student ID"
              placeholderTextColor="#9ca3af"
              value={studentId}
              onChangeText={(text) => {
                setStudentId(text);
                if (errors.studentId) setErrors((prev) => ({ ...prev, studentId: '' }));
              }}
            />
            {errors.studentId ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.studentId}</Text> : null}
          </View>

          <View style={tw`mb-6`}>
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

          <View style={tw`bg-green-50 border border-green-100 p-4 rounded-xl mb-6`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="information-circle" size={20} color="#10b981" />
              <Text style={tw`text-green-900 font-semibold ml-2`}>Payment Information</Text>
            </View>
            <Text style={tw`text-xs text-gray-600`}>
              Please ensure all details are correct before proceeding. Payments are processed immediately.
            </Text>
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${isSubmitting || !institution || !studentId || !amount ? 'opacity-60' : ''}`}
            disabled={isSubmitting || !institution || !studentId || !amount}
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

