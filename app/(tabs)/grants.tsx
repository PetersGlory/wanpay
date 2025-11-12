import { DEEP_PURPLE } from '@/constants/customConstants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import tw from 'twrnc';

// Types
interface Grant {
  id: string;
  title: string;
  organization: string;
  amount: string;
  category: string;
  deadline: string;
  status: 'open' | 'closing-soon' | 'closed';
  description: string;
  requirements: string[];
  eligibility: string[];
  applicationLink?: string;
}

interface GrantCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  count: number;
}

const GROWTH_SECTIONS = [
  {
    id: 'grants',
    label: 'Grants',
    description: 'Browse verified local and international grant opportunities.',
  },
  {
    id: 'business-aids',
    label: 'Business Aids',
    description: 'Explore government programmes and private funds tailored to Nigerian MSMEs.',
  },
  {
    id: 'training-support',
    label: 'Training & Support',
    description: 'Find accelerators, mentorship, and growth services for your team.',
  },
] as const;

type GrowthSection = typeof GROWTH_SECTIONS[number];
type GrowthSectionId = GrowthSection['id'];

interface GrowthResourceItem {
  title: string;
  description?: string;
  bullets?: string[];
}

interface GrowthResourceSection {
  id: string;
  title: string;
  summary?: string;
  items: GrowthResourceItem[];
}

