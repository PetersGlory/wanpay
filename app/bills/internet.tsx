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

interface InternetProvider {
  id: string;
  name: string;
  color: string;
}

interface InternetPlan {
  id: string;
  name: string;
  speed: string;
  price: number;
  validity: string;
}

export default function InternetScreen() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState<InternetProvider | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<InternetPlan | null>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ provider: '', account: '', plan: '' });

  const internetProviders: InternetProvider[] = [
    { id: 'smile', name: 'Smile', color: '#FDB913' },
    { id: 'spectranet', name: 'Spectranet', color: '#E31E24' },
    { id: 'swift', name: 'Swift', color: '#00A651' },
    { id: 'ipnx', name: 'IPNX', color: '#0066CC' },
  ];

  const internetPlans: Record<string, InternetPlan[]> = {
    smile: [
      { id: '1', name: 'SmileVoice & Unlimited Lite', speed: '1.5Mbps', price: 4000, validity: '30 Days' },
      { id: '2', name: 'UnlimitedEssential', speed: '2.5Mbps', price: 8000, validity: '30 Days' },
      { id: '3', name: 'UnlimitedBasic', speed: '5Mbps', price: 12000, validity: '30 Days' },
      { id: '4', name: 'UnlimitedPremium', speed: '10Mbps', price: 16000, validity: '30 Days' },
    ],
    spectranet: [
      { id: '1', name: 'Spectra Lite', speed: '2Mbps', price: 5000, validity: '30 Days' },
      { id: '2', name: 'Spectra Value', speed: '5Mbps', price: 10000, validity: '30 Days' },
      { id: '3', name: 'Spectra Plus', speed: '10Mbps', price: 15000, validity: '30 Days' },
      { id: '4', name: 'Spectra Premium', speed: '20Mbps', price: 20000, validity: '30 Days' },
    ],
    swift: [
      { id: '1', name: 'Swift Lite', speed: '2Mbps', price: 4500, validity: '30 Days' },
      { id: '2', name: 'Swift Value', speed: '5Mbps', price: 9500, validity: '30 Days' },
      { id: '3', name: 'Swift Plus', speed: '10Mbps', price: 14000, validity: '30 Days' },
    ],
    ipnx: [
      { id: '1', name: 'IPNX Basic', speed: '2Mbps', price: 5000, validity: '30 Days' },
      { id: '2', name: 'IPNX Standard', speed: '5Mbps', price: 10000, validity: '30 Days' },
      { id: '3', name: 'IPNX Premium', speed: '10Mbps', price: 15000, validity: '30 Days' },
    ],
  };

  const handleAccountChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    if (numeric.length <= 15) {
      setAccountNumber(numeric);
      setCustomerName('');
      if (errors.account) setErrors((prev) => ({ ...prev, account: '' }));
    }
  };

  const handleValidateAccount = async () => {
    if (accountNumber.length >= 8 && selectedProvider) {
      setIsValidating(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCustomerName('John Doe');
      } catch (error) {
        Alert.alert('Error', 'Invalid account number. Please check and try again.');
      } finally {
        setIsValidating(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = { provider: '', account: '', plan: '' };
    let isValid = true;

    if (!selectedProvider) {
      newErrors.provider = 'Please select a provider';
      isValid = false;
    }

    if (accountNumber.length < 8) {
      newErrors.account = 'Account number must be at least 8 digits';
      isValid = false;
    }

    if (!selectedPlan) {
      newErrors.plan = 'Please select a plan';
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
      Alert.alert('Success', `${selectedPlan?.name} internet plan has been activated`, [
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
              <Text style={tw`text-xl font-bold text-gray-900`}>Internet/Broadband</Text>
              <Text style={tw`text-xs text-gray-500`}>Subscribe to internet plans</Text>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-6 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          {/* Select Provider */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Provider</Text>
            <View style={tw`flex-row gap-3 flex-wrap`}>
              {internetProviders.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  style={[
                    tw`w-[48%] p-4 rounded-2xl items-center border-2`,
                    selectedProvider?.id === provider.id
                      ? { borderColor: provider.color, backgroundColor: `${provider.color}20` }
                      : tw`border-gray-200 bg-gray-50`,
                  ]}
                  onPress={() => {
                    setSelectedProvider(provider);
                    setSelectedPlan(null);
                    if (errors.provider) setErrors((prev) => ({ ...prev, provider: '' }));
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="globe" size={32} color={provider.color} />
                  <Text style={tw`text-sm font-semibold text-gray-900 text-center mt-2`}>
                    {provider.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.provider ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.provider}</Text> : null}
          </View>

          {/* Account Number */}
          <View style={tw`mb-2`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Account Number</Text>
            <View
              style={tw`border ${errors.account ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <TextInput
                style={tw`flex-1 text-base text-gray-900`}
                placeholder="Enter account number"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                value={accountNumber}
                onChangeText={handleAccountChange}
                onBlur={handleValidateAccount}
                maxLength={15}
              />
              {isValidating && <ActivityIndicator size="small" color="#06b6d4" />}
            </View>
            {errors.account ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.account}</Text> : null}
          </View>
          {customerName && (
            <View style={tw`bg-green-50 border border-green-200 p-3 rounded-xl mb-6 flex-row items-center`}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={tw`text-green-700 font-semibold ml-2`}>{customerName}</Text>
            </View>
          )}
          {!customerName && <View style={tw`mb-6`} />}

          {/* Select Plan */}
          {selectedProvider && internetPlans[selectedProvider.id] && (
            <>
              <View style={tw`mb-6`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Plan</Text>
                <TouchableOpacity
                  style={tw`border ${errors.plan ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-4 flex-row justify-between items-center bg-gray-50`}
                  onPress={() => setShowPlans(true)}
                  activeOpacity={0.7}
                >
                  {selectedPlan ? (
                    <View>
                      <Text style={tw`font-semibold text-gray-900`}>{selectedPlan.name}</Text>
                      <Text style={tw`text-xs text-gray-500`}>
                        {selectedPlan.speed} • {selectedPlan.validity} • ₦{selectedPlan.price.toLocaleString()}
                      </Text>
                    </View>
                  ) : (
                    <Text style={tw`text-gray-400`}>Choose a plan</Text>
                  )}
                  <Ionicons name="chevron-down" size={24} color="#9ca3af" />
                </TouchableOpacity>
                {errors.plan ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.plan}</Text> : null}

                {/* Plans Modal */}
                <Modal visible={showPlans} animationType="slide" transparent>
                  <View style={tw`flex-1 justify-end bg-black/50`}>
                    <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 max-h-[80%]`}>
                      <View style={tw`px-6 pb-4 border-b border-gray-100`}>
                        <View style={tw`flex-row justify-between items-center`}>
                          <Text style={tw`text-xl font-bold text-gray-900`}>Select Plan</Text>
                          <TouchableOpacity onPress={() => setShowPlans(false)} activeOpacity={0.7}>
                            <Ionicons name="close" size={28} color="#111827" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <FlatList
                        data={internetPlans[selectedProvider.id]}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={tw`px-6 py-4 border-b border-gray-100`}
                            onPress={() => {
                              setSelectedPlan(item);
                              setShowPlans(false);
                              if (errors.plan) setErrors((prev) => ({ ...prev, plan: '' }));
                            }}
                            activeOpacity={0.7}
                          >
                            <View style={tw`flex-row justify-between items-center`}>
                              <View style={tw`flex-1`}>
                                <Text style={tw`font-bold text-gray-900 text-base`}>{item.name}</Text>
                                <Text style={tw`text-sm text-gray-500 mt-1`}>
                                  Speed: {item.speed} • {item.validity}
                                </Text>
                              </View>
                              <Text style={tw`font-bold text-cyan-600 text-lg`}>
                                ₦{item.price.toLocaleString()}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </Modal>
              </View>

              {/* Available Plans */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Available Plans</Text>
                <View style={tw`gap-3`}>
                  {internetPlans[selectedProvider.id].slice(0, 3).map((plan) => (
                    <TouchableOpacity
                      key={plan.id}
                      style={tw`bg-cyan-50 border border-cyan-100 p-4 rounded-xl`}
                      onPress={() => {
                        setSelectedPlan(plan);
                        if (errors.plan) setErrors((prev) => ({ ...prev, plan: '' }));
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={tw`flex-row justify-between items-center mb-2`}>
                        <Text style={tw`font-bold text-gray-900`}>{plan.name}</Text>
                        <Text style={tw`font-bold text-cyan-600`}>₦{plan.price.toLocaleString()}</Text>
                      </View>
                      <Text style={tw`text-xs text-gray-600`}>
                        Speed: {plan.speed} • Valid for {plan.validity}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${isSubmitting || !selectedProvider || accountNumber.length < 8 || !selectedPlan ? 'opacity-60' : ''}`}
            disabled={isSubmitting || !selectedProvider || accountNumber.length < 8 || !selectedPlan}
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

