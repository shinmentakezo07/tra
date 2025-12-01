# DRA - Interactive Coding Education Platform

DRA is a modern, full-stack educational platform built with Next.js 16 and React 19, designed to provide an immersive environment for learning software development. It features an in-browser IDE, interactive lessons, progress tracking, and a gamified learning experience.

## 🚀 Key Features

- **Interactive Coding Environment**: Built-in Monaco Editor and xterm.js terminal allow users to write and execute code directly in the browser.
- **Course Management**: Structured learning paths with courses, lessons, and quizzes.
- **User Dashboard**: Track learning progress, completed courses, and daily streaks.
- **Gamified Experience**: Earn XP, badges, and compete on leaderboards (Planned/In-Progress).
- **Modern UI/UX**: Responsive cyberpunk-inspired design using Tailwind CSS and Framer Motion animations.
- **Secure Authentication**: User accounts managed via NextAuth v5.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Terminal**: [xterm.js](https://xtermjs.org/)
- **Build System**: [Turborepo](https://turbo.build/)

## 📂 Project Structure

The project is organized as a monorepo. For a detailed file tree, please refer to [FILE_STRUCTURE.md](./FILE_STRUCTURE.md).

- `apps/web`: The main Next.js web application.
- `apps/web/app`: Application routes and logic.
- `apps/web/components`: Reusable UI components.
- `apps/web/db`: Database schema and configuration.

## ⚡ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shinmen007/DRA.git
   cd DRA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in `apps/web/` with the following variables:
   ```bash
   # Database
   DATABASE_URL="postgres://user:password@host/dbname?sslmode=require"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key" # Generate with: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   Push the schema to your Neon database:
   ```bash
   cd apps/web
   npm run db:push # or npx drizzle-kit push
   ```
   *(Note: Check `package.json` scripts for exact DB commands if different)*

5. **Run the Development Server**
   From the root directory:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 📜 Scripts

- `npm run dev`: Start the development server for all apps.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint.
- `npm run format`: Format code using Prettier.