const BUSINESS_AIDS_RESOURCES: GrowthResourceSection[] = [
  {
    id: 'federal-state',
    title: 'Federal and State Government Grants',
    items: [
      {
        title: 'Lagos State Employment Trust Fund (LSETF)',
        description:
          'Offers up to ₦5,000,000 for Lagos-based businesses focused on job creation. Open year-round with rolling assessments.',
      },
      {
        title: 'Federal Government Youth Investment Fund (YIF)',
        description:
          'Provides up to ₦3,000,000 for youth (ages 18–35) with viable business ideas. Applications are ongoing nationwide.',
      },
      {
        title: 'Digital and Creative Enterprises (iDiCE) Program',
        description:
          'Promotes investment in technology and creative startups in partnership with the Bank of Industry and global development partners.',
      },
      {
        title: 'Skill-Up Artisans Program',
        description:
          'Supports artisans and SMEs with hands-on training, certification, and access to specialised equipment.',
      },
    ],
  },
  {
    id: 'private-international',
    title: 'Private and International Grants',
    items: [
      {
        title: 'Tony Elumelu Foundation Entrepreneurship Programme',
        description:
          'Offers $5,000 in seed funding, mentorship, and business training for African entrepreneurs. Applications open annually via TEFConnect.',
      },
      {
        title: "Africa's Young Entrepreneur Empowerment Nigeria (AYEEN)",
        description:
          'Awards grants ranging from hundreds of thousands to millions of naira to innovative entrepreneurs across Nigeria.',
      },
      {
        title: 'GroFin Fund',
        description:
          'Provides $100,000 – $1,500,000 in patient capital for small and growing businesses in healthcare, education, agriculture, and manufacturing.',
      },
      {
        title: 'Shell LiveWIRE Nigeria',
        description:
          'Offers up to ₦10,000,000 for young entrepreneurs in energy, technology, and agriculture, alongside incubation support.',
      },
      {
        title: 'AWIEF Growth Accelerator',
        description:
          'Supports women entrepreneurs with $10,000 – $25,000 grants, business development training, and investor readiness support.',
      },
      {
        title: 'USAID Power Africa Off-Grid Energy Challenge',
        description:
          'Provides up to $100,000 for renewable energy companies delivering off-grid solutions to underserved communities.',
      },
    ],
  },
  {
    id: 'pan-african',
    title: 'Pan-African Opportunities',
    items: [
      {
        title: 'Anzisha Prize',
        description:
          'Awards up to $25,000 for young entrepreneurs (ages 15–22) leading community-driven innovation and job creation.',
      },
      {
        title: 'African Entrepreneurship Award',
        description:
          'Delivers mentorship and funding to innovative, tech-driven African businesses addressing critical local challenges.',
      },
    ],
  },
  {
    id: 'application-tips',
    title: 'Application Tips',
    summary: 'Position your business to stand out during competitive grant rounds.',
    items: [
      {
        title: 'Best Practices',
        bullets: [
          'Visit official programme websites for the latest eligibility requirements and timelines.',
          'Align your business model with the stated focus areas, impact goals, and documentation needs.',
          'Prepare financial statements, pitch decks, and proof of traction ahead of deadlines.',
        ],
      },
    ],
  },
  {
    id: 'women-focused',
    title: 'For Women',
    items: [
      {
        title: 'African Women Innovation and Entrepreneurship Forum (AWIEF) Grants',
        description:
          'Supports innovative women-led businesses operating in Africa for at least three years, with funding of $10,000 – $25,000 plus mentorship.',
      },
      {
        title: 'Womenpreneur Pitch-a-Ton Africa (Access Bank)',
        description:
          'Empowers Nigerian women entrepreneurs with business training, mentorship, and grants of up to ₦5,000,000.',
      },
      {
        title: 'Women in Tech Africa (WiTA) Funding',
        description:
          'Provides capital, global exposure, and mentorship to women-led technology startups across Africa.',
      },
      {
        title: 'Cherie Blair Foundation for Women',
        description:
          'Delivers mentoring, training, and financial support to women entrepreneurs, with a focus on marginalised communities.',
      },
      {
        title: 'MamaCash',
        description:
          "Funds grassroots, women-led initiatives advancing women's rights and economic independence throughout Africa.",
      },
      {
        title: 'Female Entrepreneurs Grant by Aliko Dangote Foundation',
        description:
          'Offers ₦100,000 – ₦1,000,000 to low-income women in Nigeria to expand or stabilise their businesses.',
      },
      {
        title: 'Flourish Africa Grant',
        description:
          'Provides Nigerian women with grants and comprehensive skills-building programmes to scale startups and established ventures.',
      },
    ],
  },
  {
    id: 'geo-political',
    title: 'Grants According to Geo-Political Zones',
    items: [
      {
        title: 'North-West Region (Kano, Kaduna, Sokoto, Katsina, etc.)',
        bullets: [
          'Development Bank of Nigeria (DBN) Entrepreneurship Grant: Financial assistance for MSMEs in high-growth sectors such as agriculture and technology.',
          'Youth Empowerment Nigeria (YEN): Skill acquisition programmes and seed grants tailored to young entrepreneurs in states like Kano and Kaduna.',
          'National Directorate of Employment (NDE) Grants: Micro-business support for youth and women across the North-West.',
        ],
      },
      {
        title: 'North-East Region (Borno, Yobe, Adamawa, Bauchi, etc.)',
        bullets: [
          'North-East Development Commission (NEDC): Grants and rebuilding funds for entrepreneurs in conflict-affected communities.',
          "Women's Entrepreneurship Grant Programme: Financial support, training, and mentorship dedicated to women in the North-East.",
        ],
      },
      {
        title: 'North-Central Region (Abuja, Kogi, Kwara, Benue, etc.)',
        bullets: [
          'Tony Elumelu Foundation Entrepreneurship Programme: $5,000 seed capital for high-potential ventures across the region.',
          'Youth Investment Fund (YIF): Up to ₦3,000,000 for young entrepreneurs in Abuja, Kwara, Kogi, and neighbouring states.',
          'Industrial Training Fund (ITF): Grants and capacity-building initiatives for artisans and SMEs to enhance productivity.',
        ],
      },
      {
        title: 'South-West Region (Lagos, Ogun, Oyo, Ekiti, Ondo, etc.)',
        bullets: [
          'Lagos State Employment Trust Fund (LSETF): Grants up to ₦5,000,000 alongside capacity-building support for MSMEs.',
          'Womenpreneur Pitch-a-Ton Africa: Training and grants up to ₦5,000,000 for women entrepreneurs across the region.',
          'Digital and Creative Enterprises (iDiCE) Program: Grants and accelerator-style support for tech and creative startups.',
        ],
      },
      {
        title: 'South-East Region (Anambra, Enugu, Imo, Ebonyi, Abia)',
        bullets: [
          'Shell LiveWIRE Nigeria: Up to ₦10,000,000 for youth and women entrepreneurs within oil-producing communities.',
          'Innoson Kiara Academy Grants: Technical training and business development funds targeting aspiring industrialists.',
          'GroFin Fund: Long-term growth finance ranging from $100,000 – $1,500,000 for MSMEs in key sectors.',
        ],
      },
      {
        title: 'South-South Region (Rivers, Delta, Akwa Ibom, Bayelsa, Cross River)',
        bullets: [
          'Niger Delta Development Commission (NDDC) Grants: Funding for MSMEs and community-led projects across the Niger Delta.',
          'Women Entrepreneurship Fund (Shell LiveWIRE Nigeria): Up to ₦10,000,000 plus mentorship for sustainable women-led ventures.',
        ],
      },
    ],
  },
];

