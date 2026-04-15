import { PRIMARY_COLOR, VIBRANT_ORANGE } from '@/constants/customConstants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';

type PinErrors = {
  pin: string;
  confirmPin: string;
};

const GOLD = VIBRANT_ORANGE || '#C9A227';
const GOLD_LIGHT = '#F0C84A';

function PinDots({ value, error }: { value: string; error?: string }) {
  return (
    <View style={tw`flex-row gap-3 flex-1 justify-center`}>
      {[0, 1, 2, 3].map((i) => {
        const filled = i < value.length;
        return (
          <View
            key={i}
            style={[
              tw`w-12 h-12 rounded-xl bg-[#1C2333] items-center justify-center`,
              {
                borderWidth: 1,
                borderColor: error
                  ? '#EF4444'
                  : filled
                  ? GOLD
                  : '#1E293B',
              },
            ]}
          >
            {filled && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: GOLD,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

export default function CreatePinScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<PinErrors>({ pin: '', confirmPin: '' });

  const validatePin = () => {
    const newErrors: PinErrors = { pin: '', confirmPin: '' };
    let isValid = true;
    if (pin.length !== 4) { newErrors.pin = 'PIN must be exactly 4 digits'; isValid = false; }
    if (confirmPin.length !== 4) { newErrors.confirmPin = 'Confirm PIN must be 4 digits'; isValid = false; }
    else if (pin !== confirmPin) { newErrors.confirmPin = 'PINs do not match'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handlePinChange = (value: string, field: 'pin' | 'confirm') => {
    const numeric = value.replace(/[^0-9]/g, '');
    if (numeric.length > 4) return;
    if (field === 'pin') {
      setPin(numeric);
      if (errors.pin) setErrors((prev) => ({ ...prev, pin: '' }));
    } else {
      setConfirmPin(numeric);
      if (errors.confirmPin) setErrors((prev) => ({ ...prev, confirmPin: '' }));
    }
  };

  const handleComplete = async () => {
    if (!validatePin()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      Alert.alert('PIN Created', 'Your account is now secured.', [
        { text: 'Continue', onPress: () => router.replace('/(tabs)') },
      ]);
    } catch {
      Alert.alert('Error', 'Unable to create PIN. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117', paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6`}>
          {/* Back */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={[tw`mt-4 mb-6 w-10 h-10 items-center justify-center rounded-xl`, { backgroundColor: '#1C2333' }]}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Header */}
          <View style={tw`mb-6 flex-row items-center gap-3`}>
            <View style={{ width: 4, height: 32, backgroundColor: GOLD, borderRadius: 2 }} />
            <View style={tw`flex-1`}>
              <Text style={{ fontSize: 26, fontWeight: '700', color: '#F1F5F9', letterSpacing: -0.5 }}>
                Create your PIN
              </Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginTop: 3, lineHeight: 20 }}>
                Authorises transactions on your WanPay account.
              </Text>
            </View>
          </View>

          {/* Tip */}
          <View
            style={[
              tw`rounded-xl p-4 mb-6 flex-row items-start gap-3`,
              { backgroundColor: '#111827', borderWidth: 1, borderColor: '#1C2A3A', borderLeftWidth: 3, borderLeftColor: GOLD },
            ]}
          >
            <Ionicons name="information-circle" size={16} color={GOLD} style={{ marginTop: 1 }} />
            <Text style={{ fontSize: 12, color: '#94A3B8', lineHeight: 19, flex: 1 }}>
              Avoid obvious patterns like{' '}
              <Text style={{ color: GOLD_LIGHT, fontVariant: ['tabular-nums'] }}>1234</Text> or{' '}
              <Text style={{ color: GOLD_LIGHT, fontVariant: ['tabular-nums'] }}>1111</Text>.
              Choose something memorable but unique.
            </Text>
          </View>

          {/* PIN Field */}
          <View style={tw`mb-5`}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#475569', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
              Enter PIN
            </Text>
            <View
              style={[
                tw`rounded-2xl px-4 py-4 flex-row items-center`,
                { backgroundColor: '#111827', borderWidth: 1, borderColor: errors.pin ? '#EF4444' : '#1E293B' },
              ]}
            >
              <PinDots value={pin} error={errors.pin} />
              <TextInput
                style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
                secureTextEntry={!showPin}
                keyboardType="number-pad"
                maxLength={4}
                value={pin}
                onChangeText={(v) => handlePinChange(v, 'pin')}
              />
              <TouchableOpacity onPress={() => setShowPin(!showPin)} activeOpacity={0.7}>
                <Ionicons name={showPin ? 'eye-off-outline' : 'eye-outline'} size={20} color="#475569" />
              </TouchableOpacity>
            </View>
            {errors.pin ? (
              <Text style={{ color: '#EF4444', fontSize: 11, marginTop: 5, marginLeft: 4 }}>{errors.pin}</Text>
            ) : null}
          </View>

          {/* Confirm PIN Field */}
          <View style={tw`mb-8`}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#475569', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
              Confirm PIN
            </Text>
            <View
              style={[
                tw`rounded-2xl px-4 py-4 flex-row items-center`,
                { backgroundColor: '#111827', borderWidth: 1, borderColor: errors.confirmPin ? '#EF4444' : '#1E293B' },
              ]}
            >
              <PinDots value={confirmPin} error={errors.confirmPin} />
              <TextInput
                style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
                secureTextEntry={!showConfirmPin}
                keyboardType="number-pad"
                maxLength={4}
                value={confirmPin}
                onChangeText={(v) => handlePinChange(v, 'confirm')}
              />
              <TouchableOpacity onPress={() => setShowConfirmPin(!showConfirmPin)} activeOpacity={0.7}>
                <Ionicons name={showConfirmPin ? 'eye-off-outline' : 'eye-outline'} size={20} color="#475569" />
              </TouchableOpacity>
            </View>
            {errors.confirmPin ? (
              <Text style={{ color: '#EF4444', fontSize: 11, marginTop: 5, marginLeft: 4 }}>{errors.confirmPin}</Text>
            ) : null}
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={[
              tw`rounded-2xl py-4 items-center`,
              { backgroundColor: GOLD, opacity: isSubmitting ? 0.6 : 1 },
            ]}
            onPress={handleComplete}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#0D1117" />
            ) : (
              <Text style={{ color: '#0D1117', fontWeight: '700', fontSize: 15, letterSpacing: 0.3 }}>
                Create PIN
              </Text>
            )}
          </TouchableOpacity>

          {/* Trust line */}
          <View style={tw`mt-5 flex-row items-center justify-center gap-2`}>
            <Ionicons name="shield-checkmark" size={13} color="#10B981" />
            <Text style={{ color: '#475569', fontSize: 11.5 }}>
              Encrypted end-to-end — never stored in plain text
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}