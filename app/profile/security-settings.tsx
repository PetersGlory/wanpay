import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';

export default function SecuritySettingsScreen() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [transactionNotifications, setTransactionNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  
  const [pinData, setPinData] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: '',
  });

  const handleChangePin = () => {
    if (pinData.currentPin.length !== 4) {
      Alert.alert('Error', 'Current PIN must be 4 digits');
      return;
    }
    if (pinData.newPin.length !== 4) {
      Alert.alert('Error', 'New PIN must be 4 digits');
      return;
    }
    if (pinData.newPin !== pinData.confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }
    Alert.alert('Success', 'Your PIN has been changed successfully.');
    setPinData({ currentPin: '', newPin: '', confirmPin: '' });
  };

  const securityFeatures = [
    {
      id: 'change-pin',
      title: 'Change PIN',
      icon: 'key-outline',
      color: '#2563eb',
      onPress: () => Alert.alert('Change PIN', 'PIN change functionality'),
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      icon: 'finger-print-outline',
      color: '#7c3aed',
      toggle: biometricEnabled,
      onToggle: setBiometricEnabled,
      subtitle: 'Use fingerprint or face ID to login',
    },
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      icon: 'shield-checkmark-outline',
      color: '#10b981',
      toggle: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      subtitle: 'Add an extra layer of security',
    },
    {
      id: 'transaction-alerts',
      title: 'Transaction Notifications',
      icon: 'notifications-outline',
      color: '#f59e0b',
      toggle: transactionNotifications,
      onToggle: setTransactionNotifications,
      subtitle: 'Get notified for all transactions',
    },
    {
      id: 'login-alerts',
      title: 'Login Alerts',
      icon: 'lock-closed-outline',
      color: '#ef4444',
      toggle: loginAlerts,
      onToggle: setLoginAlerts,
      subtitle: 'Alert when someone logs into your account',
    },
  ];

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
            <Text style={tw`text-xl font-bold text-gray-900`}>Security Settings</Text>
            <Text style={tw`text-xs text-gray-500`}>Manage your account security</Text>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Security Status */}
        <View style={tw`bg-green-50 border border-green-200 rounded-2xl p-5 mb-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="shield-checkmark" size={24} color="#10b981" />
            <Text style={tw`text-green-900 font-bold text-lg ml-3`}>Account Secure</Text>
          </View>
          <Text style={tw`text-green-700 text-sm`}>
            Your account is protected with multiple security layers. Keep your PIN and password confidential.
          </Text>
        </View>

        {/* Change PIN Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>PIN Settings</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl shadow-sm`}>
            <View style={tw`px-5 py-4 border-b border-gray-100`}>
              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>Change PIN</Text>
              <Text style={tw`text-sm text-gray-500`}>Update your transaction PIN</Text>
            </View>
            
            <View style={tw`px-5 py-4`}>
              <View style={tw`mb-4`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Current PIN</Text>
                <View style={tw`border border-gray-300 rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}>
                  <TextInput
                    style={tw`flex-1 text-base text-gray-900`}
                    value={pinData.currentPin}
                    onChangeText={(text) => setPinData({ ...pinData, currentPin: text.replace(/[^0-9]/g, '').slice(0, 4) })}
                    placeholder="Enter current PIN"
                    placeholderTextColor="#9ca3af"
                    keyboardType="number-pad"
                    secureTextEntry={!showCurrentPin}
                    maxLength={4}
                  />
                  <TouchableOpacity onPress={() => setShowCurrentPin(!showCurrentPin)}>
                    <Ionicons name={showCurrentPin ? 'eye-outline' : 'eye-off-outline'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>New PIN</Text>
                <View style={tw`border border-gray-300 rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}>
                  <TextInput
                    style={tw`flex-1 text-base text-gray-900`}
                    value={pinData.newPin}
                    onChangeText={(text) => setPinData({ ...pinData, newPin: text.replace(/[^0-9]/g, '').slice(0, 4) })}
                    placeholder="Enter new PIN"
                    placeholderTextColor="#9ca3af"
                    keyboardType="number-pad"
                    secureTextEntry={!showNewPin}
                    maxLength={4}
                  />
                  <TouchableOpacity onPress={() => setShowNewPin(!showNewPin)}>
                    <Ionicons name={showNewPin ? 'eye-outline' : 'eye-off-outline'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Confirm New PIN</Text>
                <View style={tw`border border-gray-300 rounded-xl px-4 py-3 flex-row items-center bg-gray-50`}>
                  <TextInput
                    style={tw`flex-1 text-base text-gray-900`}
                    value={pinData.confirmPin}
                    onChangeText={(text) => setPinData({ ...pinData, confirmPin: text.replace(/[^0-9]/g, '').slice(0, 4) })}
                    placeholder="Confirm new PIN"
                    placeholderTextColor="#9ca3af"
                    keyboardType="number-pad"
                    secureTextEntry={!showConfirmPin}
                    maxLength={4}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPin(!showConfirmPin)}>
                    <Ionicons name={showConfirmPin ? 'eye-outline' : 'eye-off-outline'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={tw`bg-blue-600 py-3 rounded-xl`}
                onPress={handleChangePin}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white text-center font-bold`}>Update PIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Security Features */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Security Features</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl shadow-sm`}>
            {securityFeatures.map((feature, index) => (
              <TouchableOpacity
                key={feature.id}
                style={tw`flex-row justify-between items-center px-5 py-4 ${index !== securityFeatures.length - 1 ? 'border-b border-gray-100' : ''}`}
                onPress={feature.onPress}
                activeOpacity={0.75}
                disabled={!!feature.toggle !== undefined}
              >
                <View style={tw`flex-row items-center flex-1`}>
                  <View style={tw`bg-blue-50 w-10 h-10 rounded-full items-center justify-center mr-3`}>
                    <Ionicons name={feature.icon as any} size={20} color={feature.color} />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-gray-900 font-semibold`}>{feature.title}</Text>
                    {feature.subtitle && (
                      <Text style={tw`text-gray-500 text-xs mt-1`}>{feature.subtitle}</Text>
                    )}
                  </View>
                </View>
                {feature.toggle !== undefined ? (
                  <Switch
                    value={feature.toggle}
                    onValueChange={feature.onToggle}
                    trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                    thumbColor="#fff"
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Sessions */}
        <View style={tw`mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-sm font-semibold text-gray-500 uppercase`}>Active Sessions</Text>
            <TouchableOpacity>
              <Text style={tw`text-blue-600 text-sm font-semibold`}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}>
            <View style={tw`flex-row items-center mb-3`}>
              <Ionicons name="phone-portrait" size={24} color="#2563eb" />
              <View style={tw`ml-3 flex-1`}>
                <Text style={tw`text-gray-900 font-semibold`}>iPhone 13 Pro</Text>
                <Text style={tw`text-gray-500 text-xs`}>Lagos, Nigeria • Current session</Text>
              </View>
              <View style={tw`bg-green-100 px-2 py-1 rounded-full`}>
                <Text style={tw`text-green-700 text-xs font-semibold`}>Active</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security Tips */}
        <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="information-circle" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-900 font-semibold ml-2`}>Security Tips</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mb-2`}>• Never share your PIN with anyone</Text>
          <Text style={tw`text-xs text-gray-600 mb-2`}>• Use a strong, unique PIN</Text>
          <Text style={tw`text-xs text-gray-600 mb-2`}>• Enable biometric authentication for faster access</Text>
          <Text style={tw`text-xs text-gray-600`}>• Log out from shared devices</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