export default function GrowthHubScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [activeSection, setActiveSection] = useState<GrowthSectionId>('grants');

  const handleSectionChange = (sectionId: GrowthSectionId) => {
    setActiveSection(sectionId);
    setShowFilterModal(false);
    if (sectionId !== 'grants') {
      setSelectedCategory('all');
      setFilterStatus('all');
      setSearchQuery('');
      setSelectedGrant(null);
    }
  };

  // Sample grants data
  const grants: Grant[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Tony Elumelu Foundation Entrepreneurship Programme',
        organization: 'Tony Elumelu Foundation',
        amount: '$5,000',
        category: 'Business',
        deadline: 'Dec 31, 2024',
        status: 'open',
        description: 'The TEF Entrepreneurship Programme is open to entrepreneurs from all 54 African countries. The Programme provides training, mentoring, and seed capital funding of $5,000 to African entrepreneurs.',
        requirements: [
          'Must be between 18-35 years old',
          'Business must be less than 3 years old',
          'Must be an African citizen',
          'Must have a viable business plan',
        ],
        eligibility: [
          'African entrepreneurs',
          'Business owners',
          'Startups and MSMEs',
          'All sectors welcome',
        ],
        applicationLink: 'https://tefconnect.com',
      },
      {
        id: '2',
        title: 'YouWiN! Connect Program',
        organization: 'Federal Government of Nigeria',
        amount: '₦1,000,000 - ₦10,000,000',
        category: 'Business',
        deadline: 'Nov 30, 2024',
        status: 'closing-soon',
        description: 'Youth Enterprise With Innovation in Nigeria (YouWiN!) Connect is designed to encourage and support aspiring and early-stage entrepreneurs to develop and execute business ideas that will generate employment.',
        requirements: [
          'Nigerian citizen between 18-45 years',
          'Must have NIN',
          'Business plan required',
          'Must create employment opportunities',
        ],
        eligibility: [
          'Nigerian youth entrepreneurs',
          'First-time applicants',
          'Innovative business ideas',
          'Job creation focus',
        ],
      },
      {
        id: '3',
        title: 'Google for Startups Black Founders Fund',
        organization: 'Google',
        amount: '$100,000',
        category: 'Technology',
        deadline: 'Jan 15, 2025',
        status: 'open',
        description: 'Non-dilutive cash awards and hands-on support for Black-led startups building technology companies across Africa.',
        requirements: [
          'Black-founded startup',
          'Technology-focused company',
          'Registered business entity',
          'At least $500K in revenue or funding',
        ],
        eligibility: [
          'African startups',
          'Black founders',
          'Tech companies',
          'Growth stage',
        ],
      },
      {
        id: '4',
        title: 'Mastercard Foundation Scholars Program',
        organization: 'Mastercard Foundation',
        amount: 'Full Scholarship',
        category: 'Education',
        deadline: 'Feb 28, 2025',
        status: 'open',
        description: 'The Mastercard Foundation Scholars Program provides academically talented yet economically disadvantaged young people with the opportunity to complete their education.',
        requirements: [
          'Academic excellence',
          'Financial need',
          'Leadership potential',
          'Commitment to giving back',
        ],
        eligibility: [
          'African students',
          'Undergraduate/Graduate',
          'Age 18-30',
          'Strong academic record',
        ],
      },
      {
        id: '5',
        title: 'CBN Youth Entrepreneurship Development Programme',
        organization: 'Central Bank of Nigeria',
        amount: '₦250,000 - ₦3,000,000',
        category: 'Agriculture',
        deadline: 'Dec 15, 2024',
        status: 'open',
        description: 'YEDP aims to address youth unemployment by providing financial assistance and business training to young Nigerians in agriculture and agro-processing.',
        requirements: [
          'Age 18-35 years',
          'Nigerian citizen',
          'Valid BVN',
          'Agriculture/agro-processing focus',
        ],
        eligibility: [
          'Youth entrepreneurs',
          'Agriculture sector',
          'Nigerian nationals',
          'Business plan required',
        ],
      },
      {
        id: '6',
        title: 'She Leads Africa Accelerator',
        organization: 'She Leads Africa',
        amount: '$10,000',
        category: 'Women',
        deadline: 'Jan 31, 2025',
        status: 'open',
        description: 'Supporting women-led businesses across Africa with funding, mentorship, and access to networks.',
        requirements: [
          'Woman founder/co-founder',
          'Business operational for 1+ year',
          'Revenue generating',
          'Based in Africa',
        ],
        eligibility: [
          'Women entrepreneurs',
          'African-based businesses',
          'All sectors',
          'Growth-stage companies',
        ],
      },
      {
        id: '7',
        title: 'AfDB Youth Entrepreneurship and Innovation Multi-Donor Trust Fund',
        organization: 'African Development Bank',
        amount: '$50,000 - $150,000',
        category: 'Innovation',
        deadline: 'Nov 20, 2024',
        status: 'closing-soon',
        description: 'Supports innovative youth-led enterprises that can scale and create jobs across Africa.',
        requirements: [
          'Youth-led enterprise (founder <35)',
          'Innovative business model',
          'Scalability potential',
          'Job creation focus',
        ],
        eligibility: [
          'African youth',
          'Innovative startups',
          'All sectors',
          'Early to growth stage',
        ],
      },
      {
        id: '8',
        title: 'UNICEF Innovation Fund',
        organization: 'UNICEF',
        amount: '$100,000',
        category: 'Social Impact',
        deadline: 'Rolling',
        status: 'open',
        description: 'Invests in early-stage open-source technology solutions that have the potential to positively impact children and young people.',
        requirements: [
          'Open-source technology',
          'Prototype developed',
          'Team of 2-7 people',
          'Focus on children/youth impact',
        ],
        eligibility: [
          'Tech startups',
          'Social impact focus',
          'Developing countries',
          'Open-source commitment',
        ],
      },
    ],
    []
  );

  const categories: GrantCategory[] = useMemo(
    () => [
      { id: 'all', name: 'All Grants', icon: 'apps', color: '#3b82f6', count: grants.length },
      {
        id: 'business',
        name: 'Business',
        icon: 'briefcase',
        color: '#8b5cf6',
        count: grants.filter((g) => g.category === 'Business').length,
      },
      {
        id: 'technology',
        name: 'Technology',
        icon: 'laptop',
        color: '#06b6d4',
        count: grants.filter((g) => g.category === 'Technology').length,
      },
      {
        id: 'education',
        name: 'Education',
        icon: 'school',
        color: '#10b981',
        count: grants.filter((g) => g.category === 'Education').length,
      },
      {
        id: 'agriculture',
        name: 'Agriculture',
        icon: 'leaf',
        color: '#84cc16',
        count: grants.filter((g) => g.category === 'Agriculture').length,
      },
      {
        id: 'women',
        name: 'Women',
        icon: 'woman',
        color: '#ec4899',
        count: grants.filter((g) => g.category === 'Women').length,
      },
      {
        id: 'innovation',
        name: 'Innovation',
        icon: 'bulb-outline',
        color: '#f59e0b',
        count: grants.filter((g) => g.category === 'Innovation').length,
      },
      {
        id: 'social-impact',
        name: 'Social Impact',
        icon: 'heart-outline',
        color: '#ef4444',
        count: grants.filter((g) => g.category === 'Social Impact').length,
      },
    ],
    [grants]
  );

  // Filter grants
  const filteredGrants = useMemo(() => {
    let filtered = grants;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (g) => g.category.toLowerCase() === selectedCategory.toLowerCase() || 
               (selectedCategory === 'social-impact' && g.category === 'Social Impact') ||
               (selectedCategory === 'innovation' && g.category === 'Innovation')
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((g) => g.status === filterStatus);
    }

    return filtered;
  }, [grants, selectedCategory, searchQuery, filterStatus]);

  const sectionSubtitle = useMemo(() => {
    switch (activeSection) {
      case 'business-aids':
        return 'Discover incentives, tools, and programmes to strengthen your business foundation.';
      case 'training-support':
        return 'Access accelerators, mentorship, and skill-building opportunities.';
      default:
        return `${filteredGrants.length} grant opportunities available`;
    }
  }, [activeSection, filteredGrants.length]);

  const activeSectionMeta = useMemo(() => GROWTH_SECTIONS.find((section) => section.id === activeSection), [activeSection]);

  const searchPlaceholder = activeSection === 'grants' ? 'Search grants...' : 'Search growth resources...';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return { bg: 'bg-green-100', text: 'text-green-700', dot: '#10b981' };
      case 'closing-soon':
        return { bg: 'bg-orange-100', text: 'text-orange-700', dot: '#f97316' };
      case 'closed':
        return { bg: 'bg-gray-100', text: 'text-gray-700', dot: '#6b7280' };
      default:
        return { bg: 'bg-blue-100', text: 'text-blue-700', dot: '#3b82f6' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closing-soon':
        return 'Closing Soon';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={tw`w-full h-full bg-gray-50`}>
      <StatusBar style='light' />

      {/* Header with Gradient */}
      <LinearGradient
        colors={[DEEP_PURPLE, '#6d28d9']}
        style={tw`px-4 py-6 h-auto`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>Growth Hub</Text>
            <Text style={tw`text-white/80 text-sm mt-1`}>{sectionSubtitle}</Text>
            {activeSectionMeta?.description ? (
              <Text style={tw`text-white/60 text-xs mt-1`}>{activeSectionMeta.description}</Text>
            ) : null}
          </View>
          {activeSection === 'grants' && (
            <TouchableOpacity
              style={tw`bg-white/20 p-3 rounded-full`}
              onPress={() => setShowFilterModal(true)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Filter grants"
            >
              <Ionicons name="filter" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Bar */}
        <View style={tw`bg-white/20 rounded-2xl px-4 py-3 flex-row items-center`}>
          <Ionicons name="search" size={20} color="#fff" />
          <TextInput
            style={tw`flex-1 ml-3 text-white text-base`}
            placeholder={searchPlaceholder}
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            editable={activeSection === 'grants'}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Growth Sections */}
      <View style={tw`bg-white border-b border-gray-100`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-4 gap-2`}
          style={tw`py-3`}
        >
          {GROWTH_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <TouchableOpacity
                key={section.id}
                style={[
                  tw`px-4 py-2 rounded-full`,
                  isActive ? tw`bg-purple-600` : tw`bg-gray-100`,
                ]}
                onPress={() => handleSectionChange(section.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    tw`text-sm font-semibold`,
                    isActive ? tw`text-white` : tw`text-gray-700`,
                  ]}
                >
                  {section.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {activeSection === 'grants' && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-4 gap-2 pb-3`}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    tw`flex-row items-center px-4 py-2.5 rounded-full`,
                    isSelected
                      ? tw`bg-purple-600`
                      : tw`bg-gray-100`,
                    {
                      shadowColor: isSelected ? '#7c3aed' : '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: isSelected ? 0.2 : 0.05,
                      shadowRadius: 3,
                      elevation: isSelected ? 3 : 1,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={category.icon}
                    size={18}
                    color={isSelected ? '#fff' : category.color}
                    style={tw`mr-2`}
                  />
                  <Text
                    style={[
                      tw`font-semibold text-sm`,
                      isSelected ? tw`text-white` : tw`text-gray-700`,
                    ]}
                  >
                    {category.name}
                  </Text>
                  <View
                    style={[
                      tw`ml-2 px-2 py-0.5 rounded-full`,
                      isSelected ? tw`bg-white/30` : tw`bg-gray-200`,
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-xs font-bold`,
                        isSelected ? tw`text-white` : tw`text-gray-600`,
                      ]}
                    >
                      {category.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      <View style={tw`flex-1`}>
        {activeSection === 'grants' && (
          <ScrollView
            style={tw`flex-1 px-3 pt-4`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-8`}
          >
            {filteredGrants.length > 0 ? (
              filteredGrants.map((grant) => {
                const statusColors = getStatusColor(grant.status);
                return (
                  <TouchableOpacity
                    key={grant.id}
                    style={[
                      tw`bg-white rounded-2xl p-5 mb-4`,
                      { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }
                    ]}
                    onPress={() => setSelectedGrant(grant)}
                    activeOpacity={0.7}
                  >
                    {/* Header */}
                    <View style={tw`flex-row justify-between items-start mb-3`}>
                      <View style={tw`flex-1 mr-3`}>
                        <Text style={tw`text-base font-bold text-gray-900 mb-1`}>
                          {grant.title}
                        </Text>
                        <Text style={tw`text-sm text-gray-600`}>{grant.organization}</Text>
                      </View>
                      <View style={[tw`px-3 py-1.5 rounded-full flex-row items-center`, tw`${statusColors.bg}`]}>
                        <View
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: statusColors.dot,
                            marginRight: 6,
                          }}
                        />
                        <Text style={[tw`text-xs font-semibold`, tw`${statusColors.text}`]}>
                          {getStatusLabel(grant.status)}
                        </Text>
                      </View>
                    </View>

                    {/* Amount & Category */}
                    <View style={tw`flex-row items-center mb-3`}>
                      <View style={tw`bg-purple-50 px-3 py-1.5 rounded-full mr-2`}>
                        <Text style={tw`text-purple-700 font-bold text-sm`}>{grant.amount}</Text>
                      </View>
                      <View style={tw`bg-gray-100 px-3 py-1.5 rounded-full`}>
                        <Text style={tw`text-gray-700 text-xs font-semibold`}>{grant.category}</Text>
                      </View>
                    </View>

                    {/* Deadline */}
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                      <Text style={tw`text-gray-600 text-sm ml-2`}>
                        Deadline: {grant.deadline}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={tw`bg-white rounded-2xl p-8 items-center mt-8`}>
                <Ionicons name="search-outline" size={64} color="#d1d5db" />
                <Text style={tw`text-gray-400 text-center mt-4 text-base`}>
                  No grants found
                </Text>
                <Text style={tw`text-gray-400 text-center mt-2 text-sm`}>
                  Try adjusting your search or filters
                </Text>
              </View>
            )}
          </ScrollView>
        )}

        {activeSection === 'business-aids' && (
          <ScrollView
            style={tw`flex-1 px-3 pt-4`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-10`}
          >
            {BUSINESS_AIDS_RESOURCES.map((section) => (
              <View key={section.id} style={tw`mb-8`}>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-lg font-bold text-gray-900`}>{section.title}</Text>
                  {section.summary ? (
                    <Text style={tw`text-gray-600 text-sm mt-1 leading-5`}>{section.summary}</Text>
                  ) : null}
                </View>
                <View style={tw`gap-3`}>
                  {section.items.map((item, itemIndex) => (
                    <View
                      key={`${section.id}-${itemIndex}`}
                      style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}
                    >
                      <Text style={tw`text-gray-900 font-semibold text-base`}>{item.title}</Text>
                      {item.description ? (
                        <Text style={tw`text-gray-600 text-sm leading-5 mt-2`}>{item.description}</Text>
                      ) : null}
                      {item.bullets ? (
                        <View style={tw`mt-3 gap-2`}>
                          {item.bullets.map((bullet, bulletIndex) => (
                            <View
                              key={`${section.id}-${itemIndex}-bullet-${bulletIndex}`}
                              style={tw`flex-row items-start`}
                            >
                              <View style={tw`w-2.5 h-2.5 rounded-full bg-purple-500 mt-1 mr-2`} />
                              <Text style={tw`text-gray-600 text-sm flex-1 leading-5`}>{bullet}</Text>
                            </View>
                          ))}
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {activeSection === 'training-support' && (
          <ScrollView
            style={tw`flex-1 px-3 pt-4`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-10`}
          >
            <View style={tw`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm`}>
              <Text style={tw`text-gray-900 font-semibold text-base`}>Training & Support</Text>
              <Text style={tw`text-gray-600 text-sm leading-5 mt-2`}>
                We are curating a catalogue of accelerators, mentorship programmes, and digital training resources.
                Check back soon for the latest opportunities designed to help your business scale.
              </Text>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Grant Details Modal */}
      <Modal
        visible={selectedGrant !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedGrant(null)}
      >
        {selectedGrant && (
          <SafeAreaView style={tw`flex-1 bg-white`}>
            <StatusBar style="dark" />
            
            {/* Modal Header */}
            <View style={tw`px-4 py-4 border-b border-gray-100 flex-row justify-between items-center`}>
              <Text style={tw`text-xl font-bold text-gray-900`}>Grant Details</Text>
              <TouchableOpacity
                onPress={() => setSelectedGrant(null)}
                style={tw`p-2`}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={tw`flex-1 px-6 pt-6`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-8`}
            >
              {/* Title & Organization */}
              <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
                {selectedGrant.title}
              </Text>
              <Text style={tw`text-base text-gray-600 mb-4`}>
                {selectedGrant.organization}
              </Text>

              {/* Status & Amount */}
              <View style={tw`flex-row gap-3 mb-6`}>
                <View style={tw`bg-purple-50 px-4 py-2 rounded-xl flex-1`}>
                  <Text style={tw`text-purple-700 font-bold text-lg text-center`}>
                    {selectedGrant.amount}
                  </Text>
                  <Text style={tw`text-purple-600 text-xs text-center mt-1`}>Grant Amount</Text>
                </View>
                <View style={tw`bg-orange-50 px-4 py-2 rounded-xl flex-1`}>
                  <Text style={tw`text-orange-700 font-bold text-lg text-center`}>
                    {selectedGrant.deadline}
                  </Text>
                  <Text style={tw`text-orange-600 text-xs text-center mt-1`}>Deadline</Text>
                </View>
              </View>

              {/* Description */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Description</Text>
                <Text style={tw`text-gray-700 leading-6`}>{selectedGrant.description}</Text>
              </View>

              {/* Requirements */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Requirements</Text>
                <View style={tw`bg-blue-50 rounded-xl p-4`}>
                  {selectedGrant.requirements.map((req, index) => (
                    <View key={index} style={tw`flex-row mb-2`}>
                      <Ionicons name="checkmark-circle" size={20} color="#3b82f6" style={tw`mr-2 mt-0.5`} />
                      <Text style={tw`text-gray-700 flex-1`}>{req}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Eligibility */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Eligibility</Text>
                <View style={tw`flex-row flex-wrap gap-2`}>
                  {selectedGrant.eligibility.map((item, index) => (
                    <View key={index} style={tw`bg-green-50 px-3 py-2 rounded-full`}>
                      <Text style={tw`text-green-700 text-sm font-semibold`}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Apply Button */}
            <View style={tw`px-6 py-4 border-t border-gray-100 bg-white`}>
              <TouchableOpacity
                style={tw`bg-purple-600 py-4 rounded-xl flex-row items-center justify-center shadow-lg`}
                activeOpacity={0.8}
                onPress={() => {
                  if (selectedGrant.applicationLink) {
                    alert(`Opening application link: ${selectedGrant.applicationLink}`);
                  } else {
                    alert('Application link not available');
                  }
                }}
              >
                <Ionicons name="paper-plane" size={20} color="#fff" style={tw`mr-2`} />
                <Text style={tw`text-white font-bold text-lg`}>Apply Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`mt-3 py-3`}
                onPress={() => setSelectedGrant(null)}
                activeOpacity={0.7}
              >
                <Text style={tw`text-gray-600 text-center font-semibold`}>Close</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} animationType="slide" transparent>
        <View style={tw`flex-1 justify-end bg-black/50`}>
          <View style={tw`bg-white rounded-t-3xl pt-6 pb-8`}>
            <View style={tw`px-6 pb-4 border-b border-gray-100`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-xl font-bold text-gray-900`}>Filter Grants</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)} activeOpacity={0.7}>
                  <Ionicons name="close" size={28} color="#111827" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`px-6 pt-6`}>
              <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Status</Text>
              <View style={tw`gap-3 mb-6`}>
                {[
                  { value: 'all', label: 'All Status' },
                  { value: 'open', label: 'Open' },
                  { value: 'closing-soon', label: 'Closing Soon' },
                  { value: 'closed', label: 'Closed' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      tw`border-2 rounded-xl px-4 py-3`,
                      filterStatus === option.value
                        ? tw`border-purple-600 bg-purple-50`
                        : tw`border-gray-200 bg-white`,
                    ]}
                    onPress={() => setFilterStatus(option.value)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        tw`font-semibold`,
                        filterStatus === option.value ? tw`text-purple-600` : tw`text-gray-700`,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={tw`bg-purple-600 py-4 rounded-xl shadow-lg`}
                onPress={() => setShowFilterModal(false)}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white text-center font-bold text-lg`}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}