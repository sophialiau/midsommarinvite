# Midsommar Dinner Party Invitation

A beautiful and functional web application for managing a Midsommar dinner party, featuring RSVP tracking, date voting, and potluck signup functionality.

## Features

- Responsive design for both mobile and desktop
- RSVP management system
- Date voting between June 20th and 21st
- Potluck-style alcohol and flower signup
- User authentication for secure access

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth.js

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL="your_postgresql_database_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Initialize the database:
   ```bash
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
