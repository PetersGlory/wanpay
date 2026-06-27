# WanPay - Agent Guide

> React Native (Expo) mobile wallet and financial growth platform for Nigerian entrepreneurs.

## Dev setup

```bash
npm install
# copy .env.example to .env and set EXPO_PUBLIC_API_URL
npx expo start
```

**Linting**: `npm run lint` (uses `eslint-config-expo`)

**Testing**: None. No testing framework installed.

**Build**: EAS build (`eas.json`) with development, preview, and production profiles.

## Tech Stack

| Area | Technology |
|------|-----------|
| Framework | Expo 54, React 19.1, RN 0.81 |
| Routing | Expo Router 6 (file-based) |
| Styling | Tailwind via `twrnc` (imported as `tw`) |
| Icons | `@expo/vector-icons/Ionicons` |
| Auth | JWT, 4-digit PIN for transactions |
| Secure Storage | `expo-secure-store` |
| HTTP | Custom fetch wrapper in `lib/api.ts` |

## Directory structure

```
wanpay/
├── app/                    # Expo Router pages (file-based)
│   ├── _layout.tsx         # Root Stack navigator, wraps AuthProvider + ThemeProvider
│   ├── index.tsx           # Entry, redirects to /welcome
│   ├── welcome.tsx         # Onboarding
│   ├── login.tsx           # Phone + PIN login
│   ├── signup.tsx          # Registration
│   ├── otp.tsx             # 6-digit OTP
│   ├── createPin.tsx       # 4-digit PIN setup
│   ├── (tabs)/             # Bottom tab navigator (authenticated area)
│   │   ├── _layout.tsx     # Tab bar (6 tabs) with auth guard
│   │   ├── index.tsx       # Home - wallet, quick actions, recent txns
│   │   ├── transfer.tsx    # Send money
│   │   ├── bills.tsx       # Bills overview
│   │   ├── history.tsx     # Transaction history
│   │   ├── grants.tsx      # Growth Hub
│   │   └── profile.tsx     # User profile
│   ├── bills/              # Bill payment screens (airtime, data, electricity, tv, internet, education)
│   └── profile/            # profile sub-screens (personal-info, security, limits, cards, BVN, etc.)
├── components/             # Shared components
│   ├── ui/                 # UI primitives (Button, Input) - defined but mostly unused
│   ├── BalanceCard.tsx     # Wallet balance display
│   ├── TransactionItem.tsx # Transaction row
│   ├── FormattedDate.tsx   # Date formatter
│   ├── QuickAction.tsx     # Action button
│   └── RefreshableScrollView.tsx # ScrollView with optional pull-to-refresh
├── constants/
│   ├── customConstants.js   # Brand colors (PRIMARY_COLOR #2563EB, DARK_BG #05050e, etc.)
│   └── theme.ts             # Light/dark theme Colors + Fonts
├── hooks/                   # Custom hooks (use-grants, use-color-theme, etc.)
├── lib/
│   ├── api.ts               # HTTP wrapper (JWT, device-id, error handling)
│   └── types.ts             # TypeScript interfaces
├── assets/images/           # Static images
└── scripts/
```

## Coding conventions

- **File naming**: PascalCase for components/screens, kebab-case for utilities.
- **Component style**: Functional with named export default. Props typed with TypeScript interfaces.
- **Styling**: Use `tw` from `twrnc` for Tailwind-like inline styles.
  Ex: `tw\`bg-[${DARK_BG}]\``, `tw\`bg-white/10 border border-white/12 p-5\``
- **Theming**: Dark background with white/blue text. Dark theme convention is `bg-[${DARK_BG}]` everywhere.
- **Icons**: Ionicons from `@expo/vector-icons`.
- **Imports**: Use `@/` alias. Import twrnc as: `import tw from 'twrnc'`.
- **State**: Local state with `useState`/`useCallback`, no global state management besides auth.
- **API fetch**: Use `useFocusEffect` with `useCallback` for loading on screen focus.
- **Pull-to-refresh**: Wrap screen content in `RefreshableScrollView` with `onRefresh`/`refreshing`.
- **Keyboard**: Wrap form screens in `KeyboardAvoidingView`.
- **Error handling**: API calls wrapped in `try/catch`, errors show `Alert.alert()`.
- **Avoid comments**, silence errors with empty catch blocks (`catch {}`).
- **SafeAreaView** as root container for every screen.

## Auth flow

`welcome` -> `login` / `signup` -> `otp` -> `createPin` -> `(tabs)/` (authenticated)

Auth guard in `(tabs)/_layout.tsx` redirects to `/welcome` if not logged in.

```typescript
import { useAuth } from '@/contexts/AuthContext';
const { user, isLoading, signIn, signOut, refreshUser } = useAuth();
```

## api.ts usage

Base URL: `https://wanpay-backend.onrender.com/api/v1`
Fallback env var: `EXPO_PUBLIC_API_URL`

```typescript
import { api } from '@/lib/api';

api.get<T>('/path')
api.post<T>('/path', body)
api.put<T>('/path', body)
api.delete<T>('/path')
api.get<T>(path, authenticated) // pass false to skip auth header
```

Responses from the backend are expected to be: `{ success: boolean, data?: T, error?: {code, message, field}, pagination? }`

Important key names for SecureStore:
- `wanpay_access_token`, `wanpay_refresh_token`, `wanpay_user` (via api.ts)
- `wanpay_device_id` (auto-generated UUID)

## Component conventions

- Use `type` not `interface` for Props in new components.
- create components as `export default function Component({ ... }: Props)`
- use `TouchableOpacity` with `activeOpacity` for buttons actions
- use `StyleSheet` only for static styles; use `tw` for dynamic/color styles
- maintain the dark theme by using `bg-white/<opacity>` for cards/modals on dark background.

## TypeScript types

All types defined in `lib/types.ts`. Key types:

- `User`, `Wallet`, `Transaction`, `Bank`, `AccountValidation`
- `Card`, `TransactionLimit`, `LimitIncreaseRequest`
- `BillProvider`, `BillPlan`, `BillUnlock`
- `SupportTicket`, `Faq`, `Grant`, `GrantCategory`
- `UserLimits`, `NotificationSetting`, `AuthTokens`

## Status of this guide

This file is meant as a living document. Update it when adding:
- new project dependencies
- architectural patterns
- new route groups
- important decisions that affect onboarding
