const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hqfszlxdkvwlvpwqqmbd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnN6bHhka3Z3bHZwd3FxbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTExODgsImV4cCI6MjA4ODEyNzE4OH0.4OlPny5uJFTslf6iWfF7fAaVl0x2I_VG63QPa1Amq8Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// All 80 features directly here
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
    // MAKE AN OFFER
    { id: 'mvp-29', title: '"Make an Offer" Feature', description: 'Buyers can negotiate price, sellers counter-offer, drives engagement', category: 'other', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    // CORE INFRASTRUCTURE
    { id: 'mvp-30', title: 'Mobile-First Design', description: 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-31', title: 'Tech Stack Setup', description: 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-32', title: 'Database Schema', description: 'Users, listings, orders, wallets, messages, disputes, ratings', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-33', title: 'Image Pipeline', description: 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
    { id: 'mvp-34', title: 'Admin Dashboard (Basic)', description: 'User management, dispute resolution, fee configuration', category: 'infrastructure', person: 'don', column_name: 'mvp', timestamp: Date.now() - 3600000 },
];

async function seed() {
  console.log('🌱 Seeding features...');
  
  // Insert in batches
  for (let i = 0; i < DEFAULT_FEATURES.length; i += 10) {
    const batch = DEFAULT_FEATURES.slice(i, i + 10);
    const { error } = await supabase
      .from('features')
      .insert(batch);
    
    if (error) {
      console.error(`❌ Error inserting batch ${i/10 + 1}:`, error);
      return;
    }
    console.log(`✓ Inserted batch ${i/10 + 1} (${batch.length} features)`);
  }
  
  const { count } = await supabase
    .from('features')
    .select('*', { count: 'exact' });
  
  console.log(`✅ Done! ${count} features in database`);
}

seed().catch(err => {
  console.error('Error:', err.message);
});
