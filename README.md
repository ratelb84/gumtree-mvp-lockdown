# Gumtree MVP Lockdown Board

Real-time collaborative sticky board for MVP decision-making meetings.

## Features

- **3-Person Roles**: Product, Engineering, Business
- **2 Stages**: Prep (before meeting) + Locked (during meeting)
- **Real-time Sync**: See updates from other participants instantly
- **Color-coded**: Each person's items are color-coded for clarity
- **localStorage**: Data persists across page refreshes
- **Simple**: No login required, just pick your role

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

## Usage

1. Open the board
2. Select your role (Product/Engineering/Business)
3. **Before the meeting**: Add prep items
4. **Start meeting**: Click "🚀 Start Meeting" to lock in
5. **During meeting**: Debate and add/remove final items
6. **Outcome**: Whatever remains = your final MVP

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- localStorage for persistence
