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

interface Network {
  id: string;
  name: string;
  color: string;
}

interface DataPlan {
  id: string;
  name: string;
  validity: string;
  price: number;
}

export default function DataScreen() {
  const router = useRouter();
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ network: '', phone: '', plan: '' });

  const networks: Network[] = [
    { id: 'mtn', name: 'MTN', color: '#FFCC00' },
    { id: 'glo', name: 'Glo', color: '#00A95C' },
    { id: 'airtel', name: 'Airtel', color: '#ED1C24' },
    { id: '9mobile', name: '9mobile', color: '#00853E' },
  ];

  const dataPlans: DataPlan[] = [
    { id: '1', name: '500MB', validity: '1 Day', price: 100 },
    { id: '2', name: '1GB', validity: '1 Day', price: 200 },
    { id: '3', name: '2GB', validity: '2 Days', price: 400 },
    { id: '4', name: '3GB', validity: '7 Days', price: 1000 },
    { id: '5', name: '5GB', validity: '7 Days', price: 1500 },
    { id: '6', name: '10GB', validity: '30 Days', price: 2500 },
    { id: '7', name: '15GB', validity: '30 Days', price: 3500 },
    { id: '8', name: '20GB', validity: '30 Days', price: 5000 },
  ];

  const handlePhoneChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    if (numeric.length <= 10) {
      setPhoneNumber(numeric);
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { network: '', phone: '', plan: '' };
    let isValid = true;

    if (!selectedNetwork) {
      newErrors.network = 'Please select a network';
      isValid = false;
    }

    if (phoneNumber.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!selectedPlan) {
      newErrors.plan = 'Please select a data plan';
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
      Alert.alert('Success', `${selectedPlan?.name} data plan has been activated for ${phoneNumber}`, [
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
              <Text style={tw`text-xl font-bold text-gray-900`}>Buy Data</Text>
              <Text style={tw`text-xs text-gray-500`}>Subscribe to data bundles</Text>
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
                    setSelectedPlan(null);
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

          {/* Data Plan Selection */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Select Data Plan</Text>
            <TouchableOpacity
              style={tw`border ${errors.plan ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-4 flex-row justify-between items-center bg-gray-50`}
              onPress={() => setShowPlans(true)}
              activeOpacity={0.7}
            >
              {selectedPlan ? (
                <View>
                  <Text style={tw`font-semibold text-gray-900`}>{selectedPlan.name}</Text>
                  <Text style={tw`text-xs text-gray-500`}>
                    {selectedPlan.validity} • ₦{selectedPlan.price}
                  </Text>
                </View>
              ) : (
                <Text style={tw`text-gray-400`}>Choose a data plan</Text>
              )}
              <Ionicons name="chevron-down" size={24} color="#9ca3af" />
            </TouchableOpacity>
            {errors.plan ? <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{errors.plan}</Text> : null}

            {/* Data Plans Modal */}
            <Modal visible={showPlans} animationType="slide" transparent>
              <View style={tw`flex-1 justify-end bg-black/50`}>
                <View style={tw`bg-white rounded-t-3xl pt-6 pb-8 max-h-[80%]`}>
                  <View style={tw`px-6 pb-4 border-b border-gray-100`}>
                    <View style={tw`flex-row justify-between items-center`}>
                      <Text style={tw`text-xl font-bold text-gray-900`}>Select Data Plan</Text>
                      <TouchableOpacity onPress={() => setShowPlans(false)} activeOpacity={0.7}>
                        <Ionicons name="close" size={28} color="#111827" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={dataPlans}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={tw`px-6 py-4 border-b border-gray-100 flex-row justify-between items-center`}
                        onPress={() => {
                          setSelectedPlan(item);
                          setShowPlans(false);
                          if (errors.plan) setErrors((prev) => ({ ...prev, plan: '' }));
                        }}
                        activeOpacity={0.7}
                      >
                        <View>
                          <Text style={tw`font-bold text-gray-900 text-base`}>{item.name}</Text>
                          <Text style={tw`text-sm text-gray-500 mt-1`}>Valid for {item.validity}</Text>
                        </View>
                        <Text style={tw`font-bold text-blue-600 text-lg`}>₦{item.price}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>

          {/* Popular Plans */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Popular Plans</Text>
            <View style={tw`flex-row gap-3`}>
              {dataPlans.slice(0, 3).map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  style={tw`bg-blue-50 border border-blue-100 p-3 rounded-xl flex-1`}
                  onPress={() => {
                    setSelectedPlan(plan);
                    if (errors.plan) setErrors((prev) => ({ ...prev, plan: '' }));
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={tw`font-bold text-blue-600`}>{plan.name}</Text>
                  <Text style={tw`text-xs text-gray-600 mt-1`}>₦{plan.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={tw`bg-blue-600 py-4 rounded-xl mb-6 shadow-lg ${isSubmitting || !selectedNetwork || phoneNumber.length !== 10 || !selectedPlan ? 'opacity-60' : ''}`}
            disabled={isSubmitting || !selectedNetwork || phoneNumber.length !== 10 || !selectedPlan}
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

