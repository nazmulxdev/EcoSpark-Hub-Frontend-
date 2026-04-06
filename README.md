# 🌱 EcoSpark Hub

### Share & Discover Eco-Friendly Sustainability Ideas

**EcoSpark Hub** is a comprehensive sustainability community platform designed to empower individuals and organizations to share, vote on, and implement eco-friendly ideas. This repository contains the **Frontend Client**, a high-performance web application built with modern technologies to provide a seamless user experience.

## 👨‍💻 Author

**Md. Nazmul Hossen**

## 🚀 Quick Links

[![Live Frontend](https://img.shields.io/badge/Live_Frontend-SkillBridge-blue?style=for-the-badge&logo=vercel)](https://ecospark-hub.vercel.app/)

[![Live Backend API](https://img.shields.io/badge/Live_API-SkillBridge_Server-blueviolet?style=for-the-badge&logo=vercel)](https://ecosoark-hub.vercel.app/)

[![Frontend Repo](https://img.shields.io/badge/Frontend_Repo-GitHub-000?style=for-the-badge&logo=github)](https://github.com/nazmulxdev/EcoSpark-Hub-Frontend-)

[![Backend Repo](https://img.shields.io/badge/Backend_Repo-GitHub-333?style=for-the-badge&logo=github)](https://github.com/nazmulxdev/EcoSpark-Hub)

---

## 📌 Project Overview

EcoSpark Hub bridges the gap between sustainability enthusiasts and actionable ideas. 

- **👥 Members:** Share ideas, participate in discussions through comments, vote on impactful solutions, and access premium shared content.
- **👑 Admins:** Moderate the platform, manage categories, review idea submissions, and oversee blog content.
- **💰 Monetization:** Integrated payment gateways via Stripe for premium memberships and exclusive content access.

---

## 🛠️ Technology Stack

### Frontend Core

- **Framework:** Next.js 15+ (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & CSS Modules
- **UI Components:** ShadCN UI & Lucide React
- **Animations:** Framer Motion

### State & Logic

- **Authentication:** Better Auth (Role-based: USER, MEMBER, ADMIN)
- **Validation:** Zod
- **Toasts:** Sonner
- **Date Handling:** date-fns

---

## 📂 Project Structure

```text
src/
 ├── app/
 │   ├── (auth)/           # Login, Register, & Auth-related flows
 │   ├── (common)/         # Public Layouts (Navbar + Footer)
 │   └── (dashboard)/      # Protected Role-based Dashboards
 │       ├── admin/        # Admin Management Views
 │       └── member/       # Member Activity & Creations
 ├── components/
 │   ├── ui/               # Base ShadCN UI library
 │   ├── modules/          # Feature-level components (Logic + View)
 │   └── home/             # Specialized Landing Page sections
 ├── actions/              # Server Actions for Data Mutation
 ├── services/             # API communication layer
 ├── types/                # Shared TypeScript Interfaces
 ├── lib/                  # Initialization (Auth Client, Utils)
 └── config/               # Project-wide constants & branding
```

---

## 🔐 Role-Based Access Control (RBAC)

The platform utilizes **Better Auth** for secure session management with three distinct tiers:

1. **USER:** Basic access to browse public ideas and blogs.
2. **MEMBER:** Can create ideas, buy premium content, and access the member dashboard.
3. **ADMIN:** Full administrative control over categories, moderation, and users.

---

## 🎨 Key Features

### 💎 User Experience

- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop.
- **Dark/Light Mode:** Seamless theme switching via `next-themes`.
- **Micro-animations:** Interactive UI elements powered by Framer Motion.
- **Skeleton Loading:** Smooth data fetching states for professional feel.

### 💳 Payment & Membership

- **Stripe Integration:** Secure checkout for premium ideas and membership upgrades.
- **Flexible Options:** Support for "Pay Now" or "Pay Later" workflows.
- **Instant Access:** Automatic content unlocking post-payment.

---

## 🌍 Environment Variables

Create a `.env.local` file in your root directory and configure the following:

```env
# Client URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server / API URLs
API_URL=http://localhost:5000/api/v1
AUTH_URL=http://localhost:5000/api/auth

# Membership Configuration
MEMBERSHIP_PRICE=20
```

---

## 📡 Frontend Routes

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Homepage (Hero, Featured Ideas, Impact) |
| `/ideas` | Public | Browse all approved sustainability ideas |
| `/blog` | Public | Sustainability articles and updates |
| `/dashboard/admin` | Admin | Overview & Platform Analytics |
| `/member/dashboard` | Member | Personal Dashboard & Idea Management |

---

## ⚙️ Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nazmulxdev/EcoSpark-Hub-Frontend-
   cd ecospark-hub-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Running Locally**

   ```bash
   npm run dev

   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🌿 Backend Overview (System Architecture)

The frontend communicates with a robust REST API:

- **Stack:** Node.js, Express, PostgreSQL, Prisma ORM.
- **Core Modules:** Idea Management, Nested Comments, Voting System, Watchlist, Stripe Webhooks.
- **Database:** PostgreSQL with scalable schema for relations (Users → Ideas → Votes).

> **Note:** Ensure the [Backend Server](https://github.com/nazmulxdev/EcoSpark-Hub-Backend) is running at `http://localhost:5000` for the frontend to function correctly.
**Made with ❤️ for a sustainable future 🌱**
