'use client'

import { useState, useEffect } from 'react'

type Person = 'pedro' | 'betine' | 'damian' | 'don'
type Column = 'mvp' | 'v1.1' | 'v2' | 'backburner'
type Stage = 'login' | 'board'
type Category = 'listings' | 'search' | 'auth' | 'checkout' | 'delivery' | 'messaging' | 'seller-tools' | 'buyer-protection' | 'infrastructure' | 'subscription' | 'advertising' | 'other'

interface Feature {
  id: string
  title: string
  description: string
  category: Category
  person: Person
  column: Column
  timestamp: number
}

interface User {
  name: string
  username: string
  password: string
}

const USERS: Record<Person, User> = {
  pedro: { name: 'Pedro', username: 'pedro', password: 'Pedro123!' },
  betine: { name: 'Betine', username: 'betine', password: 'Betine123!' },
  damian: { name: 'Damian', username: 'damian', password: 'Damian123!' },
  don: { name: 'Don', username: 'don', password: 'Don123!' },
}

const personColors: Record<Person, { bg: string; text: string; border: string; light: string }> = {
  pedro: { bg: 'bg-blue-600', text: 'text-blue-50', border: 'border-blue-400', light: 'bg-blue-500/10' },
  betine: { bg: 'bg-purple-600', text: 'text-purple-50', border: 'border-purple-400', light: 'bg-purple-500/10' },
  damian: { bg: 'bg-green-600', text: 'text-green-50', border: 'border-green-400', light: 'bg-green-500/10' },
  don: { bg: 'bg-orange-600', text: 'text-orange-50', border: 'border-orange-400', light: 'bg-orange-500/10' },
}

const columnLabels: Record<Column, string> = {
  mvp: '🔴 MVP',
  'v1.1': '🟡 V1.1 Post Launch',
  'v2': '🟢 V2 Future',
  'backburner': '⚫ Backburner',
}

const categoryLabels: Record<Category, string> = {
  listings: '📦 Listings & Browsing',
  search: '🔍 Search & Discovery',
  auth: '🔐 Account Management',
  checkout: '🛒 Checkout & Payments',
  delivery: '🚚 Delivery & Logistics',
  messaging: '💬 Messaging & Support',
  'seller-tools': '💰 Seller Tools',
  'buyer-protection': '🛡️ Buyer Protection',
  infrastructure: '🏗️ Infrastructure',
  subscription: '💳 Subscription Revenue',
  advertising: '📢 Advertising',
  other: '📌 Other',
}

const columnColors: Record<Column, string> = {
  mvp: 'border-red-500/30 bg-red-500/5',
  'v1.1': 'border-yellow-500/30 bg-yellow-500/5',
  'v2': 'border-green-500/30 bg-green-500/5',
  'backburner': 'border-gray-500/30 bg-gray-500/5',
}

