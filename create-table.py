#!/usr/bin/env python3
"""
Autonomous database setup for Gumtree MVP Lockdown
Runs directly on the VPS or any machine with Python 3.8+
"""

import psycopg2
import sys

# Supabase PostgreSQL credentials
DB_HOST = "db.hqfszlxdkvwlvpwqqmbd.supabase.co"
DB_PORT = 5432
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "QWA@.Fa2%eh8Kb-"

# SQL to create the features table
CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS public.features (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  person TEXT NOT NULL,
  column_name TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS features_person_idx ON public.features(person);
CREATE INDEX IF NOT EXISTS features_column_idx ON public.features(column_name);
CREATE INDEX IF NOT EXISTS features_category_idx ON public.features(category);
"""

# 34 MVP features
MVP_FEATURES = [
    ('mvp-1', 'Post Listing with Photos', 'Title, description, price, category, location, up to 6 photos, condition selector', 'listings', 'don', 'mvp'),
    ('mvp-2', 'Edit/Delete/Pause Listings', 'Owner can modify or remove listings anytime', 'listings', 'don', 'mvp'),
    ('mvp-3', 'Browse Listings Grid', 'Category browsing, pagination, responsive layout, grid view', 'listings', 'don', 'mvp'),
    ('mvp-4', 'Listing Detail Page', 'Gallery, seller info, delivery options, Buy Now button, ratings', 'listings', 'don', 'mvp'),
    ('mvp-5', 'Top 10 Categories', 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', 'listings', 'don', 'mvp'),
    ('mvp-6', 'Full-Text Search', 'Search across title + description, instant results', 'search', 'don', 'mvp'),
    ('mvp-7', 'Advanced Filters', 'Category, location (province/city), price range, condition', 'search', 'don', 'mvp'),
    ('mvp-8', 'Sort & Browse', 'Sort by newest, price (asc/desc), relevance', 'search', 'don', 'mvp'),
    ('mvp-9', 'Favourites & Saved Items', 'Heart icon, saved items page, wishlist notifications', 'search', 'don', 'mvp'),
    ('mvp-10', 'User Registration & Auth', 'Email signup, login, password reset, remember me', 'auth', 'don', 'mvp'),
    ('mvp-11', 'Seller Profile Management', 'Profile creation, business info, bank details for payouts, verification', 'auth', 'don', 'mvp'),
    ('mvp-12', 'Buyer Account Dashboard', 'Order history, saved items, active purchases, account settings', 'auth', 'don', 'mvp'),
    ('mvp-13', 'Seller Ratings & Reviews', 'Star ratings, review text, transaction history visibility', 'auth', 'don', 'mvp'),
    ('mvp-14', 'Buy Now Checkout', 'One-click purchase, delivery selection, payment gateway', 'checkout', 'don', 'mvp'),
    ('mvp-15', 'Payment Integration', 'Payfast/Peach integration, card payments in ZAR, split payments API', 'checkout', 'don', 'mvp'),
    ('mvp-16', 'Escrow System', 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', 'checkout', 'don', 'mvp'),
    ('mvp-17', 'Courier Integration', 'Pargo, Paxi, The Courier Guy - automated label generation', 'delivery', 'don', 'mvp'),
    ('mvp-18', 'Delivery Cost Calculator', 'Auto-calculate based on weight/size and destination, display at checkout', 'delivery', 'don', 'mvp'),
    ('mvp-19', 'Order Tracking', 'Track status: Paid → Shipped → Delivered → Complete, courier links', 'delivery', 'don', 'mvp'),
    ('mvp-20', 'Local Pickup Option', 'Allow face-to-face meetups, in-person payment, address sharing', 'delivery', 'don', 'mvp'),
    ('mvp-21', 'Buyer-Seller Messaging', 'In-app chat for pre-purchase questions, real-time notifications', 'messaging', 'don', 'mvp'),
    ('mvp-22', 'Message Notifications', 'Push/email notifications for new messages, badge counters', 'messaging', 'don', 'mvp'),
    ('mvp-23', 'Seller Wallet', 'Track earnings from completed sales, balance display, transaction history', 'seller-tools', 'don', 'mvp'),
    ('mvp-24', 'EFT Payouts', 'Request payout to linked bank account, settlement within 3-5 business days', 'seller-tools', 'don', 'mvp'),
    ('mvp-25', 'Platform Fee Structure', 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', 'seller-tools', 'don', 'mvp'),
    ('mvp-26', 'Buyer Protection Policy', 'All purchases covered - item not as described = refund', 'buyer-protection', 'don', 'mvp'),
    ('mvp-27', 'Dispute Resolution', 'Buyer raises issue → admin reviews → refund or release funds', 'buyer-protection', 'don', 'mvp'),
    ('mvp-28', '"Item Received" Confirmation', 'Buyer confirms delivery, triggers seller payout, auto-release timer', 'buyer-protection', 'don', 'mvp'),
    ('mvp-29', '"Make an Offer" Feature', 'Buyers can negotiate price, sellers counter-offer, drives engagement', 'other', 'don', 'mvp'),
    ('mvp-30', 'Mobile-First Design', 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', 'infrastructure', 'don', 'mvp'),
    ('mvp-31', 'Tech Stack Setup', 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', 'infrastructure', 'don', 'mvp'),
    ('mvp-32', 'Database Schema', 'Users, listings, orders, wallets, messages, disputes, ratings', 'infrastructure', 'don', 'mvp'),
    ('mvp-33', 'Image Pipeline', 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', 'infrastructure', 'don', 'mvp'),
    ('mvp-34', 'Admin Dashboard (Basic)', 'User management, dispute resolution, fee configuration', 'infrastructure', 'don', 'mvp'),
]

def main():
    try:
        print("🌱 Connecting to Supabase PostgreSQL...")
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            sslmode="require"
        )
        print("✅ Connected!\n")
        
        cursor = conn.cursor()
        
        print("📋 Creating features table...")
        cursor.execute(CREATE_TABLE_SQL)
        conn.commit()
        print("✅ Table created!\n")
        
        print("📦 Inserting 34 MVP features...")
        insert_sql = """
            INSERT INTO public.features 
            (id, title, description, category, person, column_name, timestamp) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
        """
        
        import time
        timestamp = int(time.time() * 1000) - 3600000
        
        for feature in MVP_FEATURES:
            cursor.execute(insert_sql, (*feature, timestamp))
        
        conn.commit()
        print("✅ All 34 features inserted!\n")
        
        # Verify count
        cursor.execute("SELECT COUNT(*) FROM public.features")
        count = cursor.fetchone()[0]
        print(f"📊 Total features in database: {count}")
        print("🎉 Done! MVP board is fully seeded.")
        
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
