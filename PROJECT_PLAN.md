# Mini LinkedIn-like Community Platform - Project Plan

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS + Zustand
- **Backend**: Supabase (PostgreSQL Database + Authentication)
- **Database**: PostgreSQL via Supabase
- **Deployment**: Vercel

## Project Structure

```
mini-linkedin/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── profile/
│   │   └── [userId]/
│   │       └── page.tsx
│   ├── components/
│   │   ├── PostCard.tsx
│   │   ├── PostForm.tsx
│   │   ├── ProfileCard.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── layout.tsx
│   └── page.tsx (Home/Feed)
├── public/
└── README.md
```

## Development Steps

### Phase 1: Supabase Setup & Authentication (Priority 1) ✅ COMPLETED

1. **Setup Supabase Configuration**

   - Create `lib/supabase.ts` with Supabase client initialization
   - Setup Supabase Auth and PostgreSQL database connection

2. **Create Authentication Store**

   - `store/authStore.ts` using Zustand for managing user state globally
   - Handle login, logout, and user persistence with Supabase

3. **Build Auth Pages** ✅ COMPLETED

   - `app/auth/login/page.tsx` - Login form with Supabase auth
   - `app/auth/signup/page.tsx` - Registration form with profile creation
   - Email/password validation and error handling

4. **Database Setup** ✅ COMPLETED
   - PostgreSQL tables: `users` and `posts`
   - Row Level Security (RLS) policies implemented
   - Proper foreign key relationships

### Phase 2: User Profile System (Priority 2) ✅ COMPLETED

5. **User Profile Creation** ✅ COMPLETED

   - Registration includes name, email, bio fields
   - User profiles stored in PostgreSQL `users` table
   - Automatic profile creation on signup

6. **Profile Display** 🔄 IN PROGRESS
   - `app/profile/[userId]/page.tsx` - View user profiles (TODO)
   - `components/ProfileCard.tsx` - Reusable profile component (TODO)

### Phase 3: Post System (Priority 3)

7. **Post Creation**

   - `components/PostForm.tsx` - Create new posts
   - Store posts in Firestore with author info and timestamps

8. **Post Display**

   - `components/PostCard.tsx` - Individual post component
   - Home feed displaying all posts with author names and timestamps

9. **Post Management**
   - Link posts to user profiles
   - Display user's posts on their profile page

### Phase 4: Navigation & Layout (Priority 4)

10. **Navigation System**

    - `components/Navbar.tsx` - Main navigation
    - Links to home, profile, logout functionality

11. **Layout Updates**
    - Update `app/layout.tsx` with proper structure
    - Responsive design considerations

### Phase 5: UI Enhancement (Priority 5)

12. **Styling & Responsiveness**

    - Improve UI with Tailwind CSS
    - Mobile-responsive design
    - Professional LinkedIn-like appearance

13. **User Experience**
    - Loading states
    - Error handling
    - Form validation feedback

### Phase 6: Deployment & Documentation (Priority 6)

14. **Deployment**

    - Deploy to Vercel
    - Environment variables setup

15. **Documentation**
    - Complete README.md
    - Setup instructions
    - Demo user credentials

## Supabase Database Schema

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

### Row Level Security Policies

- **Users**: Can only access their own profile data
- **Posts**: Everyone can read all posts, users can manage their own posts

## Key Features Implementation Status

1. ✅ **COMPLETED**: User Registration/Login with email & password
2. ✅ **COMPLETED**: User profile creation (name, email, bio)
3. 🔄 **TODO**: Create and display text posts
4. 🔄 **TODO**: Home feed with posts, author names, timestamps
5. 🔄 **TODO**: User profile pages showing their posts
6. 🔄 **TODO**: Basic navigation between pages
7. 🔄 **TODO**: Responsive design
8. 🔄 **TODO**: Deployment

## Estimated Timeline

- **Phase 1-2**: 4-6 hours (Auth + Profiles)
- **Phase 3**: 3-4 hours (Posts system)
- **Phase 4-5**: 3-4 hours (Navigation + UI)
- **Phase 6**: 1-2 hours (Deployment + Docs)
- **Total**: 11-16 hours

## Current Status

✅ **Phase 1 COMPLETED**: Supabase authentication system fully implemented

- User registration and login working
- PostgreSQL database with proper schema
- Row Level Security policies configured
- Zustand state management integrated

## Next Steps

1. **Phase 3**: Implement post creation and display system
2. **Phase 4**: Build navigation and user profile pages
3. **Phase 5**: Enhance UI/UX with better styling
4. **Phase 6**: Deploy to Vercel and create documentation

## Architecture Benefits

- **PostgreSQL**: More powerful than NoSQL for complex queries
- **Supabase**: Built-in auth, real-time subscriptions, and REST API
- **Row Level Security**: Database-level security policies
- **Zustand**: Lightweight state management
- **TypeScript**: Full type safety throughout the application
