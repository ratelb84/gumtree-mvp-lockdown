#!/usr/bin/env node
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../prisma/dev.db');

console.log(`📦 Creating SQLite database at ${dbPath}...`);

const db = new Database(dbPath);

// Create table
console.log('📋 Creating features table...');
db.exec(`
  CREATE TABLE IF NOT EXISTS features (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    person TEXT NOT NULL,
    column_name TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE INDEX IF NOT EXISTS features_person_idx ON features(person);
  CREATE INDEX IF NOT EXISTS features_column_idx ON features(column_name);
  CREATE INDEX IF NOT EXISTS features_category_idx ON features(category);
`);

// Insert features
console.log('📦 Inserting 34 MVP features...');

const features = [
  ['mvp-1', 'Post Listing with Photos', 'Title, description, price, category, location, up to 6 photos, condition selector', 'listings', 'don', 'mvp'],
  ['mvp-2', 'Edit/Delete/Pause Listings', 'Owner can modify or remove listings anytime', 'listings', 'don', 'mvp'],
  ['mvp-3', 'Browse Listings Grid', 'Category browsing, pagination, responsive layout, grid view', 'listings', 'don', 'mvp'],
  ['mvp-4', 'Listing Detail Page', 'Gallery, seller info, delivery options, Buy Now button, ratings', 'listings', 'don', 'mvp'],
  ['mvp-5', 'Top 10 Categories', 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', 'listings', 'don', 'mvp'],
  ['mvp-6', 'Full-Text Search', 'Search across title + description, instant results', 'search', 'don', 'mvp'],
  ['mvp-7', 'Advanced Filters', 'Category, location (province/city), price range, condition', 'search', 'don', 'mvp'],
  ['mvp-8', 'Sort & Browse', 'Sort by newest, price (asc/desc), relevance', 'search', 'don', 'mvp'],
  ['mvp-9', 'Favourites & Saved Items', 'Heart icon, saved items page, wishlist notifications', 'search', 'don', 'mvp'],
  ['mvp-10', 'User Registration & Auth', 'Email signup, login, password reset, remember me', 'auth', 'don', 'mvp'],
  ['mvp-11', 'Seller Profile Management', 'Profile creation, business info, bank details for payouts, verification', 'auth', 'don', 'mvp'],
  ['mvp-12', 'Buyer Account Dashboard', 'Order history, saved items, active purchases, account settings', 'auth', 'don', 'mvp'],
  ['mvp-13', 'Seller Ratings & Reviews', 'Star ratings, review text, transaction history visibility', 'auth', 'don', 'mvp'],
  ['mvp-14', 'Buy Now Checkout', 'One-click purchase, delivery selection, payment gateway', 'checkout', 'don', 'mvp'],
  ['mvp-15', 'Payment Integration', 'Payfast/Peach integration, card payments in ZAR, split payments API', 'checkout', 'don', 'mvp'],
  ['mvp-16', 'Escrow System', 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', 'checkout', 'don', 'mvp'],
  ['mvp-17', 'Courier Integration', 'Pargo, Paxi, The Courier Guy - automated label generation', 'delivery', 'don', 'mvp'],
  ['mvp-18', 'Delivery Cost Calculator', 'Auto-calculate based on weight/size and destination, display at checkout', 'delivery', 'don', 'mvp'],
  ['mvp-19', 'Order Tracking', 'Track status: Paid → Shipped → Delivered → Complete, courier links', 'delivery', 'don', 'mvp'],
  ['mvp-20', 'Local Pickup Option', 'Allow face-to-face meetups, in-person payment, address sharing', 'delivery', 'don', 'mvp'],
  ['mvp-21', 'Buyer-Seller Messaging', 'In-app chat for pre-purchase questions, real-time notifications', 'messaging', 'don', 'mvp'],
  ['mvp-22', 'Message Notifications', 'Push/email notifications for new messages, badge counters', 'messaging', 'don', 'mvp'],
  ['mvp-23', 'Seller Wallet', 'Track earnings from completed sales, balance display, transaction history', 'seller-tools', 'don', 'mvp'],
  ['mvp-24', 'EFT Payouts', 'Request payout to linked bank account, settlement within 3-5 business days', 'seller-tools', 'don', 'mvp'],
  ['mvp-25', 'Platform Fee Structure', 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', 'seller-tools', 'don', 'mvp'],
  ['mvp-26', 'Buyer Protection Policy', 'All purchases covered - item not as described = refund', 'buyer-protection', 'don', 'mvp'],
  ['mvp-27', 'Dispute Resolution', 'Buyer raises issue → admin reviews → refund or release funds', 'buyer-protection', 'don', 'mvp'],
  ['mvp-28', '"Item Received" Confirmation', 'Buyer confirms delivery, triggers seller payout, auto-release timer', 'buyer-protection', 'don', 'mvp'],
  ['mvp-29', '"Make an Offer" Feature', 'Buyers can negotiate price, sellers counter-offer, drives engagement', 'other', 'don', 'mvp'],
  ['mvp-30', 'Mobile-First Design', 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', 'infrastructure', 'don', 'mvp'],
  ['mvp-31', 'Tech Stack Setup', 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', 'infrastructure', 'don', 'mvp'],
  ['mvp-32', 'Database Schema', 'Users, listings, orders, wallets, messages, disputes, ratings', 'infrastructure', 'don', 'mvp'],
  ['mvp-33', 'Image Pipeline', 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', 'infrastructure', 'don', 'mvp'],
  ['mvp-34', 'Admin Dashboard (Basic)', 'User management, dispute resolution, fee configuration', 'infrastructure', 'don', 'mvp'],
];

const timestamp = Date.now() - 3600000;
const stmt = db.prepare(
  'INSERT OR IGNORE INTO features (id, title, description, category, person, column_name, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)'
);

const insertMany = db.transaction((features) => {
  for (const feature of features) {
    stmt.run(...feature, timestamp);
  }
});

insertMany(features);

// Verify
const count = db.prepare('SELECT COUNT(*) as count FROM features').get();
console.log(`✅ Inserted ${count.count} features\n`);

console.log('📊 Database ready!');
db.close();
