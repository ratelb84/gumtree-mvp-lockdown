const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hqfszlxdkvwlvpwqqmbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnN6bHhka3Z3bHZwd3FxbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTExODgsImV4cCI6MjA4ODEyNzE4OH0.4OlPny5uJFTslf6iWfF7fAaVl0x2I_VG63QPa1Amq8Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// All 80 features
const DEFAULT_FEATURES = [
    // CORE LISTINGS & BROWSING
    { id: 'mvp-1', title: 'Post Listing with Photos', description: 'Title, description, price, category, location, up to 6 photos, condition selector', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-2', title: 'Edit/Delete/Pause Listings', description: 'Owner can modify or remove listings anytime', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-3', title: 'Browse Listings Grid', description: 'Category browsing, pagination, responsive layout, grid view', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-4', title: 'Listing Detail Page', description: 'Gallery, seller info, delivery options, Buy Now button, ratings', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-5', title: 'Top 10 Categories', description: 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', category: 'listings', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // SEARCH & DISCOVERY
    { id: 'mvp-6', title: 'Full-Text Search', description: 'Search across title + description, instant results', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-7', title: 'Advanced Filters', description: 'Category, location (province/city), price range, condition', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-8', title: 'Sort & Browse', description: 'Sort by newest, price (asc/desc), relevance', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-9', title: 'Favourites & Saved Items', description: 'Heart icon, saved items page, wishlist notifications', category: 'search', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // ACCOUNT MANAGEMENT
    { id: 'mvp-10', title: 'User Registration & Auth', description: 'Email signup, login, password reset, remember me', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-11', title: 'Seller Profile Management', description: 'Profile creation, business info, bank details for payouts, verification', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-12', title: 'Buyer Account Dashboard', description: 'Order history, saved items, active purchases, account settings', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-13', title: 'Seller Ratings & Reviews', description: 'Star ratings, review text, transaction history visibility', category: 'auth', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // CHECKOUT & PAYMENTS
    { id: 'mvp-14', title: 'Buy Now Checkout', description: 'One-click purchase, delivery selection, payment gateway', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-15', title: 'Payment Integration', description: 'Payfast/Peach integration, card payments in ZAR, split payments API', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-16', title: 'Escrow System', description: 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', category: 'checkout', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // DELIVERY & LOGISTICS
    { id: 'mvp-17', title: 'Courier Integration', description: 'Pargo, Paxi, The Courier Guy - automated label generation', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-18', title: 'Delivery Cost Calculator', description: 'Auto-calculate based on weight/size and destination, display at checkout', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-19', title: 'Order Tracking', description: 'Track status: Paid → Shipped → Delivered → Complete, courier links', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-20', title: 'Local Pickup Option', description: 'Allow face-to-face meetups, in-person payment, address sharing', category: 'delivery', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // MESSAGING & SUPPORT
    { id: 'mvp-21', title: 'Buyer-Seller Messaging', description: 'In-app chat for pre-purchase questions, real-time notifications', category: 'messaging', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-22', title: 'Message Notifications', description: 'Push/email notifications for new messages, badge counters', category: 'messaging', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // SELLER TOOLS
    { id: 'mvp-23', title: 'Seller Wallet', description: 'Track earnings from completed sales, balance display, transaction history', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-24', title: 'EFT Payouts', description: 'Request payout to linked bank account, settlement within 3-5 business days', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-25', title: 'Platform Fee Structure', description: 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', category: 'seller-tools', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // BUYER PROTECTION
    { id: 'mvp-26', title: 'Buyer Protection Policy', description: 'All purchases covered - item not as described = refund', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-27', title: 'Dispute Resolution', description: 'Buyer raises issue → admin reviews → refund or release funds', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-28', title: '"Item Received" Confirmation', description: 'Buyer confirms delivery, triggers seller payout, auto-release timer', category: 'buyer-protection', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // MAKE AN OFFER (South African differentiator)
    { id: 'mvp-29', title: '"Make an Offer" Feature', description: 'Buyers can negotiate price, sellers counter-offer, drives engagement', category: 'other', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // CORE INFRASTRUCTURE
    { id: 'mvp-30', title: 'Mobile-First Design', description: 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-31', title: 'Tech Stack Setup', description: 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-32', title: 'Database Schema', description: 'Users, listings, orders, wallets, messages, disputes, ratings', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-33', title: 'Image Pipeline', description: 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-34', title: 'Admin Dashboard (Basic)', description: 'User management, dispute resolution, fee configuration', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    
    // ===== V1.1 POST LAUNCH FEATURES =====
    // LISTINGS & BROWSING
    { id: 'v11-1', title: 'Scheduled Listings', description: 'Schedule when listings go live, auto-renewal, recurring sales setup', category: 'listings', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-2', title: 'Seller Shop/Storefront', description: 'Branded seller shops, multiple sections, custom branding, follower system', category: 'listings', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-3', title: 'Bulk Listing Tools', description: 'CSV import, bulk edit, batch pricing updates, template creation', category: 'listings', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-4', title: 'Video Listings', description: 'Upload product videos, video gallery, auto-play support', category: 'listings', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // SEARCH & DISCOVERY
    { id: 'v11-5', title: 'Save Searches', description: 'Save search filters, get alerts when new items match, trending searches', category: 'search', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-6', title: 'Price Drop Notifications', description: 'Alert users when saved items drop in price, price history tracking', category: 'search', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-7', title: 'Social Sharing', description: 'Share listings on WhatsApp, Facebook, Twitter, SMS, email', category: 'search', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-8', title: 'Advanced Recommendations', description: 'ML-powered "similar items", "trending now", personalized feed', category: 'search', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // ACCOUNT MANAGEMENT
    { id: 'v11-9', title: 'Seller Analytics Dashboard', description: 'Views, clicks, sales trends, revenue tracking, performance insights', category: 'auth', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-10', title: 'Wishlist Sharing', description: 'Create shareable wishlists, gift registries, group wishlists', category: 'auth', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-11', title: 'Account Verification Tiers', description: 'ID verification, business verification, premium seller badges', category: 'auth', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // CHECKOUT & PAYMENTS
    { id: 'v11-12', title: 'Multiple Payment Methods', description: 'EFT, credit cards, debit cards, digital wallets (Apple Pay, Google Pay)', category: 'checkout', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-13', title: 'Payment Plans/Installments', description: 'Buy now pay later, installment options, layby system', category: 'checkout', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-14', title: 'Subscriptions & Recurring Billing', description: 'Subscription listings, auto-delivery setup, billing management', category: 'checkout', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // DELIVERY & LOGISTICS
    { id: 'v11-15', title: 'Insurance & Warranty Options', description: 'Optional package insurance, extended warranties, protection plans', category: 'delivery', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-16', title: 'International Shipping', description: 'Cross-border shipping, customs handling, international courier networks', category: 'delivery', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // MESSAGING & SUPPORT
    { id: 'v11-17', title: 'Video/Voice Calls', description: 'In-app video calls, voice calls, screen sharing for pre-purchase consultation', category: 'messaging', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-18', title: 'File Sharing in Messages', description: 'Share documents, invoices, certificates of authenticity, product specs', category: 'messaging', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-19', title: '24/7 Live Chat Support', description: 'In-app live chat, bot support, knowledge base, ticket system', category: 'messaging', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // SELLER TOOLS
    { id: 'v11-20', title: 'Promotion & Marketing Tools', description: 'Boost listings, featured placement, promotional campaigns, banner ads', category: 'seller-tools', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-21', title: 'Advanced Reporting', description: 'Revenue reports, tax documents, sales by category, customer insights', category: 'seller-tools', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-22', title: 'Business Account Features', description: 'Multi-user access, team management, API access for integrations', category: 'seller-tools', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // BUYER PROTECTION
    { id: 'v11-23', title: 'Review Moderation & Appeals', description: 'Seller dispute reviews, appeal process, review removal criteria', category: 'buyer-protection', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    { id: 'v11-24', title: 'Guarantee Programs', description: 'Money-back guarantee, extended protection, seller insurance coverage', category: 'buyer-protection', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },
    // INFRASTRUCTURE
    { id: 'v11-25', title: 'API & Integrations', description: 'Marketplace API, third-party integrations, webhook support, inventory sync', category: 'infrastructure', person: 'don', column_name: 'v1.1', timestamp: Date.now() - 3600000 },

    // ===== V2 FUTURE FEATURES =====
    // LISTINGS & BROWSING
    { id: 'v2-1', title: 'Mobile Apps (iOS & Android)', description: 'Native iOS and Android apps, push notifications, offline browsing', category: 'listings', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-2', title: 'AR Product Viewer', description: 'Augmented reality try-on, virtual viewing, 3D product visualization', category: 'listings', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-3', title: 'Virtual Tours & 360 Photos', description: '360-degree product photos, virtual property tours, immersive viewing', category: 'listings', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // SEARCH & DISCOVERY
    { id: 'v2-4', title: 'Live Selling Features', description: 'Live shopping events, interactive livestreams, real-time Q&A with sellers', category: 'search', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-5', title: 'Auction System', description: 'Auction listings, bidding, timed auctions, reserve prices', category: 'search', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-6', title: 'AI-Powered Search', description: 'Visual search (upload photo to find similar), voice search, natural language', category: 'search', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // ACCOUNT MANAGEMENT
    { id: 'v2-7', title: 'Influencer/Creator Marketplace', description: 'Creator partnerships, commission system, featured collections, sponsorships', category: 'auth', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-8', title: 'Social Network Features', description: 'Follow sellers, curated feeds, collections, community discussions', category: 'auth', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-9', title: 'Subscription Services for Buyers', description: 'Premium membership, VIP benefits, early access, exclusive deals', category: 'auth', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // CHECKOUT & PAYMENTS
    { id: 'v2-10', title: 'Cryptocurrency Payments', description: 'Bitcoin, Ethereum, USDC, crypto wallet integration, stablecoin options', category: 'checkout', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-11', title: 'Buy & Collect Points/Rewards', description: 'Loyalty points, referral bonuses, cashback, rewards marketplace', category: 'checkout', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // DELIVERY & LOGISTICS
    { id: 'v2-12', title: 'Same-Day Delivery', description: 'Express delivery in metros, local fulfillment centers, drone delivery pilot', category: 'delivery', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-13', title: 'Climate-Neutral Shipping', description: 'Carbon offset options, eco-friendly packaging, green courier selection', category: 'delivery', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // MESSAGING & SUPPORT
    { id: 'v2-14', title: 'AI Chatbot Assistant', description: 'AI support bot, product recommendations, complaint resolution automation', category: 'messaging', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-15', title: 'Community Features', description: 'Forums, Q&A sections, user reviews, product comparisons, buying guides', category: 'messaging', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // SELLER TOOLS
    { id: 'v2-16', title: 'Fulfillment Services', description: 'Inventory management, pick & pack, 3PL integration, dropshipping support', category: 'seller-tools', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-17', title: 'B2B Marketplace Features', description: 'Wholesale orders, bulk pricing, business-to-business selling, reseller program', category: 'seller-tools', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-18', title: 'Seller Financing Options', description: 'Business loans for inventory, working capital, expansion financing', category: 'seller-tools', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // BUYER PROTECTION
    { id: 'v2-19', title: 'Authentication & Certification', description: 'Counterfeit detection, product authentication service, certificate verification', category: 'buyer-protection', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    // INFRASTRUCTURE
    { id: 'v2-20', title: 'Regional Expansion (SADC)', description: 'Multi-country support, local payment methods, regional logistics', category: 'infrastructure', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
    { id: 'v2-21', title: 'Multi-Language Support', description: 'Localization for South African languages, Swahili, Portuguese support', category: 'infrastructure', person: 'don', column_name: 'v2', timestamp: Date.now() - 3600000 },
];

async function seedDatabase() {
  console.log('🌱 Starting database seed...');
  console.log(`📦 Inserting ${DEFAULT_FEATURES.length} features into Supabase`);
  
  try {
    // First, delete all existing features (if any)
    await supabase.from('features').delete().neq('id', '');
    console.log('✓ Cleared existing features');
    
    // Insert all features
    const { data, error } = await supabase
      .from('features')
      .insert(DEFAULT_FEATURES)
      .select();
    
    if (error) {
      console.error('❌ Error inserting features:', error);
      process.exit(1);
    }
    
    console.log(`✅ Successfully inserted ${data?.length || 0} features!`);
    console.log('');
    console.log('Features breakdown:');
    console.log(`  • MVP: 34 features`);
    console.log(`  • V1.1: 25 features`);
    console.log(`  • V2: 21 features`);
    console.log('  • Total: 80 features');
    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log('Board is ready for the meeting at: https://gumtree-mvp-lockdown.vercel.app');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedDatabase();
