# Mini LinkedIn-like Community Platform

A professional social networking platform built with modern web technologies, featuring user authentication, profile management, and real-time post sharing capabilities.

## 🚀 Live Demo

**Live URL**: [https://mini-linked-in-pied.vercel.app/](https://mini-linked-in-pied.vercel.app/)

**GitHub Repository**: [https://github.com/Surjendu-kar/Mini-LinkedIn](https://github.com/Surjendu-kar/Mini-LinkedIn)

## 🔐 Demo Credentials

**Email**: `surjo@gmail.com`  
**Password**: `12345678`

**Or create a new account**: Click the "Join now" button on the login page to navigate to the signup page and register a new account.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Database**: PostgreSQL
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## ✨ Features

### 🔑 Authentication System

- **User Registration**: Email & password with profile creation
- **User Login**: Secure authentication with session management
- **Profile Management**: Update name and bio with real-time validation
- **Toast Notifications**: Success/error feedback for all auth operations

### 📝 Post Management

- **Create Posts**: Rich text post creation from home feed and profile pages
- **View Posts**: Public feed displaying all posts with author information
- **Real-time Updates**: Live post updates using Supabase subscriptions
- **Author Bio Display**: Shows user bio below author name in posts

### 👤 Profile System

- **User Profiles**: Dedicated profile pages showing user info and posts
- **Profile Editing**: Modal-based editing with toast feedback
- **Post Creation**: Integrated "Create a post" button on profile pages
- **Activity Tracking**: Display user's post count and activity

### 🎨 User Experience

- **Responsive Design**: Fully responsive across all screen sizes and devices
- **LinkedIn-style UI**: Professional design matching LinkedIn aesthetics
- **Smooth Animations**: Animated navigation borders and transitions
- **Click-outside Modals**: Intuitive modal interactions
- **Loading States**: Professional loading animations and skeletons

### 🧭 Navigation

- **Professional Navbar**: LinkedIn-style navigation with search bar
- **Mobile Responsive**: Adaptive navigation for mobile devices
- **Profile Dropdown**: User menu with profile access and logout
- **Smooth Transitions**: Animated active states and hover effects

## 🏗️ Project Structure

```
mini-linkedin/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx          # Login page
│   │   └── signup/page.tsx         # Registration page
│   ├── profile/[userId]/page.tsx   # Dynamic profile pages
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home feed
├── components/
│   ├── Navbar.tsx                  # Navigation component
│   ├── LeftSidebar.tsx            # Profile sidebar
│   ├── CenterFeed.tsx             # Main content area
│   ├── RightSidebar.tsx           # News sidebar
│   ├── PostForm.tsx               # Post creation form
│   ├── PostModal.tsx              # Reusable post modal
│   ├── PostsFeed.tsx              # Posts display
│   ├── PostCard.tsx               # Individual post
│   ├── ProfileCard.tsx            # Profile display
│   └── LayoutWrapper.tsx          # Layout wrapper
├── lib/
│   └── supabase.ts                # Supabase configuration
├── store/
│   └── authStore.ts               # Authentication state
└── public/                        # Static assets
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  bio TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Posts Table

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/Surjendu-kar/Mini-LinkedIn.git
cd Mini-LinkedIn
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the SQL commands from the Database Schema section
3. Set up Row Level Security (RLS) policies:
   - Users can read all public profile data
   - Users can only edit their own profiles
   - All users can read posts
   - Users can only create their own posts

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🎯 Key Features Implemented

✅ **User Authentication** - Register/Login with email & password  
✅ **User Profiles** - Name, email, bio with editing capabilities  
✅ **Public Post Feed** - Create, read, display text posts  
✅ **Home Feed** - Posts with author names, bios, and timestamps  
✅ **Profile Pages** - View user profiles and their posts  
✅ **Responsive Design** - Mobile and desktop optimized  
✅ **Real-time Updates** - Live post updates  
✅ **Professional UI** - LinkedIn-inspired design  
✅ **Toast Notifications** - User feedback for all actions  
✅ **Post Creation** - Available from both home and profile pages

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Authentication**: Secure user sessions with Supabase Auth
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js security features

## 📱 Responsive Design

- **Fully Responsive**: Seamlessly adapts to all screen sizes and devices
- **Mobile Optimized**: Touch-friendly interfaces with optimized layouts
- **Tablet Support**: Adaptive design for tablet viewing experiences
- **Desktop Enhanced**: Full-featured desktop experience with expanded layouts
- **Cross-Device Consistency**: Consistent user experience across all platforms

## 🎨 UI/UX Highlights

- **LinkedIn-style Design**: Professional appearance
- **Smooth Animations**: Micro-interactions and transitions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation and screen reader support


## 🏆 Extra Features (Beyond Requirements)

- **Toast Notifications**: Real-time user feedback system
- **Profile Editing**: In-app profile management
- **Real-time Updates**: Live post synchronization
- **Professional UI**: LinkedIn-inspired design system
- **Loading States**: Enhanced user experience
- **Click-outside Modals**: Intuitive interactions
- **Smooth Animations**: Professional micro-interactions
- **Author Bio Display**: Enhanced post information
- **Multi-location Posting**: Create posts from home and profile pages

---

**Note**: This project demonstrates full-stack development capabilities including modern React patterns, database design, authentication systems, and responsive UI development. The codebase follows industry best practices and is production-ready.
