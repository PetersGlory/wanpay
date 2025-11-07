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

interface TVProvider {
  id: string;
  name: string;
  color: string;
}

interface Package {
  id: string;
  name: string;
  price: number;
  validity: string;
}

export default function TVSubscriptionScreen() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState<TVProvider | null>(null);
  const [smartCardNumber, setSmartCardNumber] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showPackages, setShowPackages] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ provider: '', card: '', package: '' });

  const tvProviders: TVProvider[] = [
    { id: 'dstv', name: 'DSTV', color: '#0033A0' },
    { id: 'gotv', name: 'GOtv', color: '#E2231A' },
    { id: 'startimes', name: 'Startimes', color: '#FF6B00' },
    { id: 'showmax', name: 'Showmax', color: '#E50914' },
  ];

  const packages: Record<string, Package[]> = {
    dstv: [
      { id: '1', name: 'DSTV Padi', price: 2500, validity: '1 Month' },
      { id: '2', name: 'DSTV Yanga', price: 3500, validity: '1 Month' },
      { id: '3', name: 'DSTV Confam', price: 6200, validity: '1 Month' },
      { id: '4', name: 'DSTV Compact', price: 10500, validity: '1 Month' },
      { id: '5', name: 'DSTV Compact Plus', price: 16600, validity: '1 Month' },
      { id: '6', name: 'DSTV Premium', price: 24500, validity: '1 Month' },
    ],
    gotv: [
      { id: '1', name: 'GOtv Smallie', price: 1300, validity: '1 Month' },
      { id: '2', name: 'GOtv Jinja', price: 2250, validity: '1 Month' },
      { id: '3', name: 'GOtv Jolli', price: 3300, validity: '1 Month' },
      { id: '4', name: 'GOtv Max', price: 4850, validity: '1 Month' },
      { id: '5', name: 'GOtv Supa', price: 6400, validity: '1 Month' },
    ],
    startimes: [
      { id: '1', name: 'Nova', price: 1200, validity: '1 Month' },
      { id: '2', name: 'Basic', price: 2100, validity: '1 Month' },
      { id: '3', name: 'Smart', price: 2800, validity: '1 Month' },
      { id: '4', name: 'Classic', price: 3500, validity: '1 Month' },
      { id: '5', name: 'Super', price: 5500, validity: '1 Month' },
    ],
    showmax: [
      { id: '1', name: 'Showmax Pro', price: 4200, validity: '1 Month' },
      { id: '2', name: 'Showmax Mobile', price: 1200, validity: '1 Month' },
    ],
  };

  const handleCardChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    if (numeric.length <= 15) {
      setSmartCardNumber(numeric);
      setCustomerName('');
      if (errors.card) setErrors((prev) => ({ ...prev, card: '' }));
    }
  };

  const handleValidateCard = async () => {
    if (smartCardNumber.length >= 10 && selectedProvider) {
      setIsValidating(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCustomerName('John Doe');
      } catch (error) {
        Alert.alert('Error', 'Invalid smart card number. Please check and try again.');
      } finally {
        setIsValidating(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = { provider: '', card: '', package: '' };
    let isValid = true;

    if (!selectedProvider) {
      newErrors.provider = 'Please select a provider';
      isValid = false;
    }

    if (smartCardNumber.length < 10) {
      newErrors.card = 'Smart card number must be at least 10 digits';
      isValid = false;
    }

    if (!selectedPackage) {
      newErrors.package = 'Please select a package';
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
      Alert.alert('Success', `${selectedPackage?.name} subscription has been activated`, [
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
              <Text style={tw`text-xl font-bold text-gray-900`}>TV Subscription</Text>
              <Text style={tw`text-xs text-gray-500`}>Renew your TV subscription</Text>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 px-6 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          {/* Select Provider */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Provider</Text>
            <View style={tw`flex-row gap-3 flex-wrap`}>
              {tvProviders.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  style={[
                    tw`flex-1 min-w-[48%] p-3 rounded-2xl items-center border-2`,
                    selectedProvider?.id === provider.id
                      ? { borderColor: provider.color, backgroundColor: `${provider.color}20` }
                      : tw`border-gray-200 bg-gray-50`,
                  ]}
                  onPress={() => {
                    setSelectedProvider(provider);
                    setSelectedPackage(null);
                    if (errors.provider) setErrors((prev) => ({ ...prev, provider: '' }));
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="tv" size={28} color={provider.color} />
                  <Text style={tw`text-xs font-semibold text-gray-900 text-center mt-2`}>
                    {provider.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.provider ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.provider}</Text> : null}
          </View>

          {/* Smart Card Number */}
          <View style={tw`mb-2`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Smart Card Number</Text>
            <View
              style={tw`border ${errors.card ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}
            >
              <TextInput
                style={tw`flex-1 text-base text-gray-900`}
                placeholder="Enter smart card number"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
                value={smartCardNumber}
                onChangeText={handleCardChange}
                onBlur={handleValidateCard}
                maxLength={15}
              />
              {isValidating && <ActivityIndicator size="small" color="#ef4444" />}
            </View>
            {errors.card ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.card}</Text> : null}
          </View>
          {customerName && (
            <View style={tw`bg-green-50 border border-green-200 p-3 rounded-xl mb-6 flex-row items-center`}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={tw`text-green-700 font-semibold ml-2`}>{customerName}</Text>
            </View>
          )}
          {!customerName && <View style={tw`mb-6`} />}

          {/* Select Package */}
          {selectedProvider && packages[selectedProvider.id] && (
            <>
              <View style={tw`mb-6`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Package</Text>
                <TouchableOpacity
                  style={tw`border ${errors.package ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-4 flex-row justify-between items-center bg-gray-50`}
                  onPress={() => setShowPackages(true)}
                  activeOpacity={0.7}
                >
                  {selectedPackage ? (
                    <View>
                      <Text style={tw`font-semibold text-gray-900`}>{selectedPackage.name}</Text>
                      <Text style={tw`text-xs text-gray-500`}>
                        {selectedPackage.validity} • ₦{selectedPackage.price.toLocaleString()}
                      </Text>
                    </View>
                  ) : (
                    <Text style={tw`text-gray-400`}>Choose a subscription package</Text>
                  )}
                  <Ionicons name="chevron-down" size={24} color="#9ca3af" />
                </TouchableOpacity>
                {errors.package ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.package}</Text> : null}

                {/* Packages Modal */}
                <Modal visible={showPackages} animationType="slide" transparent>
                  <View style={tw`flex-1 justify-end bg-black/50`}>
                    <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 max-h-[80%]`}>
                      <View style={tw`px-6 pb-4 border-b border-gray-100`}>
                        <View style={tw`flex-row justify-between items-center`}>
                          <Text style={tw`text-xl font-bold text-gray-900`}>Select Package</Text>
                          <TouchableOpacity onPress={() => setShowPackages(false)} activeOpacity={0.7}>
                            <Ionicons name="close" size={28} color="#111827" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <FlatList
                        data={packages[selectedProvider.id]}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={tw`px-6 py-4 border-b border-gray-100 flex-row justify-between items-center`}
                            onPress={() => {
                              setSelectedPackage(item);
                              setShowPackages(false);
                              if (errors.package) setErrors((prev) => ({ ...prev, package: '' }));
                            }}
                            activeOpacity={0.7}
                          >
                            <View>
                              <Text style={tw`font-bold text-gray-900 text-base`}>{item.name}</Text>
                              <Text style={tw`text-sm text-gray-500 mt-1`}>{item.validity}</Text>
                            </View>
                            <Text style={tw`font-bold text-red-600 text-lg`}>
                              ₦{item.price.toLocaleString()}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </Modal>
              </View>

              {/* Popular Packages */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Popular Packages</Text>
                <View style={tw`gap-3`}>
                  {packages[selectedProvider.id].slice(0, 3).map((pkg) => (
                    <TouchableOpacity
                      key={pkg.id}
                      style={tw`bg-red-50 border border-red-100 p-4 rounded-xl flex-row justify-between items-center`}
                      onPress={() => {
                        setSelectedPackage(pkg);
                        if (errors.package) setErrors((prev) => ({ ...prev, package: '' }));
                      }}
                      activeOpacity={0.7}
                    >
                      <View>
                        <Text style={tw`font-bold text-gray-900`}>{pkg.name}</Text>
                        <Text style={tw`text-xs text-gray-600 mt-1`}>{pkg.validity}</Text>
                      </View>
                      <Text style={tw`font-bold text-red-600`}>₦{pkg.price.toLocaleString()}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Auto Renewal Option */}
          {selectedPackage && (
            <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex-row items-start`}>
              <Ionicons name="information-circle" size={20} color="#3b82f6" style={tw`mr-2 mt-0.5`} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-semibold text-blue-900 mb-1`}>Auto-Renewal</Text>
                <Text style={tw`text-xs text-gray-600`}>
                  Enable auto-renewal to avoid service interruption
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${isSubmitting || !selectedProvider || smartCardNumber.length < 10 || !selectedPackage ? 'opacity-60' : ''}`}
            disabled={isSubmitting || !selectedProvider || smartCardNumber.length < 10 || !selectedPackage}
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

