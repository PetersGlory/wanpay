import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I transfer money?',
      answer: 'To transfer money, go to the Transfer tab, enter the recipient\'s details, amount, and confirm the transaction. You\'ll need to enter your PIN to complete the transfer.',
      category: 'transactions',
    },
    {
      id: '2',
      question: 'What are the transaction limits?',
      answer: 'Transaction limits depend on your account tier. Tier 2 accounts have a daily limit of ₦500,000. You can view and request limit increases in your Profile settings.',
      category: 'account',
    },
    {
      id: '3',
      question: 'How do I change my PIN?',
      answer: 'Go to Profile > Security Settings > Change PIN. Enter your current PIN, then your new PIN twice to confirm. Make sure to use a PIN you can remember but others can\'t guess.',
      category: 'security',
    },
    {
      id: '4',
      question: 'How do I pay bills?',
      answer: 'Navigate to the Bills tab, select the type of bill you want to pay (electricity, TV, data, etc.), enter the details, and confirm the payment.',
      category: 'bills',
    },
    {
      id: '5',
      question: 'What should I do if I forgot my PIN?',
      answer: 'If you forgot your PIN, tap "Forgot PIN" on the login screen. You\'ll receive an OTP to reset your PIN. Alternatively, contact support for assistance.',
      category: 'security',
    },
    {
      id: '6',
      question: 'How do I apply for grants?',
      answer: 'Go to the Grants Hub tab to browse available grants. Click on any grant to view details, requirements, and eligibility. Click "Apply Now" to proceed with the application.',
      category: 'grants',
    },
    {
      id: '7',
      question: 'How long does a transfer take?',
      answer: 'Most transfers are instant. However, transfers to some banks may take a few minutes. You\'ll receive a notification once the transfer is completed.',
      category: 'transactions',
    },
    {
      id: '8',
      question: 'Is my account secure?',
      answer: 'Yes, we use bank-level encryption and multiple security layers including PIN protection, biometric authentication, and transaction alerts to keep your account secure.',
      category: 'security',
    },
  ];

  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'chatbubble-ellipses-outline',
      color: '#2563eb',
      onPress: () => Alert.alert('Live Chat', 'Connecting you to a support agent...'),
    },
    {
      id: 'call',
      title: 'Call Us',
      description: '+234 800 WANPAY',
      icon: 'call-outline',
      color: '#10b981',
      onPress: () => Alert.alert('Call Support', 'Calling support line...'),
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'support@wanpay.com',
      icon: 'mail-outline',
      color: '#f59e0b',
      onPress: () => Alert.alert('Email Support', 'Opening email client...'),
    },
  ];

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitContact = () => {
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent. We\'ll get back to you within 24 hours.');
    setContactForm({ subject: '', message: '' });
  };

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
            <Text style={tw`text-xl font-bold text-gray-900`}>Help & Support</Text>
            <Text style={tw`text-xs text-gray-500`}>Get help and contact support</Text>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Support Options */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Contact Support</Text>
          <View style={tw`flex-row justify-between gap-3`}>
            {supportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={tw`bg-white border border-gray-100 rounded-2xl p-4 flex-1 items-center shadow-sm`}
                onPress={option.onPress}
                activeOpacity={0.7}
              >
                <View style={tw`bg-blue-50 w-12 h-12 rounded-full items-center justify-center mb-3`}>
                  <Ionicons name={option.icon as any} size={24} color={option.color} />
                </View>
                <Text style={tw`text-gray-900 font-semibold text-sm text-center mb-1`}>
                  {option.title}
                </Text>
                <Text style={tw`text-gray-500 text-xs text-center`}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search FAQs */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Frequently Asked Questions</Text>
          <View style={tw`bg-white border border-gray-300 rounded-xl px-4 py-3 flex-row items-center mb-4`}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={tw`flex-1 ml-3 text-base text-gray-900`}
              placeholder="Search FAQs..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          {/* FAQs List */}
          <View style={tw`bg-white border border-gray-100 rounded-2xl shadow-sm`}>
            {filteredFAQs.map((faq, index) => (
              <View key={faq.id}>
                <TouchableOpacity
                  style={tw`px-5 py-4 flex-row justify-between items-center ${index !== filteredFAQs.length - 1 ? 'border-b border-gray-100' : ''}`}
                  onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  activeOpacity={0.7}
                >
                  <View style={tw`flex-1 mr-3`}>
                    <Text style={tw`text-gray-900 font-semibold`}>{faq.question}</Text>
                  </View>
                  <Ionicons
                    name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>
                {expandedFAQ === faq.id && (
                  <View style={tw`px-5 pb-4`}>
                    <Text style={tw`text-gray-600 text-sm leading-5`}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Contact Form */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Send us a Message</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}>
            <View style={tw`mb-4`}>
              <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Subject</Text>
              <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-gray-50`}>
                <TextInput
                  style={tw`text-base text-gray-900`}
                  placeholder="Enter subject"
                  placeholderTextColor="#9ca3af"
                  value={contactForm.subject}
                  onChangeText={(text) => setContactForm({ ...contactForm, subject: text })}
                />
              </View>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Message</Text>
              <View style={tw`border border-gray-300 rounded-xl px-4 py-3 bg-gray-50`}>
                <TextInput
                  style={tw`text-base text-gray-900`}
                  placeholder="Enter your message"
                  placeholderTextColor="#9ca3af"
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity
              style={tw`bg-blue-600 py-3 rounded-xl`}
              onPress={handleSubmitContact}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white text-center font-bold`}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Hours */}
        <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="time-outline" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-900 font-semibold ml-2`}>Support Hours</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mb-1`}>Monday - Friday: 8:00 AM - 8:00 PM</Text>
          <Text style={tw`text-xs text-gray-600 mb-1`}>Saturday: 9:00 AM - 5:00 PM</Text>
          <Text style={tw`text-xs text-gray-600`}>Sunday: Closed</Text>
        </View>

        {/* Quick Links */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-semibold text-gray-500 uppercase mb-3`}>Quick Links</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl shadow-sm`}>
            {[
              { title: 'Terms & Conditions', icon: 'document-text-outline' },
              { title: 'Privacy Policy', icon: 'lock-closed-outline' },
              { title: 'Security Tips', icon: 'shield-checkmark-outline' },
              { title: 'App Version', icon: 'information-circle-outline', subtitle: '1.0.0' },
            ].map((link, index) => (
              <TouchableOpacity
                key={link.title}
                style={tw`px-5 py-4 flex-row justify-between items-center ${index !== 3 ? 'border-b border-gray-100' : ''}`}
                activeOpacity={0.7}
              >
                <View style={tw`flex-row items-center`}>
                  <Ionicons name={link.icon as any} size={20} color="#6b7280" style={tw`mr-3`} />
                  <Text style={tw`text-gray-900 font-semibold`}>{link.title}</Text>
                </View>
                {link.subtitle ? (
                  <Text style={tw`text-gray-500 text-sm`}>{link.subtitle}</Text>
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

