import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

interface Card {
  id: string;
  type: 'debit' | 'credit' | 'virtual';
  number: string;
  holderName: string;
  expiryDate: string;
  isDefault: boolean;
  color: string[];
  status: 'active' | 'blocked' | 'expired';
}

export default function ManageCardsScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      type: 'debit',
      number: '4567',
      holderName: 'Samuel Adebayo',
      expiryDate: '12/26',
      isDefault: true,
      color: ['#2563eb', '#3b82f6'],
      status: 'active',
    },
    {
      id: '2',
      type: 'virtual',
      number: '8901',
      holderName: 'Samuel Adebayo',
      expiryDate: '08/25',
      isDefault: false,
      color: ['#7c3aed', '#8b5cf6'],
      status: 'active',
    },
  ]);

  const handleSetDefault = (cardId: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
    Alert.alert('Success', 'Default card updated successfully');
  };

  const handleBlockCard = (card: Card) => {
    Alert.alert(
      'Block Card',
      `Are you sure you want to block card ending in ${card.number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            setCards(
              cards.map((c) =>
                c.id === card.id ? { ...c, status: 'blocked' as const } : c
              )
            );
            Alert.alert('Success', 'Card blocked successfully');
          },
        },
      ]
    );
  };

  const handleUnblockCard = (cardId: string) => {
    setCards(
      cards.map((c) => (c.id === cardId ? { ...c, status: 'active' as const } : c))
    );
    Alert.alert('Success', 'Card unblocked successfully');
  };

  const handleDeleteCard = (card: Card) => {
    Alert.alert(
      'Delete Card',
      `Are you sure you want to delete card ending in ${card.number}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCards(cards.filter((c) => c.id !== card.id));
            Alert.alert('Success', 'Card deleted successfully');
          },
        },
      ]
    );
  };

  const getCardTypeLabel = (type: string) => {
    switch (type) {
      case 'debit':
        return 'Debit Card';
      case 'credit':
        return 'Credit Card';
      case 'virtual':
        return 'Virtual Card';
      default:
        return 'Card';
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 py-4 bg-gray-50`}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={tw`px-3 py-4 border-b border-gray-100 bg-white`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <View>
              <Text style={tw`text-xl font-bold text-gray-900`}>Manage Cards</Text>
              <Text style={tw`text-xs text-gray-500`}>View and manage your cards</Text>
            </View>
          </View>
          <TouchableOpacity
            style={tw`bg-blue-600 px-4 py-2 rounded-full`}
            onPress={() => Alert.alert('Add Card', 'Add new card feature coming soon.')}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-3 pt-6`} showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Cards List */}
        <View style={tw`mb-6`}>
          {cards.map((card, index) => (
            <View key={card.id} style={tw`mb-4`}>
              {/* Card Display */}
              <LinearGradient
                colors={card.color}
                style={tw`rounded-3xl p-6 mb-4`}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={tw`flex-row justify-between items-start mb-6`}>
                  <View>
                    <Text style={tw`text-white/80 text-xs mb-1`}>{getCardTypeLabel(card.type)}</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      •••• •••• •••• {card.number}
                    </Text>
                  </View>
                  {card.status === 'blocked' && (
                    <View style={tw`bg-red-500 px-2 py-1 rounded-full`}>
                      <Text style={tw`text-white text-xs font-semibold`}>Blocked</Text>
                    </View>
                  )}
                </View>

                <View style={tw`flex-row justify-between items-end`}>
                  <View>
                    <Text style={tw`text-white/80 text-xs mb-1`}>Card Holder</Text>
                    <Text style={tw`text-white font-semibold`}>{card.holderName}</Text>
                  </View>
                  <View>
                    <Text style={tw`text-white/80 text-xs mb-1`}>Expires</Text>
                    <Text style={tw`text-white font-semibold`}>{card.expiryDate}</Text>
                  </View>
                </View>

                {card.isDefault && (
                  <View style={tw`absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full`}>
                    <Text style={tw`text-white text-xs font-semibold`}>Default</Text>
                  </View>
                )}
              </LinearGradient>

              {/* Card Actions */}
              <View style={tw`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm`}>
                <View style={tw`flex-row flex-wrap gap-2`}>
                  {!card.isDefault && card.status === 'active' && (
                    <TouchableOpacity
                      style={tw`bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl flex-1`}
                      onPress={() => handleSetDefault(card.id)}
                      activeOpacity={0.7}
                    >
                      <View style={tw`flex-row items-center justify-center`}>
                        <Ionicons name="star" size={16} color="#2563eb" />
                        <Text style={tw`text-blue-600 font-semibold ml-2 text-sm`}>Set Default</Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  {card.status === 'active' ? (
                    <TouchableOpacity
                      style={tw`bg-red-50 border border-red-200 px-4 py-2 rounded-xl flex-1`}
                      onPress={() => handleBlockCard(card)}
                      activeOpacity={0.7}
                    >
                      <View style={tw`flex-row items-center justify-center`}>
                        <Ionicons name="lock-closed" size={16} color="#dc2626" />
                        <Text style={tw`text-red-600 font-semibold ml-2 text-sm`}>Block</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={tw`bg-green-50 border border-green-200 px-4 py-2 rounded-xl flex-1`}
                      onPress={() => handleUnblockCard(card.id)}
                      activeOpacity={0.7}
                    >
                      <View style={tw`flex-row items-center justify-center`}>
                        <Ionicons name="lock-open" size={16} color="#10b981" />
                        <Text style={tw`text-green-600 font-semibold ml-2 text-sm`}>Unblock</Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={tw`bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl flex-1`}
                    onPress={() => Alert.alert('View Details', 'Card details feature coming soon.')}
                    activeOpacity={0.7}
                  >
                    <View style={tw`flex-row items-center justify-center`}>
                      <Ionicons name="eye-outline" size={16} color="#6b7280" />
                      <Text style={tw`text-gray-600 font-semibold ml-2 text-sm`}>Details</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`bg-red-50 border border-red-200 px-4 py-2 rounded-xl`}
                    onPress={() => handleDeleteCard(card)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={16} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add Card CTA */}
        <TouchableOpacity
          style={tw`bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 items-center mb-6`}
          onPress={() => Alert.alert('Add Card', 'Add new card feature coming soon.')}
          activeOpacity={0.7}
        >
          <View style={tw`bg-blue-100 w-16 h-16 rounded-full items-center justify-center mb-3`}>
            <Ionicons name="add" size={32} color="#2563eb" />
          </View>
          <Text style={tw`text-gray-900 font-bold text-base mb-1`}>Add New Card</Text>
          <Text style={tw`text-gray-500 text-sm text-center`}>
            Add a debit, credit, or virtual card to your account
          </Text>
        </TouchableOpacity>

        {/* Security Info */}
        <View style={tw`bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#3b82f6" />
            <Text style={tw`text-blue-900 font-semibold ml-2`}>Card Security</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Your card details are encrypted and secure
          </Text>
          <Text style={tw`text-xs text-gray-600 mb-2`}>
            • Block your card immediately if it's lost or stolen
          </Text>
          <Text style={tw`text-xs text-gray-600`}>
            • Set a default card for faster checkout
          </Text>
        </View>

        {/* Card Types Info */}
        <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}>
          <Text style={tw`text-gray-900 font-bold text-base mb-4`}>Card Types</Text>
          <View style={tw`gap-4`}>
            <View>
              <Text style={tw`text-gray-900 font-semibold text-sm mb-1`}>Debit Card</Text>
              <Text style={tw`text-gray-500 text-xs`}>
                Physical card linked to your wallet balance
              </Text>
            </View>
            <View>
              <Text style={tw`text-gray-900 font-semibold text-sm mb-1`}>Virtual Card</Text>
              <Text style={tw`text-gray-500 text-xs`}>
                Digital card for online transactions
              </Text>
            </View>
            <View>
              <Text style={tw`text-gray-900 font-semibold text-sm mb-1`}>Credit Card</Text>
              <Text style={tw`text-gray-500 text-xs`}>
                Credit card for flexible payments
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