// Default MVP features (Based on research & scope)
const DEFAULT_FEATURES: Feature[] = [
    // CORE LISTINGS & BROWSING
    { id: 'mvp-1', title: 'Post Listing with Photos', description: 'Title, description, price, category, location, up to 6 photos, condition selector', category: 'listings', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-2', title: 'Edit/Delete/Pause Listings', description: 'Owner can modify or remove listings anytime', category: 'listings', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-3', title: 'Browse Listings Grid', description: 'Category browsing, pagination, responsive layout, grid view', category: 'listings', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-4', title: 'Listing Detail Page', description: 'Gallery, seller info, delivery options, Buy Now button, ratings', category: 'listings', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-5', title: 'Top 10 Categories', description: 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', category: 'listings', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // SEARCH & DISCOVERY
    { id: 'mvp-6', title: 'Full-Text Search', description: 'Search across title + description, instant results', category: 'search', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-7', title: 'Advanced Filters', description: 'Category, location (province/city), price range, condition', category: 'search', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-8', title: 'Sort & Browse', description: 'Sort by newest, price (asc/desc), relevance', category: 'search', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-9', title: 'Favourites & Saved Items', description: 'Heart icon, saved items page, wishlist notifications', category: 'search', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // ACCOUNT MANAGEMENT
    { id: 'mvp-10', title: 'User Registration & Auth', description: 'Email signup, login, password reset, remember me', category: 'auth', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-11', title: 'Seller Profile Management', description: 'Profile creation, business info, bank details for payouts, verification', category: 'auth', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-12', title: 'Buyer Account Dashboard', description: 'Order history, saved items, active purchases, account settings', category: 'auth', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-13', title: 'Seller Ratings & Reviews', description: 'Star ratings, review text, transaction history visibility', category: 'auth', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // CHECKOUT & PAYMENTS
    { id: 'mvp-14', title: 'Buy Now Checkout', description: 'One-click purchase, delivery selection, payment gateway', category: 'checkout', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-15', title: 'Payment Integration', description: 'Payfast/Peach integration, card payments in ZAR, split payments API', category: 'checkout', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-16', title: 'Escrow System', description: 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', category: 'checkout', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // DELIVERY & LOGISTICS
    { id: 'mvp-17', title: 'Courier Integration', description: 'Pargo, Paxi, The Courier Guy - automated label generation', category: 'delivery', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-18', title: 'Delivery Cost Calculator', description: 'Auto-calculate based on weight/size and destination, display at checkout', category: 'delivery', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-19', title: 'Order Tracking', description: 'Track status: Paid → Shipped → Delivered → Complete, courier links', category: 'delivery', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-20', title: 'Local Pickup Option', description: 'Allow face-to-face meetups, in-person payment, address sharing', category: 'delivery', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // MESSAGING & SUPPORT
    { id: 'mvp-21', title: 'Buyer-Seller Messaging', description: 'In-app chat for pre-purchase questions, real-time notifications', category: 'messaging', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-22', title: 'Message Notifications', description: 'Push/email notifications for new messages, badge counters', category: 'messaging', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // SELLER TOOLS
    { id: 'mvp-23', title: 'Seller Wallet', description: 'Track earnings from completed sales, balance display, transaction history', category: 'seller-tools', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-24', title: 'EFT Payouts', description: 'Request payout to linked bank account, settlement within 3-5 business days', category: 'seller-tools', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-25', title: 'Platform Fee Structure', description: 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', category: 'seller-tools', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // BUYER PROTECTION
    { id: 'mvp-26', title: 'Buyer Protection Policy', description: 'All purchases covered - item not as described = refund', category: 'buyer-protection', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-27', title: 'Dispute Resolution', description: 'Buyer raises issue → admin reviews → refund or release funds', category: 'buyer-protection', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-28', title: '"Item Received" Confirmation', description: 'Buyer confirms delivery, triggers seller payout, auto-release timer', category: 'buyer-protection', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // MAKE AN OFFER (South African differentiator)
    { id: 'mvp-29', title: '"Make an Offer" Feature', description: 'Buyers can negotiate price, sellers counter-offer, drives engagement', category: 'other', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    // CORE INFRASTRUCTURE
    { id: 'mvp-30', title: 'Mobile-First Design', description: 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', category: 'infrastructure', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-31', title: 'Tech Stack Setup', description: 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', category: 'infrastructure', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-32', title: 'Database Schema', description: 'Users, listings, orders, wallets, messages, disputes, ratings', category: 'infrastructure', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-33', title: 'Image Pipeline', description: 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', category: 'infrastructure', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-34', title: 'Admin Dashboard (Basic)', description: 'User management, dispute resolution, fee configuration', category: 'infrastructure', person: 'don', column: 'mvp', timestamp: Date.now() - 3600000 },
    
    // ===== V1.1 POST LAUNCH FEATURES =====
    // LISTINGS & BROWSING
    { id: 'v11-1', title: 'Scheduled Listings', description: 'Schedule when listings go live, auto-renewal, recurring sales setup', category: 'listings', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-2', title: 'Seller Shop/Storefront', description: 'Branded seller shops, multiple sections, custom branding, follower system', category: 'listings', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-3', title: 'Bulk Listing Tools', description: 'CSV import, bulk edit, batch pricing updates, template creation', category: 'listings', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-4', title: 'Video Listings', description: 'Upload product videos, video gallery, auto-play support', category: 'listings', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // SEARCH & DISCOVERY
    { id: 'v11-5', title: 'Save Searches', description: 'Save search filters, get alerts when new items match, trending searches', category: 'search', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-6', title: 'Price Drop Notifications', description: 'Alert users when saved items drop in price, price history tracking', category: 'search', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-7', title: 'Social Sharing', description: 'Share listings on WhatsApp, Facebook, Twitter, SMS, email', category: 'search', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-8', title: 'Advanced Recommendations', description: 'ML-powered "similar items", "trending now", personalized feed', category: 'search', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // ACCOUNT MANAGEMENT
    { id: 'v11-9', title: 'Seller Analytics Dashboard', description: 'Views, clicks, sales trends, revenue tracking, performance insights', category: 'auth', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-10', title: 'Wishlist Sharing', description: 'Create shareable wishlists, gift registries, group wishlists', category: 'auth', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-11', title: 'Account Verification Tiers', description: 'ID verification, business verification, premium seller badges', category: 'auth', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // CHECKOUT & PAYMENTS
    { id: 'v11-12', title: 'Multiple Payment Methods', description: 'EFT, credit cards, debit cards, digital wallets (Apple Pay, Google Pay)', category: 'checkout', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-13', title: 'Payment Plans/Installments', description: 'Buy now pay later, installment options, layby system', category: 'checkout', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-14', title: 'Subscriptions & Recurring Billing', description: 'Subscription listings, auto-delivery setup, billing management', category: 'checkout', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // DELIVERY & LOGISTICS
    { id: 'v11-15', title: 'Insurance & Warranty Options', description: 'Optional package insurance, extended warranties, protection plans', category: 'delivery', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-16', title: 'International Shipping', description: 'Cross-border shipping, customs handling, international courier networks', category: 'delivery', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // MESSAGING & SUPPORT
    { id: 'v11-17', title: 'Video/Voice Calls', description: 'In-app video calls, voice calls, screen sharing for pre-purchase consultation', category: 'messaging', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-18', title: 'File Sharing in Messages', description: 'Share documents, invoices, certificates of authenticity, product specs', category: 'messaging', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-19', title: '24/7 Live Chat Support', description: 'In-app live chat, bot support, knowledge base, ticket system', category: 'messaging', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // SELLER TOOLS
    { id: 'v11-20', title: 'Promotion & Marketing Tools', description: 'Boost listings, featured placement, promotional campaigns, banner ads', category: 'seller-tools', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-21', title: 'Advanced Reporting', description: 'Revenue reports, tax documents, sales by category, customer insights', category: 'seller-tools', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-22', title: 'Business Account Features', description: 'Multi-user access, team management, API access for integrations', category: 'seller-tools', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // BUYER PROTECTION
    { id: 'v11-23', title: 'Review Moderation & Appeals', description: 'Seller dispute reviews, appeal process, review removal criteria', category: 'buyer-protection', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-24', title: 'Guarantee Programs', description: 'Money-back guarantee, extended protection, seller insurance coverage', category: 'buyer-protection', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },
    // INFRASTRUCTURE
    { id: 'v11-25', title: 'API & Integrations', description: 'Marketplace API, third-party integrations, webhook support, inventory sync', category: 'infrastructure', person: 'don', column: 'v1.1', timestamp: Date.now() - 3600000 },

    // ===== V2 FUTURE FEATURES =====
    // LISTINGS & BROWSING
    { id: 'v2-1', title: 'Mobile Apps (iOS & Android)', description: 'Native iOS and Android apps, push notifications, offline browsing', category: 'listings', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-2', title: 'AR Product Viewer', description: 'Augmented reality try-on, virtual viewing, 3D product visualization', category: 'listings', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-3', title: 'Virtual Tours & 360 Photos', description: '360-degree product photos, virtual property tours, immersive viewing', category: 'listings', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // SEARCH & DISCOVERY
    { id: 'v2-4', title: 'Live Selling Features', description: 'Live shopping events, interactive livestreams, real-time Q&A with sellers', category: 'search', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-5', title: 'Auction System', description: 'Auction listings, bidding, timed auctions, reserve prices', category: 'search', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-6', title: 'AI-Powered Search', description: 'Visual search (upload photo to find similar), voice search, natural language', category: 'search', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // ACCOUNT MANAGEMENT
    { id: 'v2-7', title: 'Influencer/Creator Marketplace', description: 'Creator partnerships, commission system, featured collections, sponsorships', category: 'auth', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-8', title: 'Social Network Features', description: 'Follow sellers, curated feeds, collections, community discussions', category: 'auth', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-9', title: 'Subscription Services for Buyers', description: 'Premium membership, VIP benefits, early access, exclusive deals', category: 'auth', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // CHECKOUT & PAYMENTS
    { id: 'v2-10', title: 'Cryptocurrency Payments', description: 'Bitcoin, Ethereum, USDC, crypto wallet integration, stablecoin options', category: 'checkout', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-11', title: 'Buy & Collect Points/Rewards', description: 'Loyalty points, referral bonuses, cashback, rewards marketplace', category: 'checkout', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // DELIVERY & LOGISTICS
    { id: 'v2-12', title: 'Same-Day Delivery', description: 'Express delivery in metros, local fulfillment centers, drone delivery pilot', category: 'delivery', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-13', title: 'Climate-Neutral Shipping', description: 'Carbon offset options, eco-friendly packaging, green courier selection', category: 'delivery', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // MESSAGING & SUPPORT
    { id: 'v2-14', title: 'AI Chatbot Assistant', description: 'AI support bot, product recommendations, complaint resolution automation', category: 'messaging', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-15', title: 'Community Features', description: 'Forums, Q&A sections, user reviews, product comparisons, buying guides', category: 'messaging', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // SELLER TOOLS
    { id: 'v2-16', title: 'Fulfillment Services', description: 'Inventory management, pick & pack, 3PL integration, dropshipping support', category: 'seller-tools', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-17', title: 'B2B Marketplace Features', description: 'Wholesale orders, bulk pricing, business-to-business selling, reseller program', category: 'seller-tools', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-18', title: 'Seller Financing Options', description: 'Business loans for inventory, working capital, expansion financing', category: 'seller-tools', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // BUYER PROTECTION
    { id: 'v2-19', title: 'Authentication & Certification', description: 'Counterfeit detection, product authentication service, certificate verification', category: 'buyer-protection', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    // INFRASTRUCTURE
    { id: 'v2-20', title: 'Regional Expansion (SADC)', description: 'Multi-country support, local payment methods, regional logistics', category: 'infrastructure', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-21', title: 'Multi-Language Support', description: 'Localization for South African languages, Swahili, Portuguese support', category: 'infrastructure', person: 'don', column: 'v2', timestamp: Date.now() - 3600000 },
]

export default function MVPLockdownPage() {
  const [stage, setStage] = useState<Stage>('login')
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const [features, setFeatures] = useState<Feature[]>(() => {
    // Always use DEFAULT_FEATURES on initial load
    // localStorage can have corrupted data, so we'll ignore it
    if (typeof window !== 'undefined') {
      // Clear any corrupted localStorage data
      localStorage.removeItem('gumtree_mvp_features')
    }
    return [...DEFAULT_FEATURES]
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [input, setInput] = useState('')
  const [selectedColumn, setSelectedColumn] = useState<Column>('mvp')
  const [selectedCategory, setSelectedCategory] = useState<Category>('listings')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')

  // Load saved credentials
  useEffect(() => {
    const savedCreds = localStorage.getItem('gumtree_mvp_creds')
    if (savedCreds) {
      try {
        const creds = JSON.parse(savedCreds)
        setUsername(creds.username)
        setPassword(creds.password)
        setRememberMe(true)
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Save to localStorage (only save if we have all features)
  useEffect(() => {
    // Only save if we have a significant number of features (prevent saving corrupted data)
    if (features && features.length >= 34) {
      localStorage.setItem('gumtree_mvp_features', JSON.stringify({ features }))
    }
  }, [features])

  const handleLogin = () => {
    setLoginError('')
    
    // Find matching user
    const user = Object.entries(USERS).find(
      ([_, u]) => u.username === username && u.password === password
    )
    
    if (!user) {
      setLoginError('Invalid username or password')
      return
    }
    
    // Save credentials if remember me is checked
    if (rememberMe) {
      localStorage.setItem('gumtree_mvp_creds', JSON.stringify({ username, password }))
    } else {
      localStorage.removeItem('gumtree_mvp_creds')
    }
    
    setCurrentPerson(user[0] as Person)
    setStage('board')
  }

  const handleAddFeature = () => {
    if (!input.trim() || !currentPerson) return
    const feature: Feature = {
      id: Math.random().toString(36).substr(2, 9),
      title: input.split('\n')[0],
      description: input.includes('\n') ? input.split('\n').slice(1).join('\n') : '',
      category: selectedCategory,
      person: currentPerson,
      column: selectedColumn,
      timestamp: Date.now(),
    }
    setFeatures([...features, feature])
    setInput('')
  }

  const handleMoveFeature = (id: string, newColumn: Column) => {
    setFeatures(features.map(f => f.id === id ? { ...f, column: newColumn } : f))
  }

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const handleStartEdit = (feature: Feature) => {
    setEditingId(feature.id)
    setEditTitle(feature.title)
    setEditDesc(feature.description)
  }

  const handleSaveEdit = (id: string) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, title: editTitle, description: editDesc } : f
    ))
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleLogout = () => {
    setCurrentPerson(null)
    setStage('login')
    // Keep username/password if remember me was checked
    if (!rememberMe) {
      setPassword('')
    }
    setLoginError('')
  }

  const getFeaturesInColumn = (column: Column) => {
    const result = features.filter(f => f.column === column)
    // Debug log
    if (typeof window !== 'undefined') {
      console.log(`Features in ${column}:`, result.length)
    }
    return result
  }

  const getPersonFeatures = (person: Person) => {
    return features.filter(f => f.person === person)
  }
  
  // Debug: Log total features
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Total features loaded:', features.length)
      console.log('First feature:', features[0])
    }
  }, [features])

  // ============ LOGIN SCREEN ============
  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
                <img src="/gumtree-logo.jpg" alt="Gumtree" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">GUMTREE</h1>
              <p className="text-lg font-semibold text-green-400 mb-3">MVP Board</p>
              <p className="text-gray-400 text-sm">Collaborative feature planning · 4 phases</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g., pedro"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/30 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300">
                  {loginError}
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============ KANBAN BOARD ============
  if (stage === 'board') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0">
                <img src="/gumtree-logo.jpg" alt="Gumtree" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GUMTREE MVP</h1>
                <p className="text-xs text-gray-500">MVP • V1.1 • V2 • Backburner • ({features.length} features)</p>
              </div>
            </div>
            <div className="flex gap-2 items-center ml-auto">
              <div className={`px-3 py-1.5 rounded text-sm font-semibold ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text}`}>
                {USERS[currentPerson!].name}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-full px-4 py-6">
          {/* Add Feature Input - Compact */}
          <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddFeature()}
                placeholder="Add new feature..."
                className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/30"
              />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as Category)}
                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                {(Object.keys(categoryLabels) as Category[]).map(cat => (
                  <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                ))}
              </select>
              <select
                value={selectedColumn}
                onChange={e => setSelectedColumn(e.target.value as Column)}
                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                {(Object.keys(columnLabels) as Column[]).map(col => (
                  <option key={col} value={col}>{columnLabels[col]}</option>
                ))}
              </select>
              <button
                onClick={handleAddFeature}
                className={`px-4 py-2 rounded font-semibold text-sm ${personColors[currentPerson!].bg} ${personColors[currentPerson!].text} hover:opacity-90 transition`}
              >
                Add
              </button>
            </div>
          </div>

          {/* Kanban Board - 4 Columns - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(columnLabels) as Column[]).map(column => (
              <div key={column} className={`border rounded-lg overflow-hidden flex flex-col ${columnColors[column]}`}>
                {/* Column Header - Compact */}
                <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex-shrink-0">
                  <h2 className="text-base font-bold text-white">{columnLabels[column]}</h2>
                  <p className="text-xs text-gray-400">{getFeaturesInColumn(column).length} items</p>
                </div>

                {/* Features - Scrollable, Grouped by Category */}
                <div className="flex-1 overflow-y-auto p-3 min-h-96">
                  {(Object.keys(categoryLabels) as Category[]).map(cat => {
                    const catFeatures = getFeaturesInColumn(column).filter(f => f.category === cat)
                    if (catFeatures.length === 0) return null
                    
                    return (
                      <div key={cat} className="mb-4">
                        {/* Category Header */}
                        <div className="text-xs font-bold text-gray-300 mb-2 px-1">{categoryLabels[cat]}</div>
                        
                        {/* Features in Category */}
                        <div className="space-y-2">
                          {catFeatures.map(feature => (
                            <div key={feature.id}>
                              {editingId === feature.id && currentPerson === feature.person ? (
                                // EDIT MODE
                                <div className={`${personColors[feature.person].light} border border-white/20 rounded p-2 space-y-1`}>
                                  <input
                                    type="text"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none"
                                  />
                                  <textarea
                                    value={editDesc}
                                    onChange={e => setEditDesc(e.target.value)}
                                    rows={2}
                                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none resize-none"
                                  />
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleSaveEdit(feature.id)}
                                      className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                // VIEW MODE
                                <div
                                  className={`${personColors[feature.person].light} border border-white/10 rounded p-2.5 group relative hover:border-white/20 transition text-xs`}
                                >
                                  {/* Person Badge */}
                                  <div className={`inline-block mb-1 px-1.5 py-0.5 rounded text-xs font-semibold ${personColors[feature.person].bg} ${personColors[feature.person].text}`}>
                                    {USERS[feature.person].name}
                                  </div>

                                  {/* Title */}
                                  <h3 className="text-white font-semibold text-xs leading-tight mb-1">{feature.title}</h3>

                                  {/* Description */}
                                  {feature.description && (
                                    <p className="text-gray-400 text-xs leading-tight mb-1 line-clamp-2">{feature.description}</p>
                                  )}

                                  {/* Time */}
                                  <div className="text-xs text-gray-500 mb-1">
                                    {new Date(feature.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>

                                  {/* Move Buttons */}
                                  <div className="flex gap-0.5 flex-wrap">
                                    {(Object.keys(columnLabels) as Column[]).map(col => 
                                      col !== column && (
                                        <button
                                          key={col}
                                          onClick={() => handleMoveFeature(feature.id, col)}
                                          title={columnLabels[col]}
                                          className="text-xs px-1.5 py-0.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition"
                                        >
                                          {columnLabels[col].split(' ')[0]}
                                        </button>
                                      )
                                    )}
                                  </div>

                                  {/* Edit & Delete Buttons */}
                                  {currentPerson === feature.person && (
                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition flex gap-1">
                                      <button
                                        onClick={() => handleStartEdit(feature)}
                                        className="bg-blue-500/80 hover:bg-blue-600 text-white rounded px-1 py-0.5 text-xs"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        onClick={() => handleRemoveFeature(feature.id)}
                                        className="bg-red-500/80 hover:bg-red-600 text-white rounded px-1 py-0.5 text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  {getFeaturesInColumn(column).length === 0 && (
                    <div className="text-gray-600 text-xs italic py-4 text-center">No items</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary by Person - Compact */}
          <div className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(USERS) as Person[]).map(person => (
                <div key={person} className={`${personColors[person].light} border ${personColors[person].border} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold ${personColors[person].text}`}>
                    {getPersonFeatures(person).length}
                  </div>
                  <div className="text-xs text-gray-300">{USERS[person].name}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
