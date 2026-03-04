'use client'

import { useState, useEffect } from 'react'

const FEATURES = [
  { id: 'mvp-1', title: 'Post Listing with Photos', description: 'Title, description, price, category, location, up to 6 photos, condition selector', column_name: 'mvp' },
  { id: 'mvp-2', title: 'Edit/Delete/Pause Listings', description: 'Owner can modify or remove listings anytime', column_name: 'mvp' },
  { id: 'mvp-3', title: 'Browse Listings Grid', description: 'Category browsing, pagination, responsive layout, grid view', column_name: 'mvp' },
  { id: 'mvp-4', title: 'Listing Detail Page', description: 'Gallery, seller info, delivery options, Buy Now button, ratings', column_name: 'mvp' },
  { id: 'mvp-5', title: 'Top 10 Categories', description: 'Cars, Property, Jobs, Electronics, Home, Services, Furniture, Fashion, Pets, Sports', column_name: 'mvp' },
  { id: 'mvp-6', title: 'Full-Text Search', description: 'Search across title + description, instant results', column_name: 'mvp' },
  { id: 'mvp-7', title: 'Advanced Filters', description: 'Category, location (province/city), price range, condition', column_name: 'mvp' },
  { id: 'mvp-8', title: 'Sort & Browse', description: 'Sort by newest, price (asc/desc), relevance', column_name: 'mvp' },
  { id: 'mvp-9', title: 'Favourites & Saved Items', description: 'Heart icon, saved items page, wishlist notifications', column_name: 'mvp' },
  { id: 'mvp-10', title: 'User Registration & Auth', description: 'Email signup, login, password reset, remember me', column_name: 'mvp' },
  { id: 'mvp-11', title: 'Seller Profile Management', description: 'Profile creation, business info, bank details for payouts, verification', column_name: 'mvp' },
  { id: 'mvp-12', title: 'Buyer Account Dashboard', description: 'Order history, saved items, active purchases, account settings', column_name: 'mvp' },
  { id: 'mvp-13', title: 'Seller Ratings & Reviews', description: 'Star ratings, review text, transaction history visibility', column_name: 'mvp' },
  { id: 'mvp-14', title: 'Buy Now Checkout', description: 'One-click purchase, delivery selection, payment gateway', column_name: 'mvp' },
  { id: 'mvp-15', title: 'Payment Integration', description: 'Payfast/Peach integration, card payments in ZAR, split payments API', column_name: 'mvp' },
  { id: 'mvp-16', title: 'Escrow System', description: 'Secure payment hold until buyer confirms receipt, auto-release timer (7 days)', column_name: 'mvp' },
  { id: 'mvp-17', title: 'Courier Integration', description: 'Pargo, Paxi, The Courier Guy - automated label generation', column_name: 'mvp' },
  { id: 'mvp-18', title: 'Delivery Cost Calculator', description: 'Auto-calculate based on weight/size and destination, display at checkout', column_name: 'mvp' },
  { id: 'mvp-19', title: 'Order Tracking', description: 'Track status: Paid → Shipped → Delivered → Complete, courier links', column_name: 'mvp' },
  { id: 'mvp-20', title: 'Local Pickup Option', description: 'Allow face-to-face meetups, in-person payment, address sharing', column_name: 'mvp' },
  { id: 'mvp-21', title: 'Buyer-Seller Messaging', description: 'In-app chat for pre-purchase questions, real-time notifications', column_name: 'mvp' },
  { id: 'mvp-22', title: 'Message Notifications', description: 'Push/email notifications for new messages, badge counters', column_name: 'mvp' },
  { id: 'mvp-23', title: 'Seller Wallet', description: 'Track earnings from completed sales, balance display, transaction history', column_name: 'mvp' },
  { id: 'mvp-24', title: 'EFT Payouts', description: 'Request payout to linked bank account, settlement within 3-5 business days', column_name: 'mvp' },
  { id: 'mvp-25', title: 'Platform Fee Structure', description: 'Zero seller fees, 3-5% buyer protection fee, optional boost/promotion fees', column_name: 'mvp' },
  { id: 'mvp-26', title: 'Buyer Protection Policy', description: 'All purchases covered - item not as described = refund', column_name: 'mvp' },
  { id: 'mvp-27', title: 'Dispute Resolution', description: 'Buyer raises issue → admin reviews → refund or release funds', column_name: 'mvp' },
  { id: 'mvp-28', title: '"Item Received" Confirmation', description: 'Buyer confirms delivery, triggers seller payout, auto-release timer', column_name: 'mvp' },
  { id: 'mvp-29', title: '"Make an Offer" Feature', description: 'Buyers can negotiate price, sellers counter-offer, drives engagement', column_name: 'mvp' },
  { id: 'mvp-30', title: 'Mobile-First Design', description: 'Responsive layout, optimized for mobile (~70% traffic), touch-friendly', column_name: 'mvp' },
  { id: 'mvp-31', title: 'Tech Stack Setup', description: 'Next.js 15, PostgreSQL, Prisma, Vercel deployment, CI/CD', column_name: 'mvp' },
  { id: 'mvp-32', title: 'Database Schema', description: 'Users, listings, orders, wallets, messages, disputes, ratings', column_name: 'mvp' },
  { id: 'mvp-33', title: 'Image Pipeline', description: 'S3/R2 upload, auto-resize, WebP conversion, CDN delivery', column_name: 'mvp' },
  { id: 'mvp-34', title: 'Admin Dashboard (Basic)', description: 'User management, dispute resolution, fee configuration', column_name: 'mvp' },
]

export default function MVP() {
  const [features, setFeatures] = useState(FEATURES)

  const deleteFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-white">🌳 Gumtree MVP Board</h1>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-4 gap-4">
          {['mvp', 'v1.1', 'v2', 'backburner'].map(col => (
            <div key={col} className="bg-slate-800 rounded-lg p-4">
              <h2 className="font-bold text-white mb-4 text-lg">{col}</h2>
              <div className="space-y-2">
                {features.filter(f => f.column_name === col).map(f => (
                  <div key={f.id} className="bg-slate-700 p-3 rounded text-white text-sm">
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-xs opacity-75 mt-1">{f.description}</p>
                    <button
                      onClick={() => deleteFeature(f.id)}
                      className="mt-2 text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
