import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
import tw from 'twrnc';

export default function PersonalInformationScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: 'Samuel Adebayo',
    phoneNumber: '+234 801 234 5678',
    email: 'samuel.adebayo@example.com',
    dateOfBirth: '15/03/1995',
    address: '123 Main Street, Lagos, Nigeria',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '100001',
    country: 'Nigeria',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEditing(false);
      Alert.alert('Success', 'Your personal information has been updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handlePhoneChange = (text: string) => {
    const numeric = text.replace(/[^0-9+ ]/g, '');
    handleChange('phoneNumber', numeric);
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-gray-50`}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        {/* Header */}
        <View style={tw`px-3 py-4 border-b border-gray-100 bg-white`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={24} color="#111827" />
              </TouchableOpacity>
              <View>
                <Text style={tw`text-xl font-bold text-gray-900`}>Personal Information</Text>
                <Text style={tw`text-xs text-gray-500`}>Manage your account details</Text>
              </View>
            </View>
            {!editing ? (
              <TouchableOpacity
                onPress={() => setEditing(true)}
                style={tw`bg-blue-50 px-4 py-2 rounded-full`}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={18} color="#2563eb" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setEditing(false);
                  setErrors({});
                }}
                style={tw`px-4 py-2`}
                activeOpacity={0.7}
              >
                <Text style={tw`text-gray-600 font-semibold`}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          {/* Profile Photo Section */}
          <View style={tw`items-center mb-8`}>
            <View style={tw`bg-blue-600 w-24 h-24 rounded-full items-center justify-center mb-4`}>
              <Text style={tw`text-white text-3xl font-semibold`}>SA</Text>
            </View>
            {editing && (
              <TouchableOpacity
                style={tw`bg-blue-600 px-6 py-2 rounded-full`}
                activeOpacity={0.7}
              >
                <Text style={tw`text-white font-semibold`}>Change Photo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Full Name */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Full Name</Text>
            <View
              style={tw`border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-white`}
            >
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                editable={editing}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>
            {errors.fullName ? <Text style={tw`text-red-500 text-xs mt-1`}>{errors.fullName}</Text> : null}
          </View>

          {/* Email */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Email Address</Text>
            <View
              style={tw`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-white`}
            >
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                editable={editing}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
              />
            </View>
            {errors.email ? <Text style={tw`text-red-500 text-xs mt-1`}>{errors.email}</Text> : null}
          </View>

          {/* Phone Number */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Phone Number</Text>
            <View
              style={tw`border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-white`}
            >
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.phoneNumber}
                onChangeText={handlePhoneChange}
                editable={editing}
                keyboardType="phone-pad"
                placeholder="+234 801 234 5678"
                placeholderTextColor="#9ca3af"
              />
            </View>
            {errors.phoneNumber ? <Text style={tw`text-red-500 text-xs mt-1`}>{errors.phoneNumber}</Text> : null}
          </View>

          {/* Date of Birth */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Date of Birth</Text>
            <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-white`}>
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.dateOfBirth}
                onChangeText={(text) => handleChange('dateOfBirth', text)}
                editable={editing}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Address */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Address</Text>
            <View
              style={tw`border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 bg-white`}
            >
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.address}
                onChangeText={(text) => handleChange('address', text)}
                editable={editing}
                multiline
                placeholder="Enter your address"
                placeholderTextColor="#9ca3af"
              />
            </View>
            {errors.address ? <Text style={tw`text-red-500 text-xs mt-1`}>{errors.address}</Text> : null}
          </View>

          {/* City */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>City</Text>
            <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-white`}>
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.city}
                onChangeText={(text) => handleChange('city', text)}
                editable={editing}
                placeholder="Enter your city"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* State */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>State</Text>
            <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-white`}>
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.state}
                onChangeText={(text) => handleChange('state', text)}
                editable={editing}
                placeholder="Enter your state"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Postal Code */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Postal Code</Text>
            <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-white`}>
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.postalCode}
                onChangeText={(text) => handleChange('postalCode', text)}
                editable={editing}
                placeholder="Enter postal code"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Country */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Country</Text>
            <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-white`}>
              <TextInput
                style={tw`text-base text-gray-900`}
                value={formData.country}
                onChangeText={(text) => handleChange('country', text)}
                editable={editing}
                placeholder="Enter your country"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {editing && (
            <TouchableOpacity
              style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg`}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={tw`text-white text-center font-bold text-lg`}>Save Changes</Text>
              )}
            </TouchableOpacity>
          )}

          {/* Info Card */}
          <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="information-circle" size={20} color="#3b82f6" />
              <Text style={tw`text-blue-900 font-semibold ml-2`}>Verification Required</Text>
            </View>
            <Text style={tw`text-xs text-gray-600`}>
              Some changes may require identity verification. You'll be notified if additional documents are needed.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

