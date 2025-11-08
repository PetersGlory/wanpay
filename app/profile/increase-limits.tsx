import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';

interface LimitType {
  id: string;
  name: string;
  current: string;
  requested: string;
  max: string;
  icon: string;
  color: string;
}

export default function IncreaseLimitsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<string | null>(null);
  const [requestedAmount, setRequestedAmount] = useState('');

  const [limits, setLimits] = useState<LimitType[]>([
    {
      id: 'daily',
      name: 'Daily Transfer Limit',
      current: '₦500,000',
      requested: '',
      max: '₦5,000,000',
      icon: 'arrow-forward-circle',
      color: '#2563eb',
    },
    {
      id: 'monthly',
      name: 'Monthly Transfer Limit',
      current: '₦10,000,000',
      requested: '',
      max: '₦50,000,000',
      icon: 'calendar-outline',
      color: '#7c3aed',
    },
    {
      id: 'single',
      name: 'Single Transaction Limit',
      current: '₦1,000,000',
      requested: '',
      max: '₦10,000,000',
      icon: 'cash-outline',
      color: '#10b981',
    },
    {
      id: 'bill',
      name: 'Daily Bill Payment Limit',
      current: '₦200,000',
      requested: '',
      max: '₦1,000,000',
      icon: 'document-text-outline',
      color: '#f59e0b',
    },
  ]);

  const handleAmountChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setRequestedAmount(numeric);
  };

  const handleRequestIncrease = async () => {
    if (!selectedLimit) {
      Alert.alert('Error', 'Please select a limit type');
      return;
    }

    if (!requestedAmount || parseFloat(requestedAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const limit = limits.find((l) => l.id === selectedLimit);
    if (!limit) return;

    const currentNum = parseFloat(limit.current.replace(/[^0-9]/g, ''));
    const requestedNum = parseFloat(requestedAmount);
    const maxNum = parseFloat(limit.max.replace(/[^0-9]/g, ''));

    if (requestedNum <= currentNum) {
      Alert.alert('Error', 'Requested amount must be greater than current limit');
      return;
    }

    if (requestedNum > maxNum) {
      Alert.alert('Error', `Requested amount cannot exceed maximum limit of ${limit.max}`);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert(
        'Request Submitted',
        `Your request to increase ${limit.name} to ₦${parseFloat(requestedAmount).toLocaleString()} has been submitted. Our team will review it and get back to you within 24-48 hours.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedLimit(null);
              setRequestedAmount('');
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedLimitData = limits.find((l) => l.id === selectedLimit);

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-gray-50`}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw`px-3 py-4 border-b border-gray-100 bg-white`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Increase Limits</Text>
            <Text style={tw`text-xs text-gray-500`}>Request higher transaction limits</Text>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Info Card */}
        <View style={tw`bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="information-circle" size={24} color="#2563eb" />
            <Text style={tw`text-blue-900 font-bold text-lg ml-3`}>Limit Increase Request</Text>
          </View>
          <Text style={tw`text-blue-700 text-sm mb-2`}>
            Request an increase to your transaction limits. All requests are reviewed within 24-48 hours.
          </Text>
          <Text style={tw`text-blue-600 text-xs font-semibold`}>
            Note: Higher limits may require additional verification documents.
          </Text>
        </View>

        {/* Account Tier */}
        <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Text style={tw`text-gray-900 font-bold text-base`}>Account Tier</Text>
              <Text style={tw`text-gray-500 text-sm mt-1`}>Tier 2 • Verified</Text>
            </View>
            <TouchableOpacity
              style={tw`bg-purple-100 px-4 py-2 rounded-full`}
              onPress={() => Alert.alert('Upgrade', 'Upgrade to Tier 3 for higher limits.')}
            >
              <Text style={tw`text-purple-700 font-semibold text-sm`}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Select Limit Type */}
        {!selectedLimit ? (
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Select Limit Type</Text>
            <View style={tw`gap-3`}>
              {limits.map((limit) => {
                const currentNum = parseFloat(limit.current.replace(/[^0-9]/g, ''));
                const maxNum = parseFloat(limit.max.replace(/[^0-9]/g, ''));
                const percentage = Math.round((currentNum / maxNum) * 100);

                return (
                  <TouchableOpacity
                    key={limit.id}
                    style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}
                    onPress={() => setSelectedLimit(limit.id)}
                    activeOpacity={0.7}
                  >
                    <View style={tw`flex-row items-center mb-4`}>
                      <View style={tw`bg-blue-50 w-12 h-12 rounded-full items-center justify-center mr-3`}>
                        <Ionicons name={limit.icon as any} size={24} color={limit.color} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-gray-900 font-bold text-base`}>{limit.name}</Text>
                        <Text style={tw`text-gray-500 text-xs mt-1`}>
                          Current: {limit.current} • Max: {limit.max}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </View>
                    <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                      <View
                        style={[
                          tw`h-full rounded-full`,
                          { width: `${percentage}%`, backgroundColor: limit.color },
                        ]}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={tw`mb-6`}>
            {/* Selected Limit Details */}
            <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm`}>
              <View style={tw`flex-row items-center mb-4`}>
                <View style={tw`bg-blue-50 w-12 h-12 rounded-full items-center justify-center mr-3`}>
                  <Ionicons name={selectedLimitData?.icon as any} size={24} color={selectedLimitData?.color} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-gray-900 font-bold text-base`}>{selectedLimitData?.name}</Text>
                  <Text style={tw`text-gray-500 text-xs mt-1`}>
                    Current: {selectedLimitData?.current}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedLimit(null)}>
                  <Ionicons name="close-circle" size={24} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              {/* Request Amount */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Requested Amount</Text>
                <View style={tw`border border-gray-300 rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}>
                  <Text style={tw`text-xl text-gray-700 mr-2`}>₦</Text>
                  <TextInput
                    style={tw`flex-1 text-xl font-bold text-gray-900`}
                    placeholder="0"
                    placeholderTextColor="#9ca3af"
                    keyboardType="number-pad"
                    value={requestedAmount}
                    onChangeText={handleAmountChange}
                  />
                </View>
                <Text style={tw`text-gray-500 text-xs mt-2`}>
                  Maximum allowed: {selectedLimitData?.max}
                </Text>
              </View>

              {/* Quick Amounts */}
              <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
                {[
                  parseFloat(selectedLimitData!.current.replace(/[^0-9]/g, '')) * 2,
                  parseFloat(selectedLimitData!.current.replace(/[^0-9]/g, '')) * 3,
                  parseFloat(selectedLimitData!.max.replace(/[^0-9]/g, '')) * 0.5,
                  parseFloat(selectedLimitData!.max.replace(/[^0-9]/g, '')) * 0.75,
                ]
                  .filter((amt) => amt > parseFloat(selectedLimitData!.current.replace(/[^0-9]/g, '')))
                  .map((amt) => (
                    <TouchableOpacity
                      key={amt}
                      style={tw`bg-blue-50 px-4 py-2 rounded-full border border-blue-100`}
                      onPress={() => setRequestedAmount(Math.round(amt).toString())}
                      activeOpacity={0.7}
                    >
                      <Text style={tw`text-blue-600 font-semibold`}>₦{Math.round(amt).toLocaleString()}</Text>
                    </TouchableOpacity>
                  ))}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={tw`bg-blue-600 py-4 rounded-xl ${loading || !requestedAmount ? 'opacity-60' : ''}`}
                onPress={handleRequestIncrease}
                disabled={loading || !requestedAmount}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={tw`text-white text-center font-bold text-lg`}>Submit Request</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Requirements */}
        <View style={tw`bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="document-text-outline" size={20} color="#f59e0b" />
            <Text style={tw`text-amber-900 font-semibold ml-2`}>Required Documents</Text>
          </View>
          <Text style={tw`text-xs text-amber-700 mb-2`}>• Valid ID (National ID, Driver's License, or Passport)</Text>
          <Text style={tw`text-xs text-amber-700 mb-2`}>• Proof of address (Utility bill or Bank statement)</Text>
          <Text style={tw`text-xs text-amber-700`}>• Bank verification document (if applicable)</Text>
        </View>

        {/* Process Info */}
        <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="time-outline" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-900 font-semibold ml-2`}>Review Process</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Your request will be reviewed within 24-48 hours
          </Text>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • You'll receive a notification once your request is approved or if additional documents are needed
          </Text>
          <Text style={tw`text-xs text-gray-600`}>
            • Approved limits take effect immediately after approval
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

